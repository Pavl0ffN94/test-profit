import {useGetOrganizationsQuery} from '../features/api/apiSlice';
import {List, Typography} from 'antd';
import {Link} from 'react-router-dom';

export const OrganizationList = () => {
  const {data, error, isLoading} = useGetOrganizationsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred: {error.toString()}</div>;

  return (
    <List
      bordered
      dataSource={data?.organizations}
      renderItem={org => (
        <List.Item>
          <Link to={`/organization/${org.id}`}>
            <Typography.Text>{org.name}</Typography.Text>
          </Link>
        </List.Item>
      )}
    />
  );
};
