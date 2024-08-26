import {Header} from 'components/Header';

import {OrganizationList} from 'components/OrganizationList';
import {Route, Routes} from 'react-router-dom';
import {EmployeeList} from 'components/EmployeeList';

function App() {
  return (
    <main>
      <Header />
      <Routes>
        <Route path='/' element={<OrganizationList />} />
        <Route path='/organization/:id' element={<EmployeeList />} />
      </Routes>
    </main>
  );
}

export default App;
