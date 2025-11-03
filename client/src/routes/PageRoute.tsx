import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import { securedRoutes, unsecuredRoutes } from "./Router";
import useLocalStorage from "../utils/hooks/useLocalStorage";
import { Landing } from "./LazyPath";
const PageRoute = () => {
  const { isTokenValid } = useLocalStorage();

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      {isTokenValid === false &&
        unsecuredRoutes.map(({ path, Component }: any, index: any) => (
          <Fragment key={`${path}-${index}`}>
            <Route path={path} element={<Component />} />
          </Fragment>
        ))}
      {isTokenValid === true &&
        securedRoutes.map(({ path, Component }: any, index: any) => (
          <Fragment key={`${path}-${index}`}>
            <Route path={path} element={<Component />} />
          </Fragment>
        ))}
    </Routes>
  );
};

export default PageRoute;
