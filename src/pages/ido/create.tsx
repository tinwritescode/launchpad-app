import React, { useCallback } from "react";
import { Button, Input, message, Spin } from "antd";
import PageLayout from "../../components/templates/PageLayout";
import { Form } from "antd";
import { api } from "../../utils/api";

type Props = {};

function Create({}: Props) {
  const [form] = Form.useForm();
  const {
    data: project,
    isLoading,
    mutateAsync,
  } = api.project.createOne.useMutation();

  const onFormFinish = useCallback(async () => {
    const key = "create-project";
    message.open({
      content: "Creating project...",
      key: key,
      duration: 0,
    });

    try {
      const res = await mutateAsync({ name: "test" });

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
    }
  }, []);

  return (
    <PageLayout>
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
    </PageLayout>
  );
}

export default Create;
