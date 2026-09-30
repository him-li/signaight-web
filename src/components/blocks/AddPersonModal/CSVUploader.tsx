"use client";
import CSVValidationProvider from "@/contexts/csvValidationContext/CSVValidationContext";
import CsvDownload from "@/components/atoms/CSVDownload";
import SubmitButton from "@/components/blocks/AddPersonModal/SubmitButton";
import { useCallback, useEffect } from "react";
import Papa from "papaparse";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { AxiosError } from "axios";
import { Form, toast } from "@heroui/react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import FileUpload from "@/components/atoms/FileUpload";
import { selectCurrentProjectId } from "@/store/projectsSlice";
import {
  resetProjectSelectedSubjects,
  getRankingInfo,
  addSubjectFile,
} from "@/store/subjectsSlice";
import { ICsvValidationError } from "@/contexts/csvValidationContext/types";
import { useCSVValidationActions } from "@/contexts/csvValidationContext/CSVValidationContext";
import CSVValidation from "@/components/blocks/AddPersonModal/CSVValidation";
import { useSearchParamsActions } from "@/contexts/searchParamsContext/SearchParamsContext";
import { usePersonsSearchState } from "@/contexts/personsSearchContext/PersonsSearchContext";
import { useLimitsActions } from "@/contexts/limitsContext/LimitsContext";
import { RequiredFieldsEnum } from "@/types/requiredCSVFields";

type Props = {
  onClose: () => void;
  personTerm: string;
};

export type AddFileData = {
  file_: FileList;
};

function getFileExtension(filename: string): string | null {
  const parts = filename.split(".");
  return parts.length > 1 ? parts.pop() || null : null;
}

