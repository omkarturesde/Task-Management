import { Home, Login, SignUp } from "./LazyPath";
import { path } from "./Path";

export const unsecuredRoutes = [
  {
    path: path.SIGNUP,
    Component: SignUp,
  },
  {
    path: path.LOGIN,
    Component: Login,
  },
  {
    path: path.HOME,
    Component: Home,
  },
];

export const securedRoutes = [
  {
    path: path.HOME,
    Component: Home,
  },
];
