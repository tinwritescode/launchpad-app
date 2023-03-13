import { Role } from "@prisma/client";
import { IronSessionOptions } from "iron-session";
import { env } from "../env.mjs";

export const sessionOptions: IronSessionOptions = {
  cookieName: "dapp-session",
  password: env.SESSION_SECRET,
};

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      isLoggedIn: true;
      roles: Role[];
      address: string;
    };
  }
}
