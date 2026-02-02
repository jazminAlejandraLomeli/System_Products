import httpClient from "./httpClient";

export interface MeResponse {
  name: string;
  email: string;
}

export const getMe = async (): Promise<MeResponse> => {
  try {
    const response = await httpClient.get<MeResponse>("/me");
    return response.data;
  } catch (error) {
    throw error;
  }
};
