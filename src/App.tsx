import {Header, OrganizationList} from 'components';
import style from './App.module.scss';

function App() {
  return (
    <main className={style.main}>
      <Header />
      <OrganizationList />
    </main>
  );
}

export default App;
