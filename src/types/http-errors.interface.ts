import { DefaultError } from "@tanstack/react-query";

type Problem = {
  type: string;
  title: string;
  status: number;
  detail: string;
  errors?: { data: string[] };
};

export type CustomError = DefaultError & Problem;
