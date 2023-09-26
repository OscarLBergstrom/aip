import { Method } from "axios";

interface Request {
    url: string,
    method: Method,
    headers?: Record<string, string>,
    body?: Record<any, any>
}

export const useFetch = async (request: Request) => {
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