import {
  RegisterUserDto,
  ResetPassword,
  ResetTokenDto,
  SignInDto,
  VerifyTokenDto,
} from "@/models/onboarding.model";
import HTTPClient from "../httpInstance/wrappedinstance";
import {
  CreateUser,
  ModifyRole,
  ModifySingleUserRole,
  ModifyUsersRole,
} from "@/models/user.model";

export default class OnboardingServices {
  static async RegisterUser(data: RegisterUserDto) {
    const response = await HTTPClient.post(
      "/onboarding-and-rbac/api/useronboarding",
      data
    );
    return response.data;
  }
  static async signInUser(data: SignInDto) {
    const response = await HTTPClient.post(
      "/onboarding-and-rbac/api/signin",
      data
    );
    return response.data;
  }
  static async getAllRoles(pageNo: number = 0, pageSize: number = 10) {
    const response = await HTTPClient.get(
      `/onboarding-and-rbac/api/roles/${pageNo}/${pageSize}`
    );
    return response.data;
  }
  
  static async getAllDepartments(pageNo: number = 1, pageSize: number = 10) {
    const response = await HTTPClient.get(
      `/onboarding-and-rbac/api/departments?pageNo=${pageNo}&pageSize=${pageSize}`
    );
    
    return response.data;
  }

  static async getAllUsers(pageNo: number = 0, pageSize: number = 10) {
    const response = await HTTPClient.get(
      `/onboarding-and-rbac/api/users/${pageNo}/${pageSize}`
    );
    return response.data;
  }
  static async getUserById(id: number) {
    const response = await HTTPClient.get(
      `/onboarding-and-rbac/api/user/${id}`
    );
    return response.data;
  }
  static async getModules() {
    const response = await HTTPClient.get(`/onboarding-and-rbac/api/modules`);
    return response.data;
  }
  static async deleteUserById(id: number) {
    const response = await HTTPClient.delete(
      `/onboarding-and-rbac/api/user/${id}`
    );
    return response.data;
  }
  static async deleteMultipleUsers(data: ModifyUsersRole) {
    const response = await HTTPClient.delete(
      `/onboarding-and-rbac/api/users`,
      data
    );
    return response.data;
  }
  static async getUser(id: number) {
    const response = await HTTPClient.get(
      `/onboarding-and-rbac/api/get_user_by_id/${id}`
    );
    return response.data;
  }
  static async getAllIntentions() {
    const response = await HTTPClient.get(
      "/onboarding-and-rbac/api/user-activities"
    );
    return response.data;
  }
  static async ResetToken(data: ResetTokenDto) {
    const response = await HTTPClient.post(
      "/onboarding-and-rbac/api/useronboarding",
      data
    );
    return response.data;
  }
  static async VerifyToken(data: VerifyTokenDto) {
    const response = await HTTPClient.post(
      "/onboarding-and-rbac/api/verifyToken",
      data
    );
    return response.data;
  }
  static async CreateUser(data: CreateUser) {
    const response = await HTTPClient.post(
      "/onboarding-and-rbac/api/user",
      data
    );
    return response.data;
  }
  static async VerifyPasswordToken(data: VerifyTokenDto) {
    const response = await HTTPClient.post(
      "/onboarding-and-rbac/api/verify_forgot_password_token",
      data
    );
    return response.data;
  }

  static async requestForgotPassword(email: string) {
    const response = await HTTPClient.post(
      `/onboarding-and-rbac/api/forgotPassword/${email}`,
      undefined
    );
    return response.data;
  }
  static async resetPassword(data: ResetPassword) {
    const response = await HTTPClient.post(
      `/onboarding-and-rbac/api/resetPassword`,
      data
    );
    return response.data;
  }
  static async ForgotPassword(data: ResetPassword) {
    const response = await HTTPClient.post(
      `/onboarding-and-rbac/api/resetPassword`,
      data
    );
    return response.data;
  }
  static async modifyMultiUsersRole(data: ModifyUsersRole, roleId: number) {
    const response = await HTTPClient.put(
      `/onboarding-and-rbac/api/users/${roleId}`,
      data
    );
    return response.data;
  }
  static async addDepart(userId: number, deptId: number) {
    const response = await HTTPClient.put(
      `/onboarding-and-rbac/api/${userId}/department/${deptId}`,
      {}
    );
    return response.data;
  }
  static async modifySingleUserRole(
    data: ModifySingleUserRole,
    userId: number
  ) {
    const response = await HTTPClient.put(
      `/onboarding-and-rbac/api/user/${userId}/roles`,
      data
    );
    return response.data;
  }
  static async modifySingleRole(data: ModifyRole, roleId: number) {
    const response = await HTTPClient.put(
      `onboarding-and-rbac/api/role/${roleId}`,
      data
    );
    return response.data;
  }
}
