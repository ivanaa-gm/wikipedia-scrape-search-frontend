type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

const request = async <T>(
  method: HttpMethod,
  url: string,
  data?: unknown
): Promise<T> => {
  let options: RequestInit = {};

  if (method !== "GET") {
    options.method = method;
  }

  if (data) {
    options = {
      ...options,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(error.message || "Request failed");
  }

  const result = await response.json();

  return result as T;
};

export default request;
