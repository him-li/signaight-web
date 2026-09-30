/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, type UseFormReturn } from "react-hook-form";
import {
  Button,
  Modal,
  TextArea,
  TextField,
  Label,
  FieldError,
} from "@heroui/react";
import { Icons } from "@/components/atoms/Icons";
import { Field_is_required } from "@/constants";
import type { Comment } from "./index";
import { button } from "styles/styles";

type CommentFormProps = {
  methods: UseFormReturn<Comment, any, Comment>;
  submitComment: (formData: Comment) => Promise<void>;
};

export default function CommentForm({ methods }: CommentFormProps) {
  const control = methods.control;
  const register = methods.register;
  const isSubmitting = methods.formState.isSubmitting;
  return (
    <>
      <Modal.Body className="p-1">
        <Controller
          control={control}
          name="comment"
          render={({ field }) => (
            <TextField
              {...register("comment", {
                required: Field_is_required,
                minLength: {
                  value: 2,
                  message: "Minimum length should be 2",
                },
              })}
              validationBehavior="aria"
              {...field}
            >
              <Label>Add Comment</Label>
              <TextArea />
              <FieldError />
            </TextField>
          )}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          fullWidth={false}
          isIconOnly={false}
          variant="ghost"
          type="submit"
          isPending={isSubmitting}
          className={button.ghost_accent}
        >
          <Icons.Plus />
          Add Comment
        </Button>
      </Modal.Footer>
    </>
  );
}
