import {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Table, Typography, Button} from 'antd';

import {ColumnsType} from 'antd/es/table';
import style from './style.module.scss';
import {useGetOrganizationsQuery} from '@/features';
import {EditEmployeeModal} from './EditModul';
import {Employee} from '@/types';

export const EmployeeList = () => {
  const {id} = useParams<{id: string}>();
  const {data, error, isLoading} = useGetOrganizationsQuery();
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred: {error.toString()}</div>;

  const organization = data?.organizations.find(org => org.id === id);

  if (!organization) {
    return <div>Организация не найдена.</div>;
  }

  const breadcrumbs = () => {
    navigate('/');
  };

  const columns: ColumnsType<Employee> = [
    {
      title: 'Имя',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Фамилия',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Должность',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: employee => (
        <Button
          onClick={() => {
            setSelectedEmployee(employee);
            setIsModalVisible(true);
          }}>
          Изменить
        </Button>
      ),
    },
  ];

  return (
    <div className={style.employeeWrapper}>
      <div className={style.headerEmpl}>
        <Typography.Title level={2}>{organization.name}</Typography.Title>
        <Button className={style.breadcrumbs} onClick={() => breadcrumbs()}>
          Назад
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={organization.employees}
        rowKey='id'
        pagination={{pageSize: 5}}
        bordered
      />
      <EditEmployeeModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        employee={selectedEmployee}
      />
    </div>
  );
};
