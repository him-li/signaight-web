"use client";
import React from "react";
import { ControlProps } from "@jsonforms/core";
import { Alert, Button } from "@heroui/react";
import { useRouter } from "next/navigation";

type Props = ControlProps;

function ErrorPage(props: Props) {
  const router = useRouter();
  return (
    <div id="#/properties/error" className="mx-5">
      <div className="w-full flex items-center my-3">
        <Alert color="danger" title={props.uischema.options?.error.message}>
          {null}
        </Alert>
      </div>
      <Button
        onPress={
          // Attempt to recover by trying to re-render the segment
          () => router.refresh()
        }
      >
        Try again
      </Button>
    </div>
  );
}

export default ErrorPage;
