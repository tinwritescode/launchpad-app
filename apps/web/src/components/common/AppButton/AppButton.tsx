import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import React from "react";
import style from "./AppButton.module.scss";

interface Props extends LoadingButtonProps {}

const AppButton: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <LoadingButton
      className={[...(rest?.className || []), style.button].join(" ")}
      {...rest}
    >
      {children}
    </LoadingButton>
  );
};

export default AppButton;
