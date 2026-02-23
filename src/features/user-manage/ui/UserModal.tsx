import React, { useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";
import styled from "styled-components";
import { User } from "@/entities/user/model/types";
import {
  useCreateUser,
  useDeleteUser,
  useUpdateUser,
} from "../model/useUserMutations";

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 12px;
    padding: 24px 32px;
  }
`;

const StyledButton = styled(Button)`
  width: 100px;
  background-color: #2f5f86;
  border: none;
  color: #fff;

  &:hover {
    background-color: #244b6a !important;
  }
`;
const StyledInput = styled(Input)`
  height: 38px;
`;

interface Props {
  open: boolean;
  onClose: () => void;
  user?: User | undefined;
}

export const UserModal = ({ open, onClose, user }: Props) => {
  const [form] = Form.useForm();

  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();
  const deleteMutation = useDeleteUser();

  const isEdit = Boolean(user);
  const isLoading = createMutation.isLoading || updateMutation.isLoading;

  useEffect(() => {
    if (open) {
      if (user) {
        form.setFieldsValue(user);
      } else {
        form.resetFields();
      }
    }
  }, [user, open, form]);

  const handleSubmit = async () => {
    const values = await form.validateFields();

    if (isEdit) {
      updateMutation.mutate(values);
    } else {
      createMutation.mutate(values);
    }

    onClose();
  };

  const handleDelete = () => {
    if (!user) return;
    deleteMutation.mutate(String(user.id));
    onClose();
  };

  return (
    <StyledModal
      width={520}
      title={isEdit ? "Редактирование" : "Создание пользователя"}
      open={open}
      onOk={handleSubmit}
      onCancel={onClose}
      confirmLoading={isLoading}
      maskClosable={!isLoading}
      closable={!isLoading}
      footer={null}
    >
      <Form form={form} layout="vertical">
        {isEdit && (
          <Form.Item label="ID" name="id">
            <Input disabled />
          </Form.Item>
        )}

        <Form.Item
          label="Имя"
          name="name"
          rules={[{ required: true, message: "Введите имя" }]}
        >
          <StyledInput />
        </Form.Item>

        <Form.Item
          label="Ссылка на аватарку"
          name="avatar"
          rules={[
            { required: true, message: "Введите ссылку" },
            { type: "url", message: "Некорректная ссылка" },
          ]}
        >
          <StyledInput />
        </Form.Item>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 24,
          }}
        >
          {isEdit && (
            <Button onClick={handleDelete} danger>
              Удалить
            </Button>
          )}

          <div>
            <StyledButton
              type="primary"
              loading={isLoading}
              style={{ marginRight: 8 }}
              onClick={handleSubmit}
            >
              {isEdit ? "Сохранить" : "Создать"}
            </StyledButton>

            <StyledButton onClick={onClose}>Отмена</StyledButton>
          </div>
        </div>
      </Form>
    </StyledModal>
  );
};
