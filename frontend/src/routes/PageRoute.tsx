import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import { unsecuredRoutes } from "./Router";
const PageRoute = () => {
  return (
    <Routes>
      {unsecuredRoutes.map(({ path, Component }: any, index: any) => (
        <Fragment key={`${path}-${index}`}>
          <Route path={path} element={<Component />} />
        </Fragment>
      ))}
    </Routes>
  );
};

export default PageRoute;
