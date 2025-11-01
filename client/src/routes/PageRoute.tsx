import { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import { unsecuredRoutes } from './Router';
import useLocalStorage from '../utils/hooks/useLocalStorage';
import Login from '../pages/Login';
import PageNotFound from '../pages/pageNotFound/Index';
const PageRoute = () => {
  const { isTokenValid } = useLocalStorage();

  return (
    <Routes>
      <Route path='/' element={<Login />} />
      {isTokenValid === false &&
        unsecuredRoutes.map(({ path, Component }: any, index: any) => (
          <Fragment key={`${path}-${index}`}>
            <Route path={path} element={<Component />} />
          </Fragment>
        ))}
      <Route path='/*' element={<PageNotFound />} />
    </Routes>
  );
};

export default PageRoute;
