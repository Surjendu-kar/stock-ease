import type { StudentType } from "../schemas/validation";

export type StudentFormData = StudentType;

export type StudentProps = StudentFormData & {
  id: string;
};
