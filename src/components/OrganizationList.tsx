import {useGetOrganizationsQuery} from 'features/api/apiSlice';

export const OrganizationList = () => {
  const {data, error, isLoading} = useGetOrganizationsQuery();

  console.log(data);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred: {error.toString()}</div>;

  return (
    <ul>
      {data?.organizations.map(org => (
        <li key={org.id}>{org.name}</li>
      ))}
    </ul>
  );
};
