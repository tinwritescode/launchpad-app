import React from "react";
import { Web3Provider } from "./Web3Provider";

type Props = {
  children: React.ReactNode;
};

export const Providers = ({ children }: Props) => (
  <Web3Provider>{children}</Web3Provider>
);
