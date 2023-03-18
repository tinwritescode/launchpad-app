import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import Link from 'next/link';
import React from 'react';
import styles from './components/Auth.module.scss';

const SignIn: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  return (
    <div className={styles.container}>
      <div className={styles.container_form}>
        <h1>LOGIN</h1>
        <Form
          name={styles.normal_login}
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Link href="forget-password" className={styles.login_form_forgot}>
              Forgot password
            </Link>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.login_form_button}
            >
              Log in
            </Button>
            Or{' '}
            <Link href="signup" className={styles.link}>
              register now!
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
