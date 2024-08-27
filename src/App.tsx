import {Route, Routes} from 'react-router-dom';

import style from './App.module.scss';
import {EmployeeList, Header, OrganizationList} from './components';

function App() {
  return (
    <main className={style.main}>
      <Header />
      <Routes>
        <Route path='/' element={<OrganizationList />} />
        <Route path='/organization/:id' element={<EmployeeList />} />
      </Routes>
    </main>
  );
}

export default App;
