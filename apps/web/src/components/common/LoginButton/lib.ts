import { Role } from "database";
import { api } from "../../../utils/api";

export const useSession = () => {
  return api.auth.getSession.useQuery(undefined, {});
};

export const useIsAdmin = () => {
  const { data: session } = useSession();

  return {
    isAdmin:
      session?.isLoggedIn &&
      session?.roles?.some((role) => role.includes("ADMIN" as Role)),
  };
};
