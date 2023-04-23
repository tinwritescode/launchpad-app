import { Edit, getValueFromEvent, useForm, useSelect } from "@refinedev/antd";
import {
  IResourceComponentsProps,
  useCustom,
  useCustomMutation,
} from "@refinedev/core";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Typography,
  Upload,
} from "antd";
import dayjs from "dayjs";
import React from "react";

const FULLFIL_DIVIDEND_URL = "http://localhost:3000/token-manager";

export const ProjectEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();

  const projectsData = queryResult?.data?.data;

  const { selectProps: ownerSelectProps } = useSelect({
    resource: "owners",
    defaultValue: projectsData?.ownerId,
    optionLabel: "walletAddress",
  });

  const { data, mutate } = useCustomMutation();
  const dividendInfo = useCustom({
    method: "get",
    url: `/projects/${projectsData?.id}/dividend`,
    queryOptions: {
      enabled: !!projectsData?.id,
    },
  });

  const statusList = [
    {
      label: "Active",
      value: "ACTIVE",
    },
    {
      label: "Inactive",
      value: "INACTIVE",
    },
    {
      label: "Deleted",
      value: "DELETED",
    },
  ];

  const onDistribute = () => {
    mutate({
      url: `projects/divide`,
      method: "post",
      values: {
        projectId: projectsData?.id,
      },
    });
  };

  const isDividendFulfilled = dividendInfo?.data?.data?.isDividendFulfilled;

  console.log(isDividendFulfilled);

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Id"
          name={["id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input readOnly disabled />
        </Form.Item>
        <Form.Item
          label="Created At"
          name={["createdAt"]}
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
          label="Updated At"
          name={["updatedAt"]}
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
          label="Status"
          name={["status"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          {/* <Input /> */}
          <Select>
            {statusList.map((key) => (
              <Select.Option key={key.value} value={key.value}>
                {key.label}
              </Select.Option>
            ))}
          </Select>
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
          <Input />
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
          label="Comparision Content"
          name={["comparisionContent"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
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
          <Input />
        </Form.Item>
        <Form.Item
          label="Owner"
          name={"ownerId"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...ownerSelectProps} />
        </Form.Item>

        <Form.Item label="Distribution token" required>
          <Form.List name="IDOContract">
            {(fields, { add, remove }) => {
              return (
                <div>
                  <Row gutter={16}>
                    <Col span={24}>
                      {fields.map((field) => {
                        return (
                          <Row key={field.key} gutter={16}>
                            <Col span={7}>
                              <Form.Item
                                {...field}
                                label="Name"
                                name={[field.name, "name"]}
                              >
                                <Input disabled />
                              </Form.Item>
                            </Col>
                            <Col span={7}>
                              <Form.Item
                                {...field}
                                label="Distribution Amount"
                                name={[field.name, "dividendAmount"]}
                              >
                                <Input disabled />
                              </Form.Item>
                            </Col>
                            <Col span={7}>
                              <Form.Item
                                {...field}
                                label="Fulfilled Amount"
                                name={[field.name, "fulfilledAmount"]}
                              >
                                <Input disabled />
                              </Form.Item>
                            </Col>
                          </Row>
                        );
                      })}
                    </Col>
                  </Row>
                  <Form.Item>
                    <div style={{ display: "grid", gap: "0.5rem" }}>
                      <Button
                        size="large"
                        type="primary"
                        onClick={onDistribute}
                        block
                        disabled={!isDividendFulfilled}
                      >
                        Distribute tokens
                      </Button>
                      {!isDividendFulfilled && (
                        <Typography.Text style={{ fontSize: "1rem" }}>
                          Please fulfill dividend first.{" "}
                          <Typography.Link
                            href={FULLFIL_DIVIDEND_URL}
                            target="_blank"
                          >
                            Fulfill dividend
                          </Typography.Link>
                        </Typography.Text>
                      )}
                    </div>
                  </Form.Item>
                </div>
              );
            }}
          </Form.List>
        </Form.Item>

        {/* <>
          {(projectsData?.IDOContract as any[])?.map((item, index) => (
            <Form.Item
              key={index}
              label={`IDOContract ${index + 1}`}
              name={["IDOContract", index, "name"]}
            >
              <Input type="text" />
            </Form.Item>
          ))}
        </> */}
      </Form>
    </Edit>
  );
};
