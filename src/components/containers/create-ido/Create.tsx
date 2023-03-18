import { Button, DatePicker, Form, Input, InputNumber, message } from "antd";
import {
  IdoContractDto,
  idoContractDto,
} from "../../../server/services/ido-contract.dto";

type Props = {};

export function Create({}: Props) {
  const [form] = Form.useForm();

  const handleSubmit = (values: IdoContractDto) => {
    const payload = idoContractDto.safeParse(values);

    if (!payload.success) {
      message.error(`Invalid payload: ${payload.error.message}`);
      return;
    }

    console.log(values);
  };

  return (
    <div>
      <Form onFinish={handleSubmit} form={form}>
        {/* All fields */}
        <Form.Item label="Start time" required name="startTime">
          <DatePicker />
        </Form.Item>

        <Form.Item label="End time" required name="endTime">
          <DatePicker />
        </Form.Item>

        <Form.Item label="IDO Price" required name="idoPrice">
          <InputNumber />
        </Form.Item>

        <Form.Item label="IDO Token Address" required name="idoTokenAddress">
          <Input />
        </Form.Item>

        <Form.Item label="Purchase Cap" required name="purchaseCap">
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Staking Contract Address"
          required
          name="stakingContractAddress"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Staking Token Address"
          required
          name="stakingTokenAddress"
        >
          <Input />
        </Form.Item>

        <Form.Item label="Staking Required" required name="stakingRequired">
          <InputNumber />
        </Form.Item>

        {/* Submit */}
        <Form.Item>
          <Button htmlType="submit" type="primary" size="large">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
