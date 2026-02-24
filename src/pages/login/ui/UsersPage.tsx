import React from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Avatar, Spin } from "antd";
import dayjs from "dayjs";
import { useUsers } from "@/entities/user/model/useUsers";
import { User } from "@/entities/user/model/types";
import { UserModal } from "@/features/user-manage/ui/UserModal";
import styled from "styled-components";

const PageWrapper = styled.div`
  padding: 60px;
`;

const LogoutButtonWrapper = styled.div`
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 10;
`;

const CreateButtonWrapper = styled.div`
  position: fixed;
  bottom: 24px;
  left: 24px;
  z-index: 10;
`;

const StyledButton = styled(Button)`
  background-color: #2f5f86;
  border: none;
  color: #fff;

  &:hover {
    background-color: #244b6a !important;
  }
`;

const UserRow = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;

  &:hover {
    background: #fafafa;
  }
`;

const UserInfo = styled.div`
  margin-left: 12px;
  display: flex;
  flex-direction: column;
`;

const UserName = styled.span`
  font-weight: 500;
`;

const UserDate = styled.span`
  color: #999;
  font-size: 13px;
`;

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
    <PageWrapper>
      <LogoutButtonWrapper>
        <StyledButton onClick={handleLogout}>
          Выход
        </StyledButton>
      </LogoutButtonWrapper>

      <CreateButtonWrapper>
        <StyledButton
          type="primary"
          onClick={() => {
            setSelectedUser(undefined);
            setIsModalOpen(true);
          }}
        >
          Создать пользователя
        </StyledButton>
      </CreateButtonWrapper>

      <Table
        dataSource={data}
        rowKey="id"
        showHeader={false}
        style={{ tableLayout: "fixed" }}
        columns={[
          {
            dataIndex: "name",
            render: (_, record: User) => (
              <UserRow
                onClick={() => {
                  setSelectedUser(record);
                  setIsModalOpen(true);
                }}
              >
                <Avatar src={record.avatar} size={48} />

                <UserInfo>
                  <UserName>{record.name}</UserName>
                  <UserDate>
                    Зарегистрирован{" "}
                    {dayjs(record.createdAt).format("DD.MM.YYYY")}
                  </UserDate>
                </UserInfo>
              </UserRow>
            ),
          },
        ]}
      />

      <UserModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
      />
    </PageWrapper>
  );
};
