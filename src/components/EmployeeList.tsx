import {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Table, Typography, Button} from 'antd';

import {ColumnsType} from 'antd/es/table';
import style from './style.module.scss';

import {EditEmployeeModal} from './EditEmployeeModal';
import {Employee, Organization} from '@/types';
import {useGetEmployeesByOrganizationQuery, useGetOrganizationsQuery} from '@/features';

export const EmployeeList = () => {
  const {id} = useParams<{id: string}>();

  const {
    data: employees,
    error: employeesError,
    isLoading: employeesLoading,
  } = useGetEmployeesByOrganizationQuery(id);

  const {
    data: organization,
    error: orgsError,
    isLoading: orgsLoading,
  } = useGetOrganizationsQuery();

  console.log(employees);

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  if (employeesLoading || orgsLoading) return <div>Loading...</div>;
  if (employeesError) return <div>Error loading employees.</div>;
  if (orgsError) return <div>Error loading organizations.</div>;

  const currentOrg: Organization = organization.find(org => org.id === id);

  const backToHome = () => {
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
        <Typography.Title level={2}>{currentOrg.name}</Typography.Title>
        <Button className={style.breadcrumbs} onClick={() => backToHome()}>
          Назад
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={employees}
        rowKey='id'
        pagination={{pageSize: 5}}
        bordered
      />
      <EditEmployeeModal
        organizationId={currentOrg.id}
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        employee={selectedEmployee}
      />
    </div>
  );
};
