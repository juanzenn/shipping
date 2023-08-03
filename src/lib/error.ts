import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";

export function handlePrismaError(error: unknown) {
  const prismaCases = [
    PrismaClientKnownRequestError,
    PrismaClientValidationError,
    PrismaClientRustPanicError,
    PrismaClientUnknownRequestError,
    PrismaClientInitializationError,
  ];

  for (const prismaCase of prismaCases) {
    if (error instanceof prismaCase) {
      return {
        cause: error.cause,
        message: error.message,
      };
    }
  }

  return undefined;
}
