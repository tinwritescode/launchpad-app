import React from "react";
import { ButtonProps } from "antd";

import * as S from "./AppButton.style";

interface Props extends ButtonProps {}

const AppButton: React.FC<Props> = ({ children, ...rest }) => {
  return <S.Container {...rest}>{children}</S.Container>;
};

export default AppButton;
