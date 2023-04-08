import {
  DateField,
  EditButton,
  ImageField,
  List,
  ShowButton,
  UrlField,
  useTable,
} from "@refinedev/antd";
import { BaseRecord, IResourceComponentsProps } from "@refinedev/core";
import { Space, Table } from "antd";
import React from "react";

export const ProjectList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="Id" />
        <Table.Column dataIndex="name" title="Name" />
        <Table.Column
          dataIndex="comparisionContent"
          title="Comparision Content"
        />
        <Table.Column
          dataIndex={["image"]}
          title="Image"
          render={(value: any) => (
            <ImageField style={{ maxWidth: "100px" }} value={value} />
          )}
        />
        <Table.Column dataIndex="roadmapContent" title="Roadmap Content" />
        <Table.Column dataIndex="summaryContent" title="Summary Content" />
        <Table.Column
          dataIndex={["videoURL"]}
          title="Video URL"
          render={(value: any) => <UrlField value={value} />}
        />
        <Table.Column dataIndex="status" title="Status" />
        <Table.Column
          dataIndex={["createdAt"]}
          title="Created At"
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column
          dataIndex={["updatedAt"]}
          title="Updated At"
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_: any, record: BaseRecord) => (
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
