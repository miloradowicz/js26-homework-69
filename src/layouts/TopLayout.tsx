import { Outlet } from 'react-router-dom';

import Header from '@components/Header/Header';

const TopLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default TopLayout;
