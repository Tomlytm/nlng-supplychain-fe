import {
  RegisterUserDto,
  ResetPassword,
  ResetTokenDto,
  SignInDto,
  VerifyTokenDto,
  RunCycleYear,
} from "@/models/onboarding.model";
import HTTPClient from "../httpInstance/wrappedinstance";
import {
  CreateUser,
  ModifyRole,
  ModifySingleUserRole,
  ModifyUsersRole,
} from "@/models/user.model";

export default class DemandPlanServices {
  static async RunCycleYear(data: RunCycleYear) {
    const response = await HTTPClient.post(
      "/demand-plan/api/demand/create_demand_planning_cycle",
      data
    );
    return response.data;
  }
  static async ApprovePlan(id:number) {
    const response = await HTTPClient.put(
      `/demand-plan/api/demand/submit?demandPlanId=${id}`, {}
    );
    return response.data;
  }
  static async UpdateActivity(id:number, data: any) {
    const response = await HTTPClient.put(
      `/demand-plan/api/demand/update-activity?Id=${id}`, data
    );
    return response.data;
  }
  static async UpdateProject(id:number, data: any) {
    const response = await HTTPClient.put(
      `/demand-plan/api/demand/update-project?Id=${id}`, data
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
  static async getCycleYear() {
    const response = await HTTPClient.get(
      `/demand-plan/api/demand/active_demand_planning_cycle_year`
    );
    return response.data;
  }
  static async getAllRoles(pageNo: number = 0, pageSize: number = 10) {
    const response = await HTTPClient.get(
      `/onboarding-and-rbac/api/roles/${pageNo}/${pageSize}`
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
  static async mescSearch(keyword: string) {
    const response = await HTTPClient.get(
      `/demand-plan/api/demand/mesc_search?mesc=${keyword}`
    );
    return response.data;
  }
  static async contractNoSearch(keyword: string) {
    const response = await HTTPClient.get(
      `/demand-plan/api/demand/contracts_search?contractNumber=${keyword}`
    );
    return response.data;
  }
  static async contractNameSearch(keyword: string) {
    const response = await HTTPClient.get(
      `/demand-plan/api/demand/contracts-search-by-name?contractName=${keyword}`
    );
    return response.data;
  }
  static async createDemandPlan(
    dpType = "Activities",
    dpStatus = "Draft",
    year: number,
    deptId: number,
    file: FormData
  ) {
    const response = await HTTPClient.post2(
      `/demand-plan/api/demand/create_demand_plan_with_templates?dpType=${dpType}&dpStatus=${dpStatus}&year=${year}&departmentId=${deptId}
`,
      file
    );
    return response.data;
  }
  static async getDemandPlan(
    dpStatus = "Draft",
    deptId: number,
    pageNo = 0,
    pageSize = 10,
    year = 2025
  ) {
    const response = await HTTPClient.get(
      `/demand-plan/api/demand/status?dpStatus=${dpStatus}&pageNo=${pageNo}&year=${year}&deptId=${deptId}&pageSize=${pageSize}
`
    );
    return response.data;
  }
  static async getPlanVersions(dpId: number, pageNo = 0, pageSize = 10) {
    const response = await HTTPClient.get(
      `/demand-plan/api/demand/version?dpId=${dpId}&pageNo=${pageNo}&pageSize=${pageSize}
`
    );
    return response.data;
  }
  // static async getPlanTemplate(dpId: number, download = true) {
  //   try {
  //     // Fetch data using the HTTPClient
  //     const response = await HTTPClient.get2(
  //       `/demand-plan/api/demand/template?dpId=${dpId}&download=${download}`
  //     );

  //     // Create a downloadable URL from the response
  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement("a");
  //     link.href = url;

  //     // Extract filename from content-disposition header if available
  //     const contentDisposition = response.headers["content-disposition"];
  //     const filename = contentDisposition
  //       ? contentDisposition
  //           .split("filename=")[1]
  //           ?.split(";")[0]
  //           ?.replace(/"/g, "")
  //       : "download.xlsx";

  //     console.log({ path: filename });

  //     // Set the filename and trigger the download
  //     link.setAttribute("download", filename);
  //     document.body.appendChild(link);
  //     link.click();
  //     link.remove();

  //     console.log("File downloaded successfully!");
  //   } catch (error) {
  //     console.error("Error downloading the plan template:", error);
  //   }
  // }
  static async getPlanTemplate(dpId: number, download = true) {
    try {
      // Fetch data using the HTTPClient
      const response = await HTTPClient.get2(
        `/demand-plan/api/demand/template?dpId=${dpId}&download=${download}`
      );

      // Create a Blob from the response data
      const blob = new Blob([response.data]);

      // Extract filename from content-disposition header if available
      const contentDisposition = response.headers["content-disposition"];
      const filename = contentDisposition
        ? contentDisposition
            .split("filename=")[1]
            ?.split(";")[0]
            ?.replace(/"/g, "")
        : "download.xlsx";

      // Create a File object
      const file = new File([blob], filename, { type: response.data.type });

      // Trigger the download if `download` is true
      if (download) {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        return file;
      }

      console.log("File downloaded successfully!");
    } catch (error) {
      console.error("Error downloading the plan template:", error);
    }
  }
  static async getFinalPlanTemplate( download = true) {
    try {
      // Fetch data using the HTTPClient
      const response = await HTTPClient.get2(
        `/demand-plan/api/demand/template-activity-final?download=${download}`
      );

      // Create a Blob from the response data
      const blob = new Blob([response.data]);

      // Extract filename from content-disposition header if available
      const contentDisposition = response.headers["content-disposition"];
      const filename = contentDisposition
        ? contentDisposition
            .split("filename=")[1]
            ?.split(";")[0]
            ?.replace(/"/g, "")
        : "download.xlsx";

      // Create a File object
      const file = new File([blob], filename, { type: response.data.type });

      // Trigger the download if `download` is true
      if (download) {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        return file;
      }

      console.log("File downloaded successfully!");
    } catch (error) {
      console.error("Error downloading the plan template:", error);
    }
  }
  static async getActivityPlanTemplate( download = false) {
    try {
      // Fetch data using the HTTPClient
      const response = await HTTPClient.get2(
        `/demand-plan/api/demand/template-activity-material?download=${download}`
      );

      // Create a Blob from the response data
      const blob = new Blob([response.data]);

      // Extract filename from content-disposition header if available
      const contentDisposition = response.headers["content-disposition"];
      const filename = contentDisposition
        ? contentDisposition
            .split("filename=")[1]
            ?.split(";")[0]
            ?.replace(/"/g, "")
        : "download.xlsx";

      // Create a File object
      const file = new File([blob], filename, { type: response.data.type });

      // Trigger the download if `download` is true
      if (download) {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        return file;
      }

      console.log("File downloaded successfully!");
    } catch (error) {
      console.error("Error downloading the plan template:", error);
    }
  }

  static async getInvalidPlanTemplate(dpId: number, download = true) {
    try {
      // Fetch data using the HTTPClient
      const response = await HTTPClient.get2(
        `/demand-plan/api/demand/invalidexcel?dpId=${dpId}&download=${download}`
      );

      // Create a Blob from the response data
      const blob = new Blob([response.data]);

      // Extract filename from content-disposition header if available
      const contentDisposition = response.headers["content-disposition"];
      const filename = contentDisposition
        ? contentDisposition
            .split("filename=")[1]
            ?.split(";")[0]
            ?.replace(/"/g, "")
        : "download.xlsx";

      // Create a File object
      const file = new File([blob], filename, { type: response.data.type });

      // Trigger the download if `download` is true
      if (download) {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        return file;
      }

      return file;
    } catch (error) {
      console.error("Error downloading the plan template:", error);
    }
  }

  static async getDemandPlanByid(dpId: number) {
    const response = await HTTPClient.get(
      `/demand-plan/api/demand/byid?dpId=${dpId}
`
    );
    return response.data;
  }
  static async getErrorsByid(dpId: number) {
    const response = await HTTPClient.get(
      `/demand-plan/api/demand/invaliderrorslist?dpId=${dpId}
`
    );
    return response.data;
  }
  static async getCycleYears(pageNo = 0, pageSize = 10) {
    const response = await HTTPClient.get(
      `/demand-plan/api/demand/demand_planning_cycle_years?pageNo=${pageNo}&pageSize=${pageSize}`
    );
    return response.data;
  }
  static async getDeptByYear(year: number) {
    const response = await HTTPClient.get(
      `/demand-plan/api/demand/departments_by_year?year=${year}`
    );
    return response.data;
  }
  static async getPlanByYearType(deptId: number, year: number, type: string) {
    const response = await HTTPClient.get(
      `/demand-plan/api/demand/dept_year_type?departmentId=${deptId}&year=${year}&type=${type}`
    );
    return response.data;
  }
  static async getFlaggedRows(deptId: number) {
    const response = await HTTPClient.get(
      `/demand-plan/api/demand/flaggedrows?dpId=${deptId}`
    );
    return response.data;
  }
  static async getActivity(
    lastActivityId: number | null,
    size: number,
    direction: string
  ) {
    const response = await HTTPClient.get(
      `/demand-plan/api/demand/activity?${
        lastActivityId === null ? "" : `projectId=${lastActivityId}`
      }&size=${size}&direction=${direction}`
    );
    return response.data;
  }
  static async getActivityById(activityId: number) {
    const response = await HTTPClient.get(
      `/demand-plan/api/demand/activity-by-id?activityId=${activityId}`
    );
    return response.data;
  }
  static async getActivityContracts(activityId: number) {
    const response = await HTTPClient.get(
      `/demand-plan/api/demand/contracts?projectId=${activityId}`
    );
    return response.data;
  }
  static async getActivityContract(activityId: number) {
    const response = await HTTPClient.get(
      `/demand-plan/api/demand/project-by-id?projectId=${activityId}`
    );
    return response.data;
  }
}
