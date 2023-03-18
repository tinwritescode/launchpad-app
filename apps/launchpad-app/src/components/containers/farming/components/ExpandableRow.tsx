import React from "react";
import styled from "styled-components";
import { Input, Button } from "antd";

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
  return (
    <>
      <StyledExpandableRow>
        <StyledForm>
          <h3>Deposit</h3>
          <StyledInput>
            <Input />
            <Button>MAX</Button>
            <Button>APRROVE</Button>
          </StyledInput>
          <span>Your balance: 156BNB</span>
        </StyledForm>
        <StyledForm>
          <h3>Withdraw</h3>
          <StyledInput>
            <Input />
            <Button>MAX</Button>
            <Button>Withdraw</Button>
          </StyledInput>
          <span>deposited: 156BNB</span>
        </StyledForm>
        <StyledForm>
          <h3>Pending Rewards</h3>
          <StyledInput>
            <h3>2232 BNB</h3>
            <Button>Claim</Button>
          </StyledInput>
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
