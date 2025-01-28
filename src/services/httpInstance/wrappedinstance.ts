import axios, { AxiosInstance, AxiosError } from "axios";
import CookieManager from "@/helper_utils/cookie_manager";
import { useEffect } from "react";
import { useOnboarding } from "@/context/OnboardingContext";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const instance = axios.create({
  baseURL,
});

// Function to get JWT from cookies
export function getJWT() {
  if (typeof window !== "undefined") {
    let token = CookieManager.getCookie("jwt");
    if (token?.charAt(0) === '"' && token?.charAt(token?.length - 1) === '"') {
      token = token?.substring(1, token?.length - 2);
    }
    return "Bearer " + token;
  }
  return "";
}

// Error handling function
export function withErrorHandling(apiCall: Promise<any>) {
  return apiCall.catch((error: AxiosError) => {
    console.error("API Error:", error.response?.status, error.response?.data);
    throw error; // Re-throw the error to be handled where the API call was made
  });
}

// Adding the 401 response interceptor to the Axios instance
instance.interceptors.response.use(
  (response) => response, // Success case, just return the response
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle 401 globally
      console.log("401 Unauthorized. Redirecting to login...");
      window.location.href = "/";
      localStorage.removeItem("onb");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
    return Promise.reject(error); // Pass the error to be handled locally if needed
  }
);

// HTTPClient class using the Axios instance
class HTTPClient {
  static async get(endpoint: string) {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Content-Type": "application/json",
      Authorization: getJWT(),
    };

    return withErrorHandling(instance.get(endpoint, { headers }));
  }
  static async get2(endpoint: string) {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Content-Type": "application/json", // If no additional payload, this can stay
      Accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      Authorization: getJWT(), // Ensure this function provides a valid token
    };
  
    // Add `responseType: "blob"` to handle binary data
    return withErrorHandling(instance.get(endpoint, { headers, responseType: "blob" }));
  }
  

  static async post(endpoint: string, data: any) {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST",
      "Content-Type": "application/json",
      Authorization: getJWT(),
    };

    return withErrorHandling(instance.post(endpoint, data, { headers }));
  }
  static async post2(endpoint: string, data: any) {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST",
      "Content-Type": "multipart/form-data",
      Authorization: getJWT(),
    };

    return withErrorHandling(instance.post(endpoint, data, { headers }));
  }

  static async delete(endpoint: string, data?: any) {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Content-Type": "application/json",
      Authorization: getJWT(),
    };
    return withErrorHandling(instance.delete(endpoint, { headers, data }));
  }

  static async put(endpoint: string, data: any) {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "PUT",
      "Content-Type": "application/json",
      Authorization: getJWT(),
    };

    return withErrorHandling(instance.put(endpoint, data, { headers }));
  }

  static async formDataPost(endpoint: string, data: any) {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST",
      "Content-Type": "multipart/form-data",
      Authorization: getJWT(),
    };

    return withErrorHandling(instance.post(endpoint, data, { headers }));
  }

  static async formDataPut(endpoint: string, data: any) {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "PUT",
      "Content-Type": "multipart/form-data",
      Authorization: getJWT(),
    };

    return withErrorHandling(instance.put(endpoint, data, { headers }));
  }

  static async patch(endpoint: string, data: any) {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "PATCH",
      "Content-Type": "application/json",
      Authorization: getJWT(),
    };
    return withErrorHandling(instance.patch(endpoint, data, { headers }));
  }
}

export default HTTPClient;
