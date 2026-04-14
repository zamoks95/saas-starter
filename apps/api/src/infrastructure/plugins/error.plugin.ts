import { Elysia } from "elysia";
import {
  NotFoundError,
  ValidationError,
} from "../../domain/errors/domain-errors";

export const errorPlugin = new Elysia({ name: "error" }).onError(
  ({ error, set }) => {
    if (error instanceof NotFoundError) {
      set.status = 404;
      return { code: "NOT_FOUND", message: error.message };
    }

    if (error instanceof ValidationError) {
      set.status = 400;
      return {
        code: "VALIDATION_ERROR",
        message: error.message,
        details: error.details,
      };
    }

    set.status = 500;
    return { code: "INTERNAL_ERROR", message: "An unexpected error occurred" };
  },
);
