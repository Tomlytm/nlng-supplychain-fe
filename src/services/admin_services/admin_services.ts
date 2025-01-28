import {
  CreateApplicationPolicyDTO,
  createCategory,
} from "@/models/admin.model";
import HTTPClient from "../httpInstance/wrappedinstance";

export default class AdminServices {
  static async getApplicationThrottlingPolicies() {
    const response = await HTTPClient.get(
      `api-manager/api/v1/back-office/throttling/policies/application/get-all`
    );
    return response.data;
  }
  static async getAdvancedPolicies() {
    const response = await HTTPClient.get(
      `api-manager/api/v1/back-office/throttling/policies/application/get-all`
    );
    return response.data;
  }

  static async deleteApplicationThrottlingPolicy(policyId: string) {
    const response = await HTTPClient.get(
      `api-manager/api/v1/back-office/throttling/policies/application/delete?policyId=${policyId}`
    );
    return response.data;
  }
  static async getAllSubscriptionPolicies() {
    const response = await HTTPClient.get(
      `api-manager/api/v1/back-office/throttling/policies/subscription/get-all`
    );
    return response.data;
  }
  static async getIndividualSubscriptionPolicy(policyId: string) {
    const response = await HTTPClient.get(
      `api-manager/api/v1/back-office/throttling/policies/subscription/get?policyId=${policyId}`
    );
    return response.data;
  }
  static async deleteIndividualSubscriptionPolicy(policyId: string) {
    const response = await HTTPClient.get(
      `api-manager/api/v1/back-office/throttling/policies/subscription/delete?policyId=${policyId}`
    );
    return response.data;
  }
  static async createCategory(data: createCategory, approvalCriteria?: string) {
    const response = await HTTPClient.post(
      `api-manager/api/v1/back-office/api-categories/create${
        approvalCriteria ? "?apiApprovalCriteria=${approvalCriteria}" : ""
      }`,
      data
    );
    return response.data;
  }
  static async createApplicationPolicy(data: CreateApplicationPolicyDTO) {
    const response = await HTTPClient.post(
      `api-manager/api/v1/back-office/throttling/policies/application/add`,
      data
    );
    return response.data;
  }
  static async getCategories() {
    const response = await HTTPClient.get(
      `api-manager/api/v1/back-office/api-categories/get`
    );
    return response.data;
  }
  static async getCategory(catCo: string) {
    const response = await HTTPClient.get(
      `api-manager/api/v1/back-office/api-categories/get-category?catco=${catCo}`
    );
    return response.data;
  }
  static async deleteCategories(catCo: string) {
    const response = await HTTPClient.delete(
      `api-manager/api/v1/back-office/api-categories/delete?catco=${catCo}`
    );
    return response.data;
  }
}
