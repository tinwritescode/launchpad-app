import {
  DateField,
  TagField,
  EditButton,
  ImageField,
  List,
  ShowButton,
  UrlField,
  useTable,
} from '@refinedev/antd';
import { BaseRecord, IResourceComponentsProps } from '@refinedev/core';
import { Space, Table, Typography } from 'antd';
import React from 'react';

export const ProjectList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="id"
          title="Id"
          render={(value: any) => (
            <Typography.Text
              ellipsis={{ tooltip: value }}
              style={{
                maxWidth: '100px',
              }}
            >
              {value}
            </Typography.Text>
          )}
        />
        <Table.Column dataIndex="name" title="Name" />
        <Table.Column
          dataIndex="comparisionContent"
          title="Comparision Content"
          render={(value: any) => (
            <Typography.Text
              ellipsis={{ tooltip: value }}
              style={{
                maxWidth: '160px',
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: value }} />
            </Typography.Text>
          )}
        />
        <Table.Column
          dataIndex={['image']}
          title="Image"
          render={(value: any) => (
            <ImageField style={{ maxWidth: '100px' }} value={value} />
          )}
        />
        <Table.Column
          dataIndex="roadmapContent"
          title="Roadmap Content"
          render={(value: any) => (
            <Typography.Text
              ellipsis={{ tooltip: value }}
              style={{
                maxWidth: '160px',
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: value }} />
            </Typography.Text>
          )}
        />
        <Table.Column
          dataIndex="summaryContent"
          title="Summary Content"
          render={(value: any) => (
            <Typography.Text
              ellipsis={{ tooltip: value }}
              style={{
                maxWidth: '160px',
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: value }} />
            </Typography.Text>
          )}
        />
        <Table.Column
          dataIndex={['videoURL']}
          title="Video URL"
          render={(value: any) => <UrlField value={value} />}
        />
        <Table.Column
          dataIndex="status"
          title="Status"
          render={(value: any) => <TagField value={value} />}
        />
        <Table.Column
          dataIndex={['createdAt']}
          title="Created At"
          render={(value: any) => <DateField value={value} />}
          width={150}
        />
        <Table.Column
          dataIndex={['updatedAt']}
          title="Updated At"
          render={(value: any) => <DateField value={value} />}
          width={150}
        />
        <Table.Column
          dataIndex={['websiteURL']}
          title="Website"
          render={(value: any) => <UrlField value={value} />}
        />
        <Table.Column
          dataIndex={['facebookURL']}
          title="Facebook Page"
          render={(value: any) => <UrlField value={value} />}
        />
        <Table.Column
          dataIndex={['telegramURL']}
          title="Telegram Channel"
          render={(value: any) => <UrlField value={value} />}
        />
        <Table.Column
          dataIndex={['twitterURL']}
          title="Twitter Page"
          render={(value: any) => <UrlField value={value} />}
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
