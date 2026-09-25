import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity // we add the infinity stale time so every response gets cached.
        }
    }
})