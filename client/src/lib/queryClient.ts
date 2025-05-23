import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // Import dynamically to avoid circular dependencies
  const { auth } = await import('./firebase');
  
  // Get the current user's ID token for authentication
  const idToken = auth.currentUser ? await auth.currentUser.getIdToken() : null;
  
  // Set up headers with Authorization if we have a token
  const headers: Record<string, string> = {
    ...(data ? { "Content-Type": "application/json" } : {}),
    ...(idToken ? { "Authorization": `Bearer ${idToken}` } : {})
  };
  
  const res = await fetch(url, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    // Import dynamically to avoid circular dependencies
    const { auth } = await import('./firebase');
    
    // Get the current user's ID token for authentication
    const idToken = auth.currentUser ? await auth.currentUser.getIdToken() : null;
    
    // Set up headers with Authorization if we have a token
    const headers: Record<string, string> = 
      idToken ? { "Authorization": `Bearer ${idToken}` } : {};
    
    const res = await fetch(queryKey[0] as string, {
      headers
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
