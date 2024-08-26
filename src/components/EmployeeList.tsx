import {useParams} from 'react-router-dom';

import {List, Typography} from 'antd';
import {useGetOrganizationsQuery} from 'features/api/apiSlice';

export const EmployeeList = () => {
  const {id} = useParams<{id: string}>();
  const {data, error, isLoading} = useGetOrganizationsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred: {error.toString()}</div>;

  const organization = data?.organizations.find(org => org.id === id);

  console.log('ORG', organization);

  if (!organization) {
    return <div>Организация не найдена.</div>;
  }

  return (
    <div>
      <h2>{organization.name}</h2>
      <List
        header={<div>Список сотрудников</div>}
        bordered
        dataSource={organization.employees}
        renderItem={emp => (
          <List.Item>
            <Typography.Text>
              {emp.name} ({emp.position})
            </Typography.Text>
          </List.Item>
        )}
      />
    </div>
  );
};
