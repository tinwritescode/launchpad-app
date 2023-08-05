import { LockOutlined } from "@ant-design/icons";
import {
  Edit,
  SaveButton,
  getValueFromEvent,
  useSelect,
  useStepsForm,
} from "@refinedev/antd";
import {
  IResourceComponentsProps,
  useCustom,
  useCustomMutation,
  useInvalidate,
} from "@refinedev/core";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Steps,
  Table,
  Typography,
  Upload,
} from "antd";
import { BigNumber as BigNumberJS } from "bignumber.js";
import React, { Fragment } from "react";
import TextQuill from "../../components/react-quill/TextQuill";

const FULLFIL_DIVIDEND_URL = `http://localhost:3000/token-manager`;

export const ProjectEdit: React.FC<IResourceComponentsProps> = () => {
  const invalidate = useInvalidate();
  const {
    formProps,
    saveButtonProps,
    queryResult,
    stepsProps,
    current,
    gotoStep,
  } = useStepsForm();
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

  console.log(dividendInfo.data?.data);

  const whitelistInfo = useCustom({
    method: "get",
    url: `/projects/${projectsData?.id}/whitelist`,
    queryOptions: {
      enabled: !!projectsData?.id,
    },
  });

  const onLockWhitelist = async () => {
    if (!projectsData?.id) return;

    mutate(
      {
        method: "post",
        url: `/projects/startWhitelisting`,
        values: {
          projectId: projectsData?.id,
        },
      },
      {
        onSuccess: () => {
          invalidate({
            resource: "projects",
            invalidates: ["all"],
          });

          whitelistInfo.refetch();
        },
      }
    );
  };

  const isDistributed = dividendInfo?.data?.data?.isDistributed;
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
  const columns = [
    {
      title: "Wallet Address",
      dataIndex: "address",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (value: any) => {
        return <>{new BigNumberJS(value).div(1e18).toFormat(2)}</>;
      },
    },
  ];

  const formList = [
    <>
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
      {/* <Form.Item
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
      </Form.Item> */}
      {/* <Form.Item
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
      </Form.Item> */}
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
      <Form.Item label="Image">
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
    </>,
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
                  {isDistributed ? (
                    <Typography.Text style={{ fontSize: "1rem" }}>
                      ✅ Tokens have been distributed.
                    </Typography.Text>
                  ) : (
                    (!isDividendFulfilled && (
                      <Typography.Text style={{ fontSize: "1rem" }}>
                        {`❌ You need to send ${BigNumberJS(
                          dividendInfo?.data?.data?.requiredBalance
                        )
                          .dividedBy(10 ** 18)
                          .toFormat()} tokens to the contract address (current balance: ${BigNumberJS(
                          dividendInfo?.data?.data?.dividendBalance
                        )
                          .dividedBy(10 ** 18)
                          .toFormat()}).`}
                        <br />
                        💡 Send this link to the owner to fulfill the dividend:{" "}
                        <Typography.Link
                          href={`${FULLFIL_DIVIDEND_URL}?projectId=${projectsData?.id}`}
                          target="_blank"
                          style={{ fontSize: "16px" }}
                        >
                          Fulfill dividend
                        </Typography.Link>
                      </Typography.Text>
                    )) || (
                      <Typography.Text style={{ fontSize: "1rem" }}>
                        {`✅ Ready to distribute ${BigNumberJS(
                          dividendInfo?.data?.data?.dividendBalance
                        )
                          .dividedBy(10 ** 18)
                          .toFormat()} tokens to ido contracts.`}
                      </Typography.Text>
                    )
                  )}
                </div>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>
    </Form.Item>,
    <Fragment>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          type="primary"
          onClick={() => onLockWhitelist()}
          disabled={whitelistInfo.data?.data?.length > 0}
          size="large"
          icon={<LockOutlined rev />}
          danger
        >
          Lock whitelist
        </Button>
      </div>
      {/* Table */}

      <Table columns={columns} dataSource={whitelistInfo.data?.data as any[]} />
    </Fragment>,
  ];
  const onDistribute = () => {
    mutate(
      {
        url: `projects/divide`,
        method: "post",
        values: {
          projectId: projectsData?.id,
        },
      },
      {
        onSuccess: () => {
          invalidate({
            resource: "projects",
            id: projectsData?.id,
            invalidates: ["all"],
          });
        },
      }
    );
  };
  const isDividendFulfilled = dividendInfo?.data?.data?.isDividendFulfilled;

  console.log("isDividendFulfilled", dividendInfo.data?.data);

  return (
    <Edit
      saveButtonProps={saveButtonProps}
      footerButtons={
        <>
          {current > 0 && (
            <Button
              onClick={() => {
                gotoStep(current - 1);
              }}
            >
              Previous
            </Button>
          )}
          {current < formList.length - 1 && (
            <Button
              onClick={() => {
                gotoStep(current + 1);
              }}
            >
              Next
            </Button>
          )}
          {current === formList.length - 1 && (
            <SaveButton {...saveButtonProps} />
          )}
        </>
      }
    >
      <Form
        {...formProps}
        layout="vertical"
        style={{
          display: "grid",
          gap: "2rem",
        }}
      >
        <Steps
          {...stepsProps}
          items={[
            { title: "About Project" },
            { title: "Distribute tokens" },
            {
              title: "Whitelist",
            },
          ]}
        />

        {formList[current]}
      </Form>
    </Edit>
  );
};
