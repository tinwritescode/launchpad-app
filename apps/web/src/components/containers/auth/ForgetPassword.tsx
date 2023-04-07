//import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LockOutlined, PersonOutline } from "@mui/icons-material";
//import PersonOutline from '@mui/icons-material/PersonOutline';
//import { Button, Checkbox, Form, Input } from 'antd';
import { Button, Checkbox, Input } from "@mui/material";
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
        <form
          name={styles.normal_login}
          className="login-form"
          //initialValues={{ remember: true }}
          onSubmit={onFinish}
        >
          {/* <Form.Item
            name='email-address'
            rules={[
              { required: true, message: 'Please input your email address!' },
            ]}
          > */}
          <Input
            //prefix={<PersonOutline className='site-form-item-icon' />}
            placeholder="Enter your email address"
          />
          {/* </Form.Item> */}
          {/* <Form.Item> */}
          <Button
            color="primary"
            type="submit"
            className={styles.login_form_button}
          >
            GET RESET LINK
          </Button>
          {/* </Form.Item> */}
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
