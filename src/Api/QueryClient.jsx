// // 📂 Location: src/api/queryClient.js
// import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";
// import { toast } from "sonner";

// export const queryClient = new QueryClient({
//   queryCache: new QueryCache({
//     onError: (error, query) => {
//       // 1. Ignore background sync updates
//       if (query.state.data !== undefined) return;

//       const status = error.status || error.response?.status;

//       // 2. Filter out 401 leaks handled by your interceptor
//       if (status === 401) return;

//       switch (status) {
//         case 400:
//           toast.error("Validation Error", {
//             id: "global-validation-error",
//             description: error.message,
//           });
//           break;

//         case 403:
//           toast.error("Access Denied", {
//             id: "global-auth-error",
//             description: "You do not have permission to view this.",
//           });
//           break;

//         case 404:
//           toast.error("Not Found", {
//             id: "global-not-found-error",
//             description: "The requested item does not exist.",
//           });
//           break;

//         case 500:
//           // Clear any conflicting active toasts from mutations or default queries
//           toast.dismiss("action-error");
//           toast.dismiss("global-network-error");

//           toast.error("Server Error", {
//             id: "global-server-error",
//             description: "Our team has been notified. Please try again soon.",
//           });
//           break;

//         default:
//           // MUTUAL GUARD: If an action error toast is already active,
//           // skip this generic network error query toast entirely.
//           toast.error("Network Error", {
//             id: "global-network-error",
//             description: error.message || "Connection issues occurred.",
//           });
//           break;
//       }
//     },
//   }),

//   mutationCache: new MutationCache({
//     onError: (error) => {
//       const status = error.status || error.response?.status;
//       if (status === 401) return;
// // console.log(error);
//       // MUTUAL GUARD: The moment a specific mutation action fails,
//       // instantly dismiss any generic query-level network toasts to stop overlap.
//       toast.dismiss("global-network-error");

//       if (status === 500) {
//         toast.error("Server Error", {
//           id: "global-server-error",
//           description: "Our team has been notified. Please try again soon.",
//         });
//         return;
//       }

//       // Default fallback for mutation actions (like status code 400 or generic text)
//       toast.error("Action Failed", {
//         id: "action-error",
//         description:
//           error instanceof Error ? error.message : JSON.stringify(error),
//       });
//     },
//   }),

//   defaultOptions: {
//     queries: {
//       retry: (failureCount, error) => {
//         const status = error.status || error.response?.status;
//         if ([400, 401, 403, 404].includes(status)) {
//           return false;
//         }
//         return failureCount < 2;
//       },
//       refetchOnWindowFocus: false,
//     },
//   },
// });
// 📂 Location: src/api/queryClient.js
import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";
import { toast } from "sonner";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      // 🔴 FIX 1: background sync updates ko ignore karein agar data pehle se hai
      if (query.state.data !== undefined) return;

      // 🔴 FIX 2: SERIOUS ISSUE FILTER
      // TanStack Query default retry (2 times) karta hai. Jab tak saari retries khatam nahi ho jatin, 
      // tab tak toast na dikhayein taaki temporary network drops user ko disturb na karein.
      const maxRetries = query.options.retry ?? 2; 
      const failureCount = query.state.fetchFailureCount;
      if (failureCount <= maxRetries) return; 

      // 🔴 FIX 3: Agar kisi specific component me aapne custom error handling karni ho,
      // toh query ke meta me { silent: true } pass kar ke global toast ko rokh sakte hain.
      if (query.meta?.silent) return;

      const status = error.status || error.response?.status;

      // Filter out 401 leaks handled by your interceptor
      if (status === 401) return;

      switch (status) {
        case 400:
          toast.error("Validation Error", {
            id: "global-validation-error",
            description: error.response?.data?.message || error.message,
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
          toast.dismiss("action-error");
          toast.dismiss("global-network-error");

          toast.error("Server Error", {
            id: "global-server-error",
            description: "Our team has been notified. Please try again soon.",
          });
          break;

        default:
          // Sirf tabhi network error dikhayen jab sach me severe failure ho
          toast.error("Network Error", {
            id: "global-network-error",
            description: error.message || "Connection issues occurred.",
          });
          break;
      }
    },
  }),

  mutationCache: new MutationCache({
    onError: (error, variables, context, mutation) => {
      // 🔴 FIX 4: Mutations ke liye bhi meta silent control add kar diya
      if (mutation.meta?.silent) return;

      const status = error.status || error.response?.status;
      if (status === 401) return;

      toast.dismiss("global-network-error");

      if (status === 500) {
        toast.error("Server Error", {
          id: "global-server-error",
          description: "Our team has been notified. Please try again soon.",
        });
        return;
      }

      toast.error("Action Failed", {
        id: "action-error",
        description:
          error.response?.data?.message || error.message || "An error occurred.",
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
        return failureCount < 2; // Total 2 retries (3 attempts total)
      },
      refetchOnWindowFocus: false,
      // 🔴 FIX 5: Stale time ko thoda badhayein taaki page par baar-baar click 
      // karne se background me faltu query requests automatic trigger na hon.
      staleTime: 1000 * 30, // 30 Seconds
    },
  },
});
