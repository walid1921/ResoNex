import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import styled, { css } from 'styled-components';
import { useStateContext } from '../contexts/ContextProvider';

const DIV = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 4rem 1fr;
  height: 89vh;
  background-color: #10121ba1;
  border-radius: 14px;
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  transition: all 0.5s ease;

  ${props =>
    props.activeMenu &&
    css`
  grid-template-columns: 18rem 1fr;
  transition: all 0.1s ease;
    `}
`;

const AppLayout = () => {
  const { activeMenu } = useStateContext();


  return (
    <DIV activeMenu={activeMenu}  >
      <Sidebar />
      <Header />
      <main className='p-6'>
        <Outlet />
      </main>
    </DIV>
  );
};

export default AppLayout;
