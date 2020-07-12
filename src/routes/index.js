import { lazy } from "react";

import RegisterComponent from "../containers/Register";
import LoginComponent from "../containers/Login";
import ContactsComponent from "../containers/Contacts";

const CreateContactComponent = lazy(() =>
  import("../containers/CreateContact")
);

const routes = [
  {
    path: "/auth/register",
    component: RegisterComponent,
    title: "Register",
    needsAuth: false,
  },

  {
    path: "/auth/login",
    component: LoginComponent,
    title: "Login",
    needsAuth: false,
  },
  {
    path: "/contacts/create",
    component: CreateContactComponent,
    title: "Create Contact",
    needsAuth: true,
  },
  {
    path: "/",
    component: ContactsComponent,
    title: "Contacts",
    needsAuth: true,
  },
];

export default routes;
