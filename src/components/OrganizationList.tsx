import {useGetOrganizationsQuery} from '@/features';
import {Organization} from '@/types';
import {Table} from 'antd';
import {ColumnsType} from 'antd/es/table';

import {useNavigate} from 'react-router-dom';

export const OrganizationList = () => {
  const {data, error, isLoading} = useGetOrganizationsQuery();
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred: {error.toString()}</div>;

  const columns: ColumnsType<Organization> = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Город',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Число сотрудников',
      dataIndex: 'employees',
      key: 'employees',
      render: employees => employees.length,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data?.organizations}
      rowKey='id'
      pagination={false}
      bordered
      onRow={record => ({
        onClick: () => {
          navigate(`/organization/${record.id}`);
        },
      })}
    />
  );
};
