import { Method } from "axios";

interface Request<T> {
    url: string,
    method: Method,
    headers?: Record<string, string>,
    body?: T
}

export const useFetch = async <T>(request: Request<T>) => {
    try {
        const response = await fetch(request.url, {
          method: request.method,
          headers: request.headers,
          body: JSON.stringify(request.body),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error:", error);
      }
};