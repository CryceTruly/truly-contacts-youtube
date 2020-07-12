import {
  ADD_CONTACT_LOAD,
  ADD_CONTACT_SUCCESS,
  ADD_CONTACT_ERROR,
} from "../../../constants/actionTypes";
import axiosInstance from "../../../helpers/axiosInstance";
import { CONNECTION_ERROR } from "../../../constants/api";
import { storage } from "../../../helpers/firebase";
import { FIREBASE_IMAGE_REF } from "../../../constants/firebase";

export default ({
  firstName: first_name,
  lastName: last_name,
  phoneNumber: phone_number,
  countryCode: country_code,
  contactPicture: contact_picture,
}) => (dispatch) => {
  const saveToBackend = (url = null) => {
    axiosInstance()
      .post("/contacts/", {
        first_name,
        last_name,
        phone_number,
        country_code,
        contact_picture: url,
      })
      .then((res) => {

        dispatch({
          type: ADD_CONTACT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: ADD_CONTACT_ERROR,
          payload: err.response ? err.response.data : CONNECTION_ERROR,
        });
      });
  };

  dispatch({
    type: ADD_CONTACT_LOAD,
  });

  if (contact_picture) {
    storage
      .ref(`${FIREBASE_IMAGE_REF}/${contact_picture.name}`)
      .put(contact_picture)
      .on(
        "state_changed",
        (snapshot) => {},
        async (error) => {},
        async () => {
          const url = await storage
            .ref(FIREBASE_IMAGE_REF)
            .child(contact_picture.name)
            .getDownloadURL();
          saveToBackend(url);
        }
      );
  } else {
    saveToBackend();
  }
};
