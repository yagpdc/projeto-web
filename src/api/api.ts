import axios from "axios";

const url = window.location.hostname.includes("localhost")
  ? "http://localhost:8000"
  : "https://yago-vm-web-test-ffhjembcd5h9eebv.brazilsouth-01.azurewebsites.net";

export const Api = axios.create({
  baseURL: url,
  withCredentials: false,
});

export type AppHttpError = {
  status?: number;
  message: string;
  details?: unknown;
};

export function normalizeAxiosError(err: unknown): AppHttpError {
  if (typeof err === "object" && err && (err as any).isAxiosError) {
    const e = err as any;
    return {
      status: e.response?.status,
      message: e.response?.data?.message ?? e.message ?? "Request error",
      details: e.response?.data,
    };
  }
  return { message: String(err) };
}
