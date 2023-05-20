import { Role } from '@prisma/client';
import { api } from '../../../utils/api';

export const useSession = () => {
  return api.auth.getSession.useQuery(undefined, {});
};

export const useIsAdmin = () => {
  const { data: session } = useSession();

  return {
    isAdmin:
      session?.isLoggedIn &&
      session?.roles?.some((role: string) => role.includes('ADMIN' as Role)),
  };
};

const ACCESS_TOKEN = 'accessToken';

export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN);
};

export const setAccessToken = (accessToken: string) => {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
};

export const removeAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN);
};
