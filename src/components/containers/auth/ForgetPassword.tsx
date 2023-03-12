import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import Link from "next/link";
import React from "react";
import styles from "./components/Auth.module.scss";

const ForgetPassword: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  return (
    <div className={styles.container}>
      <div className={styles.container_form}>
        <h1>RESET PASSWORD</h1>
        <Form
          name={styles.normal_login}
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email-address"
            rules={[
              { required: true, message: "Please input your email address!" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Enter your email address"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.login_form_button}
            >
              GET RESET LINK
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgetPassword;
