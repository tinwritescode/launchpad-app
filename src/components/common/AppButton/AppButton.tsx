import React from "react";
import { ButtonProps, ConfigProvider, theme } from "antd";

import * as S from "./AppButton.style";
import style from "./AppButton.module.scss";

interface Props extends ButtonProps {}

const AppButton: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <ConfigProvider
      theme={{
        token: {},
        algorithm: theme.compactAlgorithm,
      }}
    >
      <S.Container
        className={[...(rest?.className || []), style.button].join(" ")}
        {...rest}
      >
        {children}
      </S.Container>
    </ConfigProvider>
  );
};

export default AppButton;
