import React from "react";
import styled from "styled-components";
import { Input, Button } from "antd";
import ExandableForm from "./ExandableForm";

const StyledForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: left;
    box-sizing: border-box;
    padding: 10px;
}`;

const StyledInput = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #eaeaea;
    padding: 10px;
    box-sizing: border-box;
    gap: 10px;
}`;

const StyledExpandableRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #eaeaea;
    box-sizing: border-box;
}`;

const ExpandableRow = () => {
  // deposit form
  const [depositValue, setDepositValue] = React.useState("0");
  const handleMaxDeposit = () => {
    setDepositValue("156");
  };
  const handleDeposit = () => {
    console.log("deposit: " + depositValue);
  };
  const depositBtn1 = { name: "Max", onClick: handleMaxDeposit };
  const depositBtn2 = { name: "Deposit", onClick: handleDeposit };

  // withdraw form
  const [withdrawValue, setWithdrawValue] = React.useState("0");
  const handleMaxWithdraw = () => {
    setWithdrawValue("156");
  };
  const handleWithdraw = () => {
    console.log("withdraw: " + withdrawValue);
  };
  const withdrawBtn1 = { name: "Max", onClick: handleMaxWithdraw };
  const withdrawBtn2 = { name: "Withdraw", onClick: handleWithdraw };

  // claim form
  const handleClaim = () => {
    console.log("claim");
  };
  const claimBtn1 = { name: "Claim", onClick: handleClaim };

  return (
    <>
      <StyledExpandableRow>
        <StyledForm>
          <h3>Deposit</h3>
          <ExandableForm
            value={depositValue}
            onChange={(e) => setDepositValue(e.target.value)}
            btn1={depositBtn1}
            btn2={depositBtn2}
          />
          <span>Your balance: 156BNB</span>
        </StyledForm>
        <StyledForm>
          <h3>Withdraw</h3>
          <ExandableForm
            value={withdrawValue}
            onChange={(e) => setWithdrawValue(e.target.value)}
            btn1={withdrawBtn1}
            btn2={withdrawBtn2}
          />
          <span>deposited: 156BNB</span>
        </StyledForm>
        <StyledForm>
          <h3>Pending Rewards</h3>
          <ExandableForm value={"2232"} btn1={claimBtn1} />
        </StyledForm>
      </StyledExpandableRow>
      <div>
        <span>Get ACT-BNB</span>
        <span>Get ACT-BNB</span>
        <span>Get ACT-BNB</span>
      </div>
    </>
  );
};

export default ExpandableRow;
