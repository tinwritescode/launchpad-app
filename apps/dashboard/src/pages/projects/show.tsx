import React from "react";
import { IResourceComponentsProps, useShow, useOne } from "@refinedev/core";
import {
  Show,
  TagField,
  TextField,
  DateField,
  ImageField,
  UrlField,
} from "@refinedev/antd";
import { Row, Typography, Space, Col } from "antd";
import { AntdShowInferencer } from "@refinedev/inferencer/antd";

const { Title } = Typography;

export const ProjectShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: ownerData, isLoading: ownerIsLoading } = useOne({
    resource: "owners",
    id: record?.ownerId || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <TextField value={record?.id} />
      <Title level={5}>Created At</Title>
      <DateField value={record?.createdAt} />
      <Title level={5}>Updated At</Title>
      <DateField value={record?.updatedAt} />
      <Title level={5}>Name</Title>
      <TextField value={record?.name} />
      <Title level={5}>Image</Title>
      <ImageField style={{ maxWidth: 200 }} value={record?.image} />
      <Title level={5}>Status</Title>
      <TextField value={record?.status} />
      <Title level={5}>Summary Content</Title>
      <TextField value={record?.summaryContent} />
      <Title level={5}>Video URL</Title>
      <UrlField value={record?.videoURL} />
      <Title level={5}>Comparision Content</Title>
      <TextField value={record?.comparisionContent} />
      <Title level={5}>Roadmap Content</Title>
      <TextField value={record?.roadmapContent} />
      <Title level={5}>Owner</Title>
      {ownerIsLoading ? (
        <>Loading...</>
      ) : (
        <Space direction="vertical" size="small" className="mb-4">
          <div>
            ID: <TextField value={ownerData?.data?.id} />
          </div>
          <div>
            Wallet address: <TextField value={ownerData?.data?.walletAddress} />
          </div>
          {ownerData?.data?.roles?.map((item: any) => (
            <TagField value={item} key={item} />
          ))}
        </Space>
      )}
      <Title level={5}>IDOContract</Title>
      {/* {record?.IDOContract?.map((item: any) => (
        <TagField value={item?.name} key={item?.name} />
      ))} */}
    </Show>
  );
};
