import React from 'react';
import { IResourceComponentsProps, BaseRecord } from '@refinedev/core';
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  ImageField,
  UrlField,
  TagField,
  DateField,
} from '@refinedev/antd';
import { Table, Space } from 'antd';
import { ethers } from 'ethers';

const { formatEther, commify } = ethers.utils;

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
          dataIndex={['image']}
          title="Image"
          render={(value: any) => (
            <ImageField style={{ maxWidth: '100px' }} value={value} />
          )}
        />
        <Table.Column
          dataIndex={['videoURL']}
          title="Video URL"
          render={(value: any) => <UrlField value={value} />}
        />
        <Table.Column dataIndex="status" title="Status" />
        <Table.Column
          dataIndex={['createdAt']}
          title="Created At"
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column
          dataIndex={['updatedAt']}
          title="Updated At"
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column
          dataIndex={['websiteURL']}
          title="Website URL"
          render={(value: any) => <UrlField value={value} />}
        />
        <Table.Column
          dataIndex={['facebookURL']}
          title="Facebook URL"
          render={(value: any) => <UrlField value={value} />}
        />
        <Table.Column
          dataIndex={['telegramURL']}
          title="Telegram URL"
          render={(value: any) => <UrlField value={value} />}
        />
        <Table.Column
          dataIndex={['twitterURL']}
          title="Twitter URL"
          render={(value: any) => <UrlField value={value} />}
        />

        <Table.Column
          dataIndex="IDOContract"
          title="IDOContract"
          render={(value: any[]) => (
            <>
              {value?.map((item) => (
                <TagField value={item?.name} key={item?.name} />
              ))}
            </>
          )}
        />
        <Table.Column
          dataIndex="targettedRaise"
          title="Targetted Raise"
          render={(value: any) => commify(formatEther(value))}
        />
        <Table.Column dataIndex="saleStatus" title="Sale Status" />
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
