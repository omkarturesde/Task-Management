import { Routes, Route } from 'react-router-dom';
import { securedRoutes, unsecuredRoutes } from './Router';
import useLocalStorage from '../utils/hooks/useLocalStorage';
import { Landing } from './LazyPath';
import Layout from '../layout/Layout';

const PageRoute = () => {
  const { isTokenValid } = useLocalStorage();

  return (
    <Routes>
      <Route path='/' element={<Landing />} />

      {isTokenValid === false &&
        unsecuredRoutes.map(({ path, Component }, index) => (
          <Route key={index} path={path} element={<Component />} />
        ))}
      <Route element={<Layout />}>
        {isTokenValid === true &&
          securedRoutes.map(({ path, Component }, index) => (
            <Route key={index} path={path} element={<Component />} />
          ))}
      </Route>
    </Routes>
  );
};

export default PageRoute;
