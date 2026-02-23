import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components'
import { LoginForm } from "@/features/auth/ui/LoginForm";

const Wrapper = styled.div`
  padding-top: 80px;
  padding-left: 120px;
`

const Title = styled.h2`
  font-weight: 500;
  margin-bottom: 20px;
`

const Card = styled.div`
  width: 400px;
`

export const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/users");
    }
  }, [navigate]);

  return (
    <Wrapper>
      <Title>Авторизация</Title>
      <Card>
        <LoginForm />
      </Card>
    </Wrapper>
  );
};
