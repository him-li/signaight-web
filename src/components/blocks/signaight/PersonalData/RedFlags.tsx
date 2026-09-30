"use client";
import { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { Accordion } from "@heroui/react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { getCurrentSubjectRedFlagstById } from "@/store/subjectsSlice";
import { Icons } from "@/components/atoms/Icons";
import BlockLayout from "@/components/atoms/BlockLayout";
import { personRedFlagsConstants } from "@/constants";
import { selectCurrentSubjectRedFlags } from "@/store/subjectsSlice/subjects.selectors";
import type {
  IRedFlag,
  SubCategory,
} from "@/types/person/red_flag/index.interface";

export default function RedFlags() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const subjectIdStr = params?.subjectId?.toString();
  const redFlags = useAppSelector(selectCurrentSubjectRedFlags);
  const subCategories: SubCategory[] =
    redFlags?.flatMap((rf) =>
      (rf.sub_categories ?? []).map((sc) => ({ ...sc, category: rf.category })),
    ) ?? [];

  useEffect(() => {
    if (!subjectIdStr) return;
    dispatch(getCurrentSubjectRedFlagstById(subjectIdStr));
  }, [dispatch, subjectIdStr]);

  const expandedCategoryKeys = useMemo(
    () =>
      redFlags
        ?.map((rf) => rf.category)
        .filter((k): k is string => Boolean(k)) ?? [],
    [redFlags],
  );

  return (
    <BlockLayout
      isVisible={Array.isArray(redFlags) && redFlags.length > 0}
      title="Red Flags"
      icon={<Icons.Flag />}
    >
      <Accordion
        aria-label="red-flags-accordion"
        hideSeparator
        allowsMultipleExpanded
        defaultExpandedKeys={expandedCategoryKeys}
      >
        {
          redFlags?.map((category: IRedFlag) => {
            const categorySubCategories = subCategories.filter(
              (sc) => sc.category === category.category,
            );
            return (
              <Accordion.Item
                id={category.category}
                key={category.category}
                className={
                  category.category === " " || category.category === null
                    ? "hidden"
                    : category.category === personRedFlagsConstants.weapons
                      ? "pointer-events-none"
                      : ""
                }
              >
                <Accordion.Heading>
                  <Accordion.Trigger className="flex flex-row justify-between items-center text-sm font-medium">
                    {category.category}
                    <Accordion.Indicator
                      className={
                        category.category === personRedFlagsConstants.weapons
                          ? "hidden"
                          : category.severity <= 5
                            ? "text-gray"
                            : category.severity > 5 && category.severity <= 8
                              ? "text-warning"
                              : "text-danger"
                      }
                    >
                      {category.severity.toString()}
                    </Accordion.Indicator>
                  </Accordion.Trigger>
                </Accordion.Heading>
                <Accordion.Panel>
                  <Accordion.Body className="text-xs flex flex-col gap-2">
                    <Accordion
                      aria-label="red-flags-subcategory-accordion"
                      allowsMultipleExpanded
                      className={
                        category.category === personRedFlagsConstants.weapons
                          ? "hidden"
                          : "text-xs py-2"
                      }
                    >
                      {categorySubCategories?.map(
                        (subCategory: SubCategory, index) => (
                          <Accordion.Item
                            id={subCategory.sub_category + index}
                            key={subCategory.sub_category + index}
                            className={
                              subCategory.sub_category === " " ||
                              subCategory.sub_category === null
                                ? "hidden"
                                : "pointer-events-none"
                            }
                          >
                            <Accordion.Heading>
                              <Accordion.Trigger className="flex flex-row justify-between items-center text-xs">
                                <span>{subCategory.sub_category}</span>
                                <span
                                  className={
                                    subCategory.severity <= 5
                                      ? "text-gray"
                                      : subCategory.severity > 5 &&
                                          subCategory.severity <= 8
                                        ? "text-warning"
                                        : "text-danger"
                                  }
                                >
                                  {subCategory.severity}
                                </span>
                              </Accordion.Trigger>
                            </Accordion.Heading>
                          </Accordion.Item>
                        ),
                      )}
                    </Accordion>
                  </Accordion.Body>
                </Accordion.Panel>
              </Accordion.Item>
            );
          }) as never
        }
      </Accordion>
    </BlockLayout>
  );
}
