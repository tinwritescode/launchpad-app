import {
  DateField,
  EditButton,
  ImageField,
  List,
  ShowButton,
  TagField,
  UrlField,
  useTable,
} from "@refinedev/antd";
import { BaseRecord, IResourceComponentsProps } from "@refinedev/core";
import { Space, Table, Typography } from "antd";
import { ethers } from "ethers";
import React from "react";

const { formatEther, commify } = ethers.utils;

export const ProjectList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex={["createdAt"]}
          title="Created At"
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column dataIndex="id" title="Id" />
        <Table.Column dataIndex="name" title="Name" />
        <Table.Column
          dataIndex={["image"]}
          title="Image"
          render={(value: any) => (
            <ImageField style={{ maxWidth: "100px" }} value={value} />
          )}
        />
        <Table.Column
          dataIndex={["videoURL"]}
          title="Video URL"
          render={(value: any) => <UrlField value={value} />}
        />
        <Table.Column
          dataIndex="status"
          title="Status"
          render={(value: any) => <TagField value={value} />}
        />
        <Table.Column
          title="Social medias"
          width={300}
          render={(value: any) => (
            <Typography.Text>
              <div>
                ⭐️ Website URL: <UrlField value={value.websiteURL} />
              </div>
              <div>
                ⭐️ Facebook URL: <UrlField value={value.facebookURL} />
              </div>
              <div>
                ⭐️ Telegram URL: <UrlField value={value.telegramURL} />
              </div>
              <div>
                ⭐️ Twitter URL: <UrlField value={value.twitterURL} />
              </div>
            </Typography.Text>
          )}
        />

        <Table.Column
          dataIndex="targettedRaise"
          title="Targetted Raise (in STRAW)"
          render={(value: any) => commify(formatEther(value))}
        />
        <Table.Column
          title="Sale Status"
          render={(item, record) => (record as any)?.sale.status}
        />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
