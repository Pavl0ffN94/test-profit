import {useLocation} from 'react-router-dom';

export const Header = () => {
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  return (
    <header>{isHomePage ? <h1>Список компаний</h1> : <h1>Список сотрудников</h1>}</header>
  );
};
