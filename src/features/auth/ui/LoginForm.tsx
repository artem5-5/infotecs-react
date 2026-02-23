import React from "react";
import { Form, Input, Button, notification } from "antd";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components'
import { useLogin } from "../model/useLogin";

const StyledButton = styled(Button)`
  width: 100px;
  background-color: #2f5f86;
  border: none;

  &:hover {
    background-color: #244b6a !important;
  }
`

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
      <StyledButton
        type="primary"
        htmlType="submit"
        loading={loginMutation.isLoading}
        disabled={loginMutation.isLoading}
      >
        Login
      </StyledButton>
    </Form>
  );
};
