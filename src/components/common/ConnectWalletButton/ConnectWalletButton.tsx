import React from "react";
import AppButton from "../AppButton";

import * as S from "./ConnectWalletButton.style";

interface Props {}

const ConnectWalletButton: React.FC<Props> = () => {
  return (
    <S.Container>
      <AppButton>Connect</AppButton>
    </S.Container>
  );
};

export default ConnectWalletButton;
