import { Button, ButtonProps } from "@mui/material";
import { ConfigProvider, theme } from "antd";
import React from "react";
import style from "./AppButton.module.scss";

interface Props extends ButtonProps {}

const AppButton: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <Button
      className={[...(rest?.className || []), style.button].join(" ")}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default AppButton;
