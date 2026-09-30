import { Button } from "@heroui/react";
import { useCallback, type ReactNode } from "react";
import { CSVLink } from "react-csv";
import { Icons } from "@/components/atoms/Icons";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { exportSubjects } from "@/store/subjectsSlice/subjects.actions";
import {
  selectExporting,
  selectIsAllSelected,
} from "@/store/subjectsSlice/subjects.selectors";
import { selectCurrentProjectIdData } from "@/store/projectsSlice/projects.selectors";
import { ALL_PROJECTS } from "@/constants/projects";

interface CSVDownloadProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  filename: string;
  children?: ReactNode;
  isApiDownload?: boolean;
}

export default function CsvDownload(props: CSVDownloadProps) {
  const dispatch = useAppDispatch();
  const exporting = useAppSelector(selectExporting);
  const selectedProjectId = useAppSelector(selectCurrentProjectIdData);
  const selectedAll = useAppSelector(selectIsAllSelected);

  const disabled = selectedProjectId === ALL_PROJECTS;

  const handlePress = useCallback(() => {
    dispatch(
      exportSubjects(
        selectedAll ? [] : props.data?.map((it: { Id: string }) => it.Id),
      ),
    );
  }, [dispatch, props.data, selectedAll]);

  if (props.isApiDownload) {
    return (
      <Button
        isIconOnly
        size="sm"
        onPress={handlePress}
        isPending={exporting}
        isDisabled={disabled}
        className="rounded-full"
      >
        <Icons.Download />
      </Button>
    );
  }
  return (
    <CSVLink
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data={props.data.map((it: any) => {
        delete it.Id;
        return it;
      })}
      filename={props.filename}
      target="_blank"
      className="px-1"
    >
      {props.children}
    </CSVLink>
  );
}
