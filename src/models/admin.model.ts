export type createCategory = {
  name: string;
  description: string;
};

export type ICategory = {
  apiApprovalCriteria: any;
  categoryCode: string;
  description: string;
  id: string;
  name: string;
  numberOfAPIs: number;
};

export type IDefaultLimit = {
  type: string;
  requestCount?: {
    timeUnit: string;
    unitTime: string;
    requestCount: string;
  } | null;
  bandwidth: {
    dataAmount: string;
    dataUnit: string;
    timeUnit: string;
    unitTime: string;
  } | null;
  eventCount: any | null;
};
export type IApplicationPolicy = {
  policyName: string;
  displayName: string;
  description: string;
  type: string;
  defaultLimit: IDefaultLimit;
};

export type CreateApplicationPolicyDTO = {
  policyName: string;
  description: string;
  defaultLimit: IDefaultLimit;
};
