import React, { useCallback } from "react";
import { Button, Input, message, Spin } from "antd";
import PageLayout from "../../components/templates/PageLayout";
import { Form } from "antd";
import { api } from "../../utils/api";

type Props = {};

function Create({}: Props) {
  const [form] = Form.useForm();
  const utils = api.useContext();
  // const { isLoading, mutate } = api.demoProject.createOne.useMutation({
  //   onSuccess: (data) => {
  //     console.log("onSuccess", data);
  //   },
  //   onSettled: async (data, error) => {
  //     console.log("onSettled", data, error);
  //     await utils.demoProject.invalidate();
  //   },
  // });
  // TODO: remove
  const isLoading = false;

  const onFormFinish = useCallback(async (values: any) => {
    console.table(values);

    const key = "create-project";
    message.open({
      content: "Creating project...",
      key: key,
      duration: 0,
    });

    try {
      // const res = mutate({ name: values.name });

      // TODO: Should navigate to the project page

      message.success({
        content: "Project created",
        duration: 2,
      });
    } catch (error) {
      message.error({
        // TODO: should tell why
        content: "Error creating project",
        duration: 2,
      });
    } finally {
      message.destroy(key);

      utils.invalidate();
    }
  }, []);

  return (
    <Spin spinning={isLoading}>
      <Form form={form} onFinish={onFormFinish}>
        <Form.Item name="name" label="Name">
          <Input placeholder="Basic usage" />
        </Form.Item>

        <Button htmlType="submit" disabled={isLoading} type="primary">
          Submit
        </Button>
      </Form>
    </Spin>
  );
}

export const Main = () => {
  return (
    <PageLayout>
      <Create />

      <List />
    </PageLayout>
  );
};

export default Main;

const List = () => {
  // const { data, isLoading } = api.demoProject.getAllWithPagination.useQuery({
  //   skip: 0,
  //   take: 1000,
  // });
  const isLoading = false;

  return (
    <Spin spinning={isLoading}>
      {/* {data?.map((project) => {
        return <div key={project.id}>{project.name}</div>;
      })} */}
    </Spin>
  );
};
