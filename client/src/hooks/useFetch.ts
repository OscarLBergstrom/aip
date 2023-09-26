interface Request {
    url: string,
    method: string,
    headers?: Record<string, string>,
    body?: string
}

export const useFetch = async (request: Request) => {
    try {
        const response = await fetch(request.url, {
          method: request.method,
          headers: request.headers,
          body: request.body,
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