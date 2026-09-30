"use client";
import { useMemo } from "react";
import { useAppSelector } from "@/store/store";
import { selectSubjectsState } from "@/store/subjectsSlice";

export default function CriminalRecords() {
  const personData = useAppSelector(selectSubjectsState).currentSubjectData;
  const eumwData = useMemo(
    () => personData?.personal_details.additional_details?.eumw_details,
    [personData],
  );
  const interpolData = useMemo(
    () => personData?.personal_details?.additional_details?.interpol_details,
    [personData],
  );
  const identifiers = useMemo(
    () =>
      personData?.personal_details?.additional_details?.physical_identifiers,
    [personData],
  );

  return (
    <div className={`${eumwData ? "block" : "hidden"} w-full`}>
      <h2 className="mb-4 text-medium">Details</h2>
      <div className="flex flex-col rounded-2xl gap-4 p-8 bg-default-100 text-xs">
        <div className="flex flex-col gap-1">
          {" "}
          <strong>{eumwData?.crime}</strong>
          {eumwData?.is_dangerous && (
            <p className="text-danger-600 font-semibold">DANGEROUS</p>
          )}
          {eumwData?.info && <p>{eumwData?.info}</p>}
          {eumwData?.date_published && (
            <p>Published: {eumwData?.date_published}</p>
          )}
        </div>
        {interpolData?.interpol_entity_id && (
          <div className="flex flex-col gap-1">
            <strong>{interpolData?.arrest_warrants?.charge}</strong>
            {interpolData?.arrest_warrants?.issuing_country && (
              <p>
                Issuing Country:{" "}
                {interpolData?.arrest_warrants?.issuing_country}
              </p>
            )}
          </div>
        )}
        <div className="flex flex-col gap-1">
          <strong>Identifiers</strong>
          {identifiers?.height && (
            <p>
              Height:{" "}
              {identifiers?.height?.interpol_height ??
                identifiers?.height?.eumw_height}
            </p>
          )}
          {identifiers?.eye_color && (
            <p>
              Eye Color:{" "}
              {identifiers?.eye_color?.interpol_eye_color ??
                identifiers?.eye_color?.eumw_eye_color}
            </p>
          )}
          {eumwData?.ethnic_origin && (
            <p>Ethnic Origin: {eumwData?.ethnic_origin}</p>
          )}
          {personData?.nationality && (
            <p>Nationality: {personData?.nationality}</p>
          )}
          {identifiers?.identifiers &&
            identifiers?.identifiers?.eumw_identifiers?.map((identifier) => (
              <p key={identifier}>{identifier}</p>
            ))}
        </div>
      </div>
    </div>
  );
}
