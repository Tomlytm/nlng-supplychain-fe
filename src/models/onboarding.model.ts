import { IUser } from "./user.model";

export type OnboardingInitials = {
  progress: number;
  stage: number;
  layout: number;

  errorMessage: string;
  errorStatus: ErrorStatusEnum;
  user: IUser | null;
};
export type ErrorStatusEnum =
  | "error"
  | "info"
  | "warning"
  | "success"
  | "loading";

export type RegisterUserDto = {
  name: string;
  officeEmail: string;
  officePhoneNumber: string;
  usageLocation: string;
  prefferedLanguageId?: number;
  createdBy: string;
  password: string;
};
export type SignInDto = {
  email: string;
  password: string;
};
export type ResetTokenDto = {
  email: string;
};
export type VerifyTokenDto = {
  email: string;
  token: string;
};

export type ResetPassword = {
  email: string;

  newPassword: string;
};
export type RunCycleYear = {
  year: number;
}