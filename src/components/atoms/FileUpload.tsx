"use client";
import { type ReactNode, useRef } from "react";
import { Button } from "@heroui/react";
import type { UseFormRegisterReturn } from "react-hook-form";
import Dropzone from "react-dropzone";

type FileUploadProps = {
  register: UseFormRegisterReturn;
  accept?: string;
  multiple?: boolean;
  children?: ReactNode;
};
export default function FileUpload(props: FileUploadProps) {
  const { register, accept, multiple, children } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { ref, ...rest } = register as {
    ref: (instance: HTMLInputElement | null) => void;
  };

  return (
    <Button
      fullWidth
      variant="outline"
      className="h-20 rounded-xl"
      onPress={() => inputRef.current?.click()}
    >
      <Dropzone>
        {({ getInputProps }) => (
          <div className="w-full bg-transparent">
            <input
              {...getInputProps()}
              type={"file"}
              multiple={multiple || false}
              hidden
              accept={accept}
              {...rest}
              ref={(e) => {
                ref(e);
                inputRef.current = e;
              }}
            />
            {!inputRef.current?.value && <p>Please click to select files</p>}
            {inputRef.current && (
              <p className="wrap-break-word whitespace-normal w-full">
                {inputRef.current.value!}
              </p>
            )}
          </div>
        )}
      </Dropzone>
      {children}
    </Button>
  );
}
