import styled from "styled-components";

export const Container = styled.div`
  .ant-row {
    align-items: center;
    .ant-col {
      :nth-child(1) {
        text-align: left;
      }
      :nth-child(2) {
        text-align: center;
      }
      :nth-child(3) {
        text-align: right;
      }
    }
  }
`;
