import { api } from "../../../utils/api";

export const useSession = () => {
  return api.auth.getSession.useQuery(undefined, {});
};
