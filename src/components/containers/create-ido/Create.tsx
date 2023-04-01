import { Prisma } from "@prisma/client";
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
import toast from "react-hot-toast";
import { z } from "zod";
import { env } from "../../../env.mjs";
import { createIdoProjectInputSchema } from "../../../server/api/routers/project/project.schema";
import { api } from "../../../utils/api";

type Props = {};

type FormType = z.infer<typeof createIdoProjectInputSchema> & {
  time: [Date, Date];
};

export function Create({}: Props) {
  const { mutateAsync } = api.project.createIdoProject.useMutation();
  const [form] = Form.useForm();
  const router = useRouter();

  // TODO: make type safety for this
  const handleSubmit = useCallback(async (values: FormType) => {
    try {
      console.log(values);
      const startTime = values.time[0];
      const endTime = values.time[1];

      const { id } = await mutateAsync({
        ...values,
        endTime,
        startTime,
      });

      toast.success("Created");

      form.resetFields();
      router.push(`/ido/${id}`);
    } catch (error: any) {
      if (error instanceof TRPCClientError) {
        if (error?.shape?.data?.code === "INTERNAL_SERVER_ERROR") {
          toast.error(error?.shape?.message);
          return;
        }

        // if zod error
        if (error?.shape?.data?.code === "INVALID_INPUT") {
          // map errors
          const errors = JSON.parse(error?.message);

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
      }

      toast.error(error?.message || "Something went wrong");
    }
  }, []);

  return (
    <>
      <Form
        layout="vertical"
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
          time: [dayjs(), dayjs().add(1, "day")],
          idoPrice: 1,
          purchaseCap: 100,
          idoTokenAddress: env.NEXT_PUBLIC_IDO_TOKEN_ADDRESS,
          // Fields that need to be filled
          comparisionContent: "lorem ipsum dolor",
          image: "https://picsum.photos/200/300",
          roadmapContent: "ipsum lorem",
          summaryContent: "lorem ipsum",
          videoURL: "https://www.youtube.com/watch?v=MNiGhWOMPJo",
          name: "Project Name",
        }}
      >
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

        <Form.Item label="Time" required name="time">
          <DatePicker.RangePicker showTime showNow />
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
