import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/Provider";
import getContacts from "../../context/actions/contacts/getContacts";
import { useHistory } from "react-router-dom";
import ContactsListUI from "../../layout/Contacts/List";
import deleteContact from "../../context/actions/contacts/deleteContact";
import startUnstar from "../../context/actions/contacts/startUnstar";

const ContactsContainer = () => {
  const { contactsDispatch, contactsState } = useContext(GlobalContext);

  const history = useHistory();

  const {
    contacts: { data },
  } = contactsState;

  const handleDeleteContact = (id) => {
    deleteContact(id)(contactsDispatch);
  };

  const handleStarUnstarContact = (id, is_favorite) => {
    startUnstar(id, !is_favorite)(contactsDispatch);
  };
  useEffect(() => {
    if (data.length === 0) {
      getContacts(history)(contactsDispatch);
    }
  }, []);

  return (
    <ContactsListUI
      state={contactsState}
      deleteContact={handleDeleteContact}
      starUnstarContact={handleStarUnstarContact}
    />
  );
};

export default ContactsContainer;
