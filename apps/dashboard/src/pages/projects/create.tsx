import { Create, getValueFromEvent, useForm } from "@refinedev/antd";
import { IResourceComponentsProps } from "@refinedev/core";
import { DatePicker, Form, Input, InputNumber, Upload } from "antd";
import dayjs from "dayjs";
import React from "react";
import { env } from "../../env";

export const ProjectCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form
        {...formProps}
        layout="vertical"
        initialValues={{
          // generate all random values (mock)
          startTime: new Date().getTime() + 1000 * 60 * 60 * 24 * 1,
          endTime: new Date().getTime() + 1000 * 60 * 60 * 24 * 10,
          idoPrice: 1,
          purchaseCap: 100,
          idoTokenAddress: env.NEXT_PUBLIC_IDO_TOKEN_ADDRESS,
          // Fields that need to be filled
          comparisionContent: "lorem ipsum dolor",
          image: "https://picsum.photos/200/300",
          roadmapContent: "ipsum lorem",
          summaryContent: "lorem ipsum",
          videoURL: "https://www.youtube.com/watch?v=MNiGhWOMPJo",
          name: `IDO Project ${(Math.random() * 100).toFixed(0)}`,
          targettedRaise: "1000000",
        }}
      >
        <Form.Item
          label="Name"
          name={["name"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Comparision Content"
          name={["comparisionContent"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Image">
          <Form.Item
            name="image"
            getValueProps={(value: any) => ({
              fileList: [{ url: value, name: value, uid: value }],
            })}
            getValueFromEvent={getValueFromEvent}
            noStyle
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Upload.Dragger
              capture={false}
              listType="picture"
              beforeUpload={() => false}
            >
              <p className="ant-upload-text">Drag & drop a file in this area</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
        <Form.Item
          label="Roadmap Content"
          name={["roadmapContent"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Summary Content"
          name={["summaryContent"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Video URL"
          name={["videoURL"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Start Time"
          name={["startTime"]}
          rules={[
            {
              required: true,
            },
          ]}
          getValueProps={(value: any) => ({
            value: value ? dayjs(value) : undefined,
          })}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          label="End Time"
          name={["endTime"]}
          rules={[
            {
              required: true,
            },
          ]}
          getValueProps={(value: any) => ({
            value: value ? dayjs(value) : undefined,
          })}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          label="IDO Price"
          name={["idoPrice"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="IDO Token Address"
          name={["idoTokenAddress"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Targetted Raise"
          name={["targettedRaise"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
      </Form>
    </Create>
  );
};
