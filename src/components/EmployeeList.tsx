import {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Table, Typography, Button, Popconfirm, message} from 'antd';

import {ColumnsType} from 'antd/es/table';
import style from './style.module.scss';

import {EditEmployeeModal} from './EditEmployeeModal';
import {Employee, Organization, OrganizationsResponse} from '@/types';
import {useGetEmployeesByOrganizationQuery, useDeleteEmployeeMutation} from '@/features';
import {AddEmployee} from './AddEmployee';
interface EmplListProps {
  orgData: OrganizationsResponse | undefined;
}

export const EmployeeList = ({orgData}: EmplListProps) => {
  const {id} = useParams<{id: string}>();

  const {
    data: employees,
    error: employeesError,
    isLoading: employeesLoading,
  } = useGetEmployeesByOrganizationQuery(id!);

  const [deleteEmployee] = useDeleteEmployeeMutation();

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  if (employeesLoading) return <div>Loading...</div>;
  if (employeesError) return <div>Error loading employees.</div>;

  const organizations: Organization[] = Array.isArray(orgData) ? orgData : [];

  const currentOrg: Organization | undefined = organizations.find(
    (org: Organization) => org.id === id,
  );

  if (!currentOrg) {
    return <div>Organization not found</div>;
  }

  const backToHome = () => {
    navigate('/');
  };

  const handleDelete = async (employeeId: string) => {
    try {
      await deleteEmployee({orgId: currentOrg.id, employeeId}).unwrap();
      message.success('Сотрудник успешно удалён');
    } catch (error) {
      message.error('Ошибка при удалении сотрудника');
      console.error(error);
    }
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
      title: 'Действия',
      key: 'actions',
      render: employee => (
        <div className={style.btnActions}>
          <Button
            onClick={() => {
              setSelectedEmployee(employee);
              setIsModalVisible(true);
            }}>
            Изменить
          </Button>
          <Popconfirm
            title='Вы уверены, что хотите удалить этого сотрудника?'
            onConfirm={() => handleDelete(employee.id)}
            okText='Да'
            cancelText='Нет'>
            <Button danger>Удалить</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className={style.employeeWrapper}>
      <div className={style.headerEmpl}>
        <Typography.Title level={2}>{currentOrg.name}</Typography.Title>
        <div className={style.btnActionEmpl}>
          <AddEmployee orgId={currentOrg.id} />
          <Button className={style.breadcrumbs} onClick={() => backToHome()}>
            Назад
          </Button>
        </div>
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
