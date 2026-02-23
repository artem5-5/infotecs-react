import React from 'react'
import { Table, Button, Avatar, Spin } from 'antd'
import { useUsers } from '@/entities/user/model/useUsers'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'

export const UsersPage = () => {
  const { data, isLoading } = useUsers()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  if (isLoading) return <Spin />

  return (
    <div style={{ padding: 40 }}>
      <div style={{ marginBottom: 20 }}>
        <Button danger onClick={handleLogout}>
          Выход
        </Button>

        <Button
          type="primary"
          style={{ marginLeft: 10 }}
        >
          Создать пользователя
        </Button>
      </div>

      <Table
        dataSource={data}
        rowKey="id"
        columns={[
          {
            title: 'Аватар',
            dataIndex: 'avatar',
            render: (avatar: string) => <Avatar src={avatar} />,
          },
          {
            title: 'Имя',
            dataIndex: 'name',
          },
          {
            title: 'Зарегистрирован',
            dataIndex: 'createdAt',
            render: (date: string) =>
              dayjs(date).format('DD.MM.YYYY'),
          },
        ]}
      />
    </div>
  )
}