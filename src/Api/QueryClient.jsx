// 📂 Location: src/api/queryClient.js
import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";
import { toast } from "sonner";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      // 1. Ignore background sync updates
      if (query.state.data !== undefined) return;

      const status = error.status || error.response?.status;

      // 2. Filter out 401 leaks handled by your interceptor
      if (status === 401) return;

      switch (status) {
        case 400:
          toast.error("Validation Error", {
            id: "global-validation-error",
            description: error.message,
          });
          break;

        case 403:
          toast.error("Access Denied", {
            id: "global-auth-error",
            description: "You do not have permission to view this.",
          });
          break;

        case 404:
          toast.error("Not Found", {
            id: "global-not-found-error",
            description: "The requested item does not exist.",
          });
          break;

        case 500:
          // Clear any conflicting active toasts from mutations or default queries
          toast.dismiss("action-error");
          toast.dismiss("global-network-error");

          toast.error("Server Error", {
            id: "global-server-error",
            description: "Our team has been notified. Please try again soon.",
          });
          break;

        default:
          // MUTUAL GUARD: If an action error toast is already active,
          // skip this generic network error query toast entirely.
          toast.error("Network Error", {
            id: "global-network-error",
            description: error.message || "Connection issues occurred.",
          });
          break;
      }
    },
  }),

  mutationCache: new MutationCache({
    onError: (error) => {
      const status = error.status || error.response?.status;
      if (status === 401) return;
// console.log(error);
      // MUTUAL GUARD: The moment a specific mutation action fails,
      // instantly dismiss any generic query-level network toasts to stop overlap.
      toast.dismiss("global-network-error");

      if (status === 500) {
        toast.error("Server Error", {
          id: "global-server-error",
          description: "Our team has been notified. Please try again soon.",
        });
        return;
      }

      // Default fallback for mutation actions (like status code 400 or generic text)
      toast.error("Action Failed", {
        id: "action-error",
        description:
          error instanceof Error ? error.message : JSON.stringify(error),
      });
    },
  }),

  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        const status = error.status || error.response?.status;
        if ([400, 401, 403, 404].includes(status)) {
          return false;
        }
        return failureCount < 2;
      },
      refetchOnWindowFocus: false,
    },
  },
});
