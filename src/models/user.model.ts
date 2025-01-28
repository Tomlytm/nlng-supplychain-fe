export type UserInititals = {
  userType: "weaver" | "webber";
};

export type IMockUser = {
  fullname: string;
  email: string;
  role: string;
  status: "Active" | "Inactive";
};

export type IMockRole = {
  title: string;
  noU: number;
  noP: number;
};

export type IRole = {
  id: number;
  roleName: string;
  roleType: string;
  description: string;
  isCustom: null;
  policies: [];
};
export type IDept = {
  id: number;
  departmentName: string;
  abbreviation: string;
};

export type IPolicy = {
  id: number;
  policyName: string;
  policyType: string;
  description: string;
  effect: null;
  scope: null;
  isCustom: 1;
  actions: any[];
  active: boolean;
};

export type department ={
  id:number;
  departmentName:string;
  abbreviation: string;
}
export type IUser = {
  name: string;
  userType: null;
  jobTitle: string;
  officeEmail: string;
  officePhoneNumber: string;
  isEnabled: number;
  enabledAt: string;
  isValidated: number;
  deleted: boolean;
  deletedAt: null;
  createdBy: string;
  createdAt: string;
  onboardingCompleted: boolean;
  passwordUpdatedAt: null;
  roles: IRole[];
  id: number;
  department: department;
};
export type CreateUser = {
  name: string;
  jobTitle: string;
  officeEmail: string;
  officePhoneNumber: string;
  createdBy: string;
  password: string;
  roleIds: number[];
};
export type ModifyUsersRole = {
  userIdArray: number[];
};
export type ModifySingleUserRole = {
  roleArray: number[];
};

export type IModule = {
  id: number;
  moduleName: string;
  description: string;
  location: string;
  scope: any;
  actions: any[];
  policies: IPolicy[];
  features: [];
};

export type ModifyRole = {
  roleName?: string;
  roleType?: string;
  description?: string;
  policies?: number[];
};
