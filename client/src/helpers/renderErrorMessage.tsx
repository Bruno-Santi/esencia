import React from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

export const renderErrorMessage = (
  error: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>
): React.ReactNode => {
  if (typeof error === "string") {
    return error;
  }

  if ("message" in error) {
    const errorMessage = error.message;

    if (typeof errorMessage === "string") {
      return <div>{errorMessage}</div>;
    }

    return <div></div>;
  }

  return <div></div>;
};
