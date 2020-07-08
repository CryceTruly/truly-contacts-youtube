import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import LoginUI from "../../layout/Login";
import useForm from "./useForm";

const LoginContainer = () => {
  return <LoginUI form={useForm()} />;
};

export default LoginContainer;
