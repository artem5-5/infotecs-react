import React from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Avatar, Spin } from "antd";
import dayjs from "dayjs";
import { useUsers } from "@/entities/user/model/useUsers";
import { User } from "@/entities/user/model/types";
import { UserModal } from "@/features/user-manage/ui/UserModal";

export const UsersPage = () => {
  const { data, isLoading } = useUsers();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<User | undefined>();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (isLoading) return <Spin />;

  return (
    <div style={{ padding: 40 }}>
      <div style={{ marginBottom: 20 }}>
        <Button danger onClick={handleLogout}>
          Выход
        </Button>

        <Button
          type="primary"
          onClick={() => {
            setSelectedUser(undefined);
            setIsModalOpen(true);
          }}
        >
          Создать пользователя
        </Button>
      </div>

      <Table
        dataSource={data}
        rowKey="id"
        columns={[
          {
            title: "Аватар",
            dataIndex: "avatar",
            render: (avatar: string) => (
              <a
                onClick={() => {
                  setSelectedUser(data?.find((u) => u.avatar === avatar));
                  setIsModalOpen(true);
                }}
              >
                <Avatar src={avatar} />
              </a>
            ),
          },
          {
            title: "Имя",
            dataIndex: "name",
            render: (_, record) => (
              <a
                onClick={() => {
                  setSelectedUser(record);
                  setIsModalOpen(true);
                }}
              >
                {record.name}
              </a>
            ),
          },
          {
            title: "Зарегистрирован",
            dataIndex: "createdAt",
            render: (date: string) => dayjs(date).format("DD.MM.YYYY"),
          },
        ]}
      />
      <UserModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
      />
    </div>
  );
};
