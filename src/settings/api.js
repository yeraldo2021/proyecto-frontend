import { captureId } from "../user/validate_user.js";

export function apiGET() {
  return {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Annie is Vader",
    },
  };
}

export function apiPOST(data) {
  const response = captureId();
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${response.token}`,
    },
    body: data,
  };
}
