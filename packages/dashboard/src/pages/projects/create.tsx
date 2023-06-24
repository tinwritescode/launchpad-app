import { Create, getValueFromEvent, useForm } from "@refinedev/antd";
import { IResourceComponentsProps } from "@refinedev/core";
import { DatePicker, Form, Input, InputNumber, Upload } from "antd";
import dayjs from "dayjs";
import React from "react";
import { env } from "../../env";
import TextQuill from "../../components/react-quill/TextQuill";

export const ProjectCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form
        {...formProps}
        layout="vertical"
        initialValues={{
          // generate all random values (mock)
          startTime: new Date().getTime() + 1000 * 60 * 2, // 2 minutes from now
          endTime: new Date().getTime() + 1000 * 60 * 5, // 5 minutes from now
          idoPrice: 1,
          purchaseCap: 100,
          idoTokenAddress: env.NEXT_PUBLIC_IDO_TOKEN_ADDRESS,
          // Fields that need to be filled
          image: "/images/igo/author/0.png",
          bannerImage: "/images/igo/item/00.jpg",
          videoURL: "https://www.youtube.com/watch?v=MNiGhWOMPJo",
          name: `IDO Project ${(Math.random() * 100).toFixed(0)}`,
          targettedRaise: "1000000",
          websiteURL: "https://myidoproject.com",
          facebookURL: "https://facebook.com/myidoproject",
          twitterURL: "https://twitter.com/myidoproject",
          telegramURL: "https://t.me/myidoproject",

          descriptionContent: "Description Content",
          backerContent: "Backer Content",
          tokenDetailsContent: "Token Details Content",
          aboutContent: "About Content",
          roadmapContent: "Roadmap Content",
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
          label="Description Content"
          name={["descriptionContent"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <TextQuill />
        </Form.Item>
        <Form.Item
          label="Backer Content"
          name={["backerContent"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <TextQuill />
        </Form.Item>
        <Form.Item
          label="Token Details Content"
          name={["tokenDetailsContent"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <TextQuill />
        </Form.Item>
        <Form.Item
          label="About Content"
          name={["aboutContent"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <TextQuill />
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
          <TextQuill />
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
        <Form.Item label="Banner Image">
          <Form.Item
            name="bannerImage"
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
          <DatePicker showTime />
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
          <DatePicker showTime />
        </Form.Item>

        <Form.Item
          label="IDO Price"
          name={["idoPrice"]}
          help="How many STRAW tokens users have to pay for 1 IDO token"
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
          help="How much money do you want to raise in STRAW"
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

        <Form.Item label="Website" name={["websiteURL"]}>
          <Input />
        </Form.Item>

        <Form.Item label="Facebook Page" name={["facebookURL"]}>
          <Input />
        </Form.Item>

        <Form.Item label="Telegram Channel" name={["telegramURL"]}>
          <Input />
        </Form.Item>

        <Form.Item label="Twitter Page" name={["twitterURL"]}>
          <Input />
        </Form.Item>
      </Form>
    </Create>
  );
};
