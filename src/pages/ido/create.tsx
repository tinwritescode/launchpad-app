import React, { useCallback } from 'react';
import { Button, Input, message, Spin } from 'antd';
import PageLayout from '../../components/templates/PageLayout';
import { Form } from 'antd';
import { api } from '../../utils/api';

type Props = {};

function Create({}: Props) {
  const [form] = Form.useForm();
  const utils = api.useContext();
  const { isLoading, mutateAsync } = api.demoProject.createOne.useMutation({
    onSettled: async (data, error) => {
      utils.demoProject.invalidate();
    },
  });

  const onFormFinish = useCallback(async (values: any) => {
    const key = 'create-project';
    message.open({
      content: 'Creating project...',
      key: key,
      duration: 0,
    });

    try {
      const res = await mutateAsync({ name: values.name });

      message.success({
        content: 'Project created',
        duration: 2,
      });
    } catch (error) {
      message.error({
        content: 'Error creating project',
        duration: 2,
      });
    } finally {
      message.destroy(key);
    }
  }, []);

  return (
    <Spin spinning={isLoading}>
      <Form form={form} onFinish={onFormFinish}>
        <Form.Item name='name' label='Name'>
          <Input placeholder='Basic usage' />
        </Form.Item>

        <Button htmlType='submit' disabled={isLoading} type='primary'>
          Submit
        </Button>
      </Form>
    </Spin>
  );
}

export const Main = () => {
  return (
    <PageLayout>
      <List />
      <Create />
    </PageLayout>
  );
};

export default Main;

const List = () => {
  const { data, isLoading } = api.demoProject.getAll.useQuery();

  return (
    <Spin spinning={isLoading}>
      {data?.map((project: any) => {
        return <div key={project.id}>{project.name}</div>;
      })}
    </Spin>
  );
};
