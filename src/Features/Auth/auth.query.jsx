import { useQuery } from "@tanstack/react-query";
import { userData } from "./auth.api";
import { useState } from "react";
export const useCurrentUser = () => {
    // const [isEnabled, setIsEnabled] = useState(true);
  // const query =
  return   useQuery({
   queryKey: ["user"],
   queryFn: userData,
   retry: false,
  //  enabled: isEnabled,
  //  staleTime: Infinity,
 });
  // const disableQuery = () => setIsEnabled(false);
  // return {...query,disableQuery}
};
