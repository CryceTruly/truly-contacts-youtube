import { SEARCH_CONTACTS } from "../../../constants/actionTypes";

export default (searchText) => (dispatch) => {
  dispatch({
    type: SEARCH_CONTACTS,
    payload: searchText,
  });
};
