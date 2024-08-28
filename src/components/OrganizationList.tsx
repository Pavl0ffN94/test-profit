import {useGetOrganizationsQuery} from '@/features';
import {Organization} from '@/types';
import {Table} from 'antd';
import {ColumnsType} from 'antd/es/table';

import {useNavigate} from 'react-router-dom';

import style from './style.module.scss';
import {AddOrg} from './AddOrg';

export const OrganizationList = () => {
  const {data, error, isLoading} = useGetOrganizationsQuery();
  const navigate = useNavigate();

  console.log(data);

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
    <div className={style.orgWrapper}>
      <AddOrg />
      <Table
        columns={columns}
        dataSource={data}
        rowKey='id'
        pagination={false}
        bordered
        onRow={record => ({
          onClick: () => {
            navigate(`/organizations/${record.id}/employees`);
          },
        })}
      />
    </div>
  );
};
