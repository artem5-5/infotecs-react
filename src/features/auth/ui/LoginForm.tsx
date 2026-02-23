import React from "react";
import { Form, Input, Button, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../model/useLogin";

export const LoginForm = () => {
  const loginMutation = useLogin();
  const navigate = useNavigate();

  const onFinish = (values: { username: string; password: string }) => {
    loginMutation.mutate(values, {
      onSuccess: (token) => {
        localStorage.setItem("token", token);
        navigate("/users");
      },
      onError: (error: any) => {
        notification.error({
          message: error.message,
        });
      },
    });
  };

  return (
    <Form name="login" onFinish={onFinish} layout="vertical">
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        loading={loginMutation.isLoading}
        disabled={loginMutation.isLoading}
      >
        Login
      </Button>
    </Form>
  );
};