export default function CSVUploader({ onClose, personTerm }: Props) {
  const dispatch = useAppDispatch();
  const projectId = useAppSelector(selectCurrentProjectId);
  const methods = useForm<AddFileData>();
  const { control, register, handleSubmit, reset, watch } = methods;
  const uploadedFile = watch("file_");
  const requiredFields = [RequiredFieldsEnum.email, RequiredFieldsEnum.phone];

  const { setCsvValidationErrors } = useCSVValidationActions();
  const { searchExisting } = usePersonsSearchState();
  const { moveToPage } = useSearchParamsActions();
  const { handlePersonsLimits } = useLimitsActions();

  useEffect(() => {
    setCsvValidationErrors([], false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedFile]);

  const subjectFileCreate = useCallback(
    async (projectId: string, fileToUpload: any, searchExisting: boolean) => {
      try {
        if (fileToUpload) {
          await dispatch(
            addSubjectFile({ projectId, fileToUpload, searchExisting }),
          );

          moveToPage(1);
        }
      } catch (e) {
        const error = e as AxiosError;
        console.log(error);
      }
    },
    [dispatch, moveToPage],
  );

  const validateCSVContent = useCallback(
    (rows: any[]) => {
      const errors: ICsvValidationError[] = [];

      rows.forEach((row, index) => {
        //remove phone validation
        // if (
        //   requiredFields.includes(RequiredFieldsEnum.phone) &&
        //   row[RequiredFieldsEnum.phone] &&
        //   !/^[1-9]\d{1,14}$/.test(row[RequiredFieldsEnum.phone])
        // ) {
        //   errors.push({
        //     type: "FieldMismatch",
        //     code: "InvalidQuotes",
        //     message: `Enter a valid phone number format (e.g., 14155552671).`,
        //     row: index + 1,
        //     data: {
        //       Row: index + 1,
        //       ...row,
        //     },
        //   } as ICsvValidationError);
        // }
        if (requiredFields.every((key) => !row[key])) {
          errors.push({
            type: "FieldMismatch",
            code: "InvalidQuotes",
            message: `Either ${requiredFields.join(" or ")} must be provided.`,
            row: index + 1,
            data: {
              Row: index + 1,
              ...row,
            },
          } as ICsvValidationError);
        }
      });

      return errors;
    },
    [requiredFields],
  );

  const validateCSV = useCallback(
    (value: FileList) => {
      const file = value[0];
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (!event.target?.result) {
            resolve(false);
            return;
          }

          const csvText = event.target.result as string;

          Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
            complete: (result) => {
              if (result.errors.length > 0) {
                setCsvValidationErrors(
                  result.errors.map((error) => ({
                    ...error,
                    data: {
                      Row: (error.row ?? 0) + 1,
                      ...(result.data[error.row ?? 0] ?? {}),
                    },
                  })),
                  false,
                );
                resolve(false);
              }

              const errors = validateCSVContent(result.data);
              if (errors.length > 0) {
                setCsvValidationErrors(errors, true);
                resolve(false);
              } else {
                handlePersonsLimits({
                  personsCount: result.data.length,
                  successCb: () => {
                    toast.success("CSV is validated.");
                    resolve(true);
                  },
                  errorCb: () => {
                    resolve(false);
                  },
                });
              }
            },
            error: () => {
              resolve(false);
            },
          });
        };

        reader.readAsText(file);
      });
    },
    [handlePersonsLimits, setCsvValidationErrors, validateCSVContent],
  );

  const validateFiles = (value: FileList) => {
    if (value.length < 1) {
      return "File is required";
    }

    const MAX_FILE_SIZE_MB = 10;
    const file = value[0];

    const fileExtension = getFileExtension(file.name);
    if (fileExtension?.toLowerCase() !== "csv") {
      const error = "Only CSV files are allowed. Please select a CSV file.";
      toast.danger(error);
      return error;
    }

    const fsMb = file.size / (1024 * 1024);

    if (fsMb > MAX_FILE_SIZE_MB) {
      const error = "Max file size is 10MB";
      toast.danger(error);
      return error;
    }
  };

  const handleFileSubmit = useCallback(
    async (values: AddFileData) => {
      const { file_: fileList } = values;
      const data = await validateCSV(fileList);
      if (data) {
        setCsvValidationErrors([], false);
        const fileToUpload = fileList[0];
        try {
          if (projectId) {
            subjectFileCreate(projectId, fileToUpload, searchExisting);
          }
          reset();
        } catch (e) {
          const error = e as AxiosError;
          console.log(error);
        } finally {
          dispatch(getRankingInfo());
          dispatch(resetProjectSelectedSubjects(projectId));
          onClose();
        }
      }
    },
    [
      validateCSV,
      setCsvValidationErrors,
      projectId,
      reset,
      subjectFileCreate,
      searchExisting,
      dispatch,
      onClose,
    ],
  );

  const handleFileError = (values: any) => {
    if (typeof values === "string") {
      toast.danger(values);
    } else if (Array.isArray(values)) {
      values.forEach((err) => toast.danger(err));
    } else if (typeof values === "object" && values !== null) {
      Object.values(values).forEach((err) => {
        if (typeof err === "string") {
          toast.danger(err);
        } else if (Array.isArray(err)) {
          err.forEach((subErr) => toast.danger(String(subErr)));
        }
      });
    } else {
      toast.danger("Unknown error occurred.");
    }
  };

  return (
    <CSVValidationProvider>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(handleFileSubmit, handleFileError)}>
          <div className="text-justify text-sm">
            Upload CSV in a default
            <CsvDownload
              data={[["First Name", "Last Name", "Email", "Phone"]]}
              filename="SignAIght_SignAIght_subject_format"
            >
              <p className=" text-blue-500 inline no-underline mx-1">format</p>
            </CsvDownload>
            to populate {personTerm.toLowerCase()} list
          </div>
          <Controller
            control={control}
            name="file_"
            render={({ field }) => (
              <FileUpload
                accept="text/csv"
                multiple
                register={register("file_", {
                  validate: validateFiles as any,
                })}
                {...field}
              />
            )}
          />
          <CSVValidation />
          <div className="mt-2 w-full flex justify-center">
            <SubmitButton />
          </div>
        </Form>
      </FormProvider>
    </CSVValidationProvider>
  );
}
