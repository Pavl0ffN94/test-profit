import {Route, Routes} from 'react-router-dom';

import style from './App.module.scss';
import {EmployeeList, Header, OrganizationList} from './components';
import {useGetOrganizationsQuery} from './features';

function App() {
  const {data: organizationsData, error, isLoading} = useGetOrganizationsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred: {error.toString()}</div>;

  return (
    <main className={style.main}>
      <Header />
      <Routes>
        <Route
          path='/'
          element={<OrganizationList organizationsData={organizationsData} />}
        />
        <Route
          path='/organizations/:id/employees'
          element={<EmployeeList orgData={organizationsData} />}
        />
      </Routes>
    </main>
  );
}

export default App;
