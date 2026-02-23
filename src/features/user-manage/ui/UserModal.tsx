import React, { useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";
import { User } from "@/entities/user/model/types";
import { useCreateUser, useDeleteUser, useUpdateUser } from "../model/useUserMutations";

interface Props {
  open: boolean;
  onClose: () => void;
  user?: User | undefined;
}

export const UserModal = ({ open, onClose, user }: Props) => {
  const [form] = Form.useForm();

  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();
  const deleteMutation = useDeleteUser()

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
    if (user?.id) {
      deleteMutation.mutate(String(user.id), {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  return (
    <Modal
      title={isEdit ? "Редактирование" : "Создание"}
      open={open}
      onOk={handleSubmit}
      onCancel={onClose}
      confirmLoading={isLoading}
      maskClosable={!isLoading}
      closable={!isLoading}
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
          <Input />
        </Form.Item>

        <Form.Item
          label="Аватар"
          name="avatar"
          rules={[
            { required: true, message: "Введите ссылку" },
            { type: "url", message: "Некорректная ссылка" },
          ]}
        >
          <Input />
        </Form.Item>
        <Button
          danger
          onClick={handleDelete}
          loading={deleteMutation.isLoading}
        >
          Удалить
        </Button>
      </Form>
    </Modal>
  );
};
