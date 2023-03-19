import { TRPCClientError } from "@trpc/client";
import {
  Alert,
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
} from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/router.js";
import { useCallback } from "react";
import { z } from "zod";
import { env } from "../../../env.mjs";
import { createIdoProjectInputSchema } from "../../../server/api/routers/project/project.schema";
import { api } from "../../../utils/api";

type Props = {};

export function Create({}: Props) {
  const { mutateAsync } = api.project.createIdoProject.useMutation();
  const [form] = Form.useForm();
  const router = useRouter();

  // TODO: make type safety for this
  const handleSubmit = useCallback(
    async (values: z.infer<typeof createIdoProjectInputSchema>) => {
      try {
        const { id } = await mutateAsync({
          ...values,
          endTime: new Date(values.endTime * 1000),
          startTime: new Date(values.startTime * 1000),
        });

        message.success("Created");

        form.resetFields();
        router.push(`/ido/${id}`);
      } catch (error: any) {
        if (error instanceof TRPCClientError) {
          // map errors
          const errors = JSON.parse(error.message);

          errors.forEach((error: any) => {
            form.setFields([
              {
                name: error.path,
                errors: [error.message],
              },
            ]);
          });

          return;
        }

        message.error(error?.message || "Something went wrong");
      }
    },
    []
  );

  return (
    <>
      <Form
        form={form}
        onFinish={handleSubmit}
        onFieldsChange={(changedFields, allFields) => {
          if (changedFields.length > 0) {
            form.setFields(
              changedFields.map((field) => ({
                name: field.name,
                errors: [],
              }))
            );
          }
        }}
        // Remove mock later
        initialValues={{
          startTime: dayjs(),
          endTime: dayjs().add(1, "day"),
          idoPrice: 1,
          purchaseCap: 100,
          idoTokenAddress: env.NEXT_PUBLIC_IDO_TOKEN_ADDRESS,
          // Fields that need to be filled
          comparisionContent: " ",
          image: "https://twst.io/",
          roadmapContent: " ",
          summaryContent: " ",
          videoURL: "https://www.youtube.com/watch?v=",
          name: " ",
        }}
      >
        <Alert
          message={JSON.stringify(form.getFieldsError().map((e) => e.errors))}
          type="error"
          showIcon
        />

        {/* Fields that need to be filled */}
        <Form.Item
          label="Name"
          required
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Image" required name="image">
          <Input />
        </Form.Item>

        <Form.Item label="Video URL" required name="videoURL">
          <Input />
        </Form.Item>

        <Form.Item label="Summary Content" required name="summaryContent">
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="Roadmap Content" required name="roadmapContent">
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Comparision Content"
          required
          name="comparisionContent"
        >
          <Input.TextArea />
        </Form.Item>

        {/* Find a way handle it better */}
        <Form.Item label="Start Time" required name="startTime">
          <DatePicker showTime />
        </Form.Item>

        <Form.Item label="End Time" required name="endTime">
          <DatePicker showTime />
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

        {/* Submit */}
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
