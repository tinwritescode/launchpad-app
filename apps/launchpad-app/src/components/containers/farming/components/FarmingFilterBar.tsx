import React from "react";
import styled from "styled-components";
import { Switch, Select } from "antd";

const FilterBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #eaeaea;
  box-sizing: border-box;
    & > ul {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      padding: 0;
      margin: 0;
      list-style: none;

      & > li {
        border-left: 1px solid #eaeaea;
        display: inline-block;
        padding: 10px 20px;
        font-size: 14px;
        font-weight: 500;
        color: #000;
        cursor: pointer;
        &:hover {
          color: #000;
          border-bottom: 2px solid #000;
        }
      }
    }
  }
`;

const StyledSwitch = styled(Switch)`
  margin: 0 10px;
`;

const StyledSelect = styled(Select)`
  width: 100px;
  margin: 0 10px;
`;

const FarmingFilterBar = () => {
  return (
    <FilterBar>
      <ul>
        <li>ACTIVE</li>
        <li>INACTIVE</li>
        <li>
          <StyledSwitch />
          STAKED ONLY
        </li>
      </ul>

      <StyledSelect defaultValue="All Pools">
        <Select.Option value="All">All</Select.Option>
        <Select.Option value="BTC">BTC</Select.Option>
        <Select.Option value="ETH">ETH</Select.Option>
      </StyledSelect>
    </FilterBar>
  );
};

export default FarmingFilterBar;
