// src/utils/authFetch.js
import { logout } from "@/store/authSlice";
import store from "@/store/store";
import toast from "react-hot-toast";

let hasLoggedOutDueToToken = false;

export const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem("token");
  const isFormData = options.body instanceof FormData;

  const finalOptions = {
    ...options,
    headers: {
      ...(options.headers || {}),
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
    },
    credentials: "include",
  };

  const res = await fetch(url, finalOptions);
  const contentType = res.headers.get("content-type");

  let data = {};
  if (contentType?.includes("application/json")) {
    data = await res.json();
  }

  if (res.status === 401 && data.logout) {
    if (!hasLoggedOutDueToToken) {
      hasLoggedOutDueToToken = true;
      store.dispatch(logout());
      window.location.href = "/login";
      toast.error("Session expired. Please log in again.");
    }
    return null;
  }

  if (!res.ok) {
    throw new Error(data.message || "Unexpected error");
  }

  return data;
};
