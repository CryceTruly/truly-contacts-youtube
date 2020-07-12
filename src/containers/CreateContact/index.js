import React, { useState, useContext, useEffect } from "react";
import Header from "../../components/Header";
import CreateContact from "../../layout/Contacts/Create";
import createContact from "../../context/actions/contacts/createContact";
import clearCreateContact from "../../context/actions/contacts/clearCreateContact";
import { GlobalContext } from "../../context/Provider";
import { useHistory } from "react-router-dom";

const CreateContactContainer = () => {
  const [form, setForm] = useState({});
  const [tempFile, setTempFile] = useState(null);
  const history = useHistory();

  const {
    contactsDispatch,
    contactsState: {
      addContact: { loading, error, data },
    },
  } = useContext(GlobalContext);

  const onImageChange = (e) => {
    e.persist();
    const fileURL = e.target.files[0];
    setForm({ ...form, contactPicture: fileURL });
    if (fileURL) {
      setTempFile(URL.createObjectURL(fileURL));
    }
  };

  useEffect(() => {
    if (data) {
      history.push("/");
    }
    return () => {
      clearCreateContact()(contactsDispatch);
    };
  }, [data]);

  const formIsHalfFilled =
    Object.values(form).filter((item) => item && item !== "")?.length > 0 &&
    !data;

  console.log("addContact loading", loading);

  const onChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };

  console.log("form", form);

  const onSubmit = () => {
    createContact(form)(contactsDispatch);
  };

  const formInvalid =
    !form.firstName?.length ||
    !form.lastName?.length ||
    !form.countryCode?.length ||
    !form.phoneNumber?.length;

  return (
    <CreateContact
      onSubmit={onSubmit}
      formInvalid={formInvalid}
      onChange={onChange}
      form={form}
      formIsHalfFilled={formIsHalfFilled}
      loading={loading}
      onImageChange={onImageChange}
      tempFile={tempFile}
    />
  );
};

export default CreateContactContainer;
