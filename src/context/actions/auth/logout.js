import { LOGOUT_USER } from "../../../constants/actionTypes";

export default (history) => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({
    type: LOGOUT_USER,
  });
  history.push("/auth/login");
};
