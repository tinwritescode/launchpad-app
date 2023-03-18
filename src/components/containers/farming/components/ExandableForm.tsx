import { Button, Form, Input } from "antd";
import React from "react";
import styled from "styled-components";

type Props = {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  btn1?: { name: string; onClick: () => void };
  btn2?: { name: string; onClick: () => void };
};

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #eaeaea;
  padding: 10px;
  box-sizing: border-box;
  gap: 10px;
`;

function ExandableForm({ value, btn1, btn2, onChange }: Props) {
  const [form] = Form.useForm();

  return (
    <StyledForm form={form}>
      {onChange ? (
        <Form.Item>
          <Input value={value} onChange={onChange} />
        </Form.Item>
      ) : (
        <Form.Item>
          <Input
            value={value}
            disabled={true}
            style={{
              backgroundColor: "#0000",
              border: "none",
              fontWeight: "bold",
              fontSize: "18px",
              color: "black",
              cursor: "default",
            }}
          />
        </Form.Item>
      )}
      {btn1 && (
        <Form.Item>
          <Button onClick={btn1.onClick}>{btn1.name}</Button>
        </Form.Item>
      )}
      {btn2 && (
        <Form.Item>
          <Button onClick={btn2.onClick}>{btn2.name}</Button>
        </Form.Item>
      )}
    </StyledForm>
  );
}

export default ExandableForm;
