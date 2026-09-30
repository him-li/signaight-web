"use client";
import { useCallback } from "react";
import { AxiosError } from "axios";
import {
  Button,
  Form,
  Modal,
  Tooltip,
  useOverlayState,
  toast,
} from "@heroui/react";
import { Icons } from "@/components/atoms/Icons";
import { patchSubjectComment } from "@/store/subjectsSlice";
import type { Person } from "@/types/person/index.interface";
import CommentForm from "./CommentForm";
import CommentsList from "./CommentsList";
import { useForm, FormProvider } from "react-hook-form";
import { useAppDispatch } from "@/store/store";
import Display from "@/components/atoms/Display";
import { useSearchParamsActions } from "@/contexts/searchParamsContext/SearchParamsContext";
import { modal } from "styles/styles";

type CommentsModalProps = {
  person: Person;
};

export type Comment = {
  comment: string;
};

export default function CommentsModal({ person }: CommentsModalProps) {
  const { refresh } = useSearchParamsActions();
  const dispatch = useAppDispatch();
  const hasComments = !!person.comments;
  const state = useOverlayState();
  const methods = useForm<Comment>({});

  const submitComment = useCallback(
    async (formData: Comment) => {
      const { comment } = formData;
      const text = { text: comment };
      try {
        await dispatch(
          patchSubjectComment({
            subjectId: person.id,
            text,
          }),
        );
        refresh();
        state.close();
        toast.success(hasComments ? "Updated" : "Added", {
          description: hasComments
            ? "Comment Updated Successfully"
            : "Comment Added Succesfully",
        });
      } catch (e) {
        const error = e as AxiosError;
        toast.danger(error.name, {
          description: error.message,
        });
      }
    },
    [dispatch, hasComments, state, person.id, refresh],
  );

  return (
    <FormProvider {...methods}>
      <Modal onOpenChange={state.setOpen} isOpen={state.isOpen}>
        <Tooltip>
          <Tooltip.Trigger>
            <Button
              aria-label="comments"
              isIconOnly
              variant="ghost"
              onPress={state.open}
              className="rounded-full"
            >
              {hasComments ? (
                <Icons.Message />
              ) : (
                <Icons.MessageOutline strokeWidth={50} />
              )}
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>
            {person?.comments?.[0]
              ? `${person?.comments?.length} Comment${person?.comments?.length > 1 ? "s" : ""}`
              : "Add Comment"}
          </Tooltip.Content>
        </Tooltip>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className={modal.base}>
              <Modal.CloseTrigger />
              <Form onSubmit={methods.handleSubmit(submitComment)}>
                <Modal.Header>
                  {hasComments ? "Comments" : "Add Comment"}
                </Modal.Header>
                <Display when={person?.comments} fallback={<></>}>
                  <CommentsList person={person} />
                </Display>
                <CommentForm methods={methods} submitComment={submitComment} />
              </Form>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </FormProvider>
  );
}
