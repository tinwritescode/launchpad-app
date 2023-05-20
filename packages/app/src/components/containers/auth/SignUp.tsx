//import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
//import { Button, Form, Input } from 'antd';
import Link from "next/link";
import React from "react";
import styles from "./components/Auth.module.scss";

const SignUp: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  return (
    <div className={styles.container}>
      <div className={styles.container_form}>
        <h1>REGISTER</h1>
        {/* <Form
          name={styles.normal_login}
          className='login-form'
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name='fullname'
            rules={[{ required: true, message: 'Please input your Fullname!' }]}
          >
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='Full name'
            />
          </Form.Item>
          <Form.Item
            name='emailaddress'
            rules={[
              { required: true, message: 'Please input your Email address!' },
            ]}
          >
            <Input
              prefix={<MailOutlined className='site-form-item-icon' />}
              placeholder='Email address'
            />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Password'
            />
          </Form.Item>

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className={styles.login_form_button}
            >
              Register
            </Button>
            Or{' '}
            <Link href='signin' className={styles.link}>
              login now!
            </Link>
          </Form.Item>
        </Form> */}
      </div>
    </div>
  );
};

export default SignUp;
