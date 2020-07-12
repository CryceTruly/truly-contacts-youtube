import {
  CONTACTS_LOADING,
  CONTACTS_LOAD_SUCCESS,
  CONTACTS_LOAD_ERROR,
  LOGOUT_USER,
  ADD_CONTACT_LOAD,
  ADD_CONTACT_SUCCESS,
  ADD_CONTACT_ERROR,
  CLEAR_ADD_CONTACT,
  SEARCH_CONTACTS,
  DELETE_CONTACT_SUCCESS,
  DELETE_CONTACT_LOADING,
  ADD_REMOVE_STAR_SUCCESS,
} from "../../constants/actionTypes";
import contactsInitialState from "../intialstates/contactsInitialState";

const contacts = (state, { payload, type }) => {
  switch (type) {
    case CONTACTS_LOADING: {
      return {
        ...state,
        contacts: {
          ...state.contacts,
          loading: true,
        },
      };
    }

    case CONTACTS_LOAD_SUCCESS: {
      return {
        ...state,
        contacts: {
          ...state.contacts,
          loading: false,
          data: payload,
        },
      };
    }
    case CONTACTS_LOAD_ERROR: {
      return {
        ...state,
        contacts: {
          ...state.contacts,
          loading: false,
          error: payload,
        },
      };
    }

    case CLEAR_ADD_CONTACT: {
      return {
        ...state,
        addContact: {
          ...state.addContact,
          error: null,
          loading: false,
          data: null,
        },
      };
    }

    case LOGOUT_USER: {
      return {
        ...state,
        contactsInitialState,
      };
    }

    case ADD_CONTACT_LOAD: {
      return {
        ...state,
        addContact: {
          ...state.addContact,
          error: null,
          loading: true,
        },
      };
    }

    case ADD_CONTACT_ERROR: {
      return {
        ...state,
        addContact: {
          ...state.addContact,
          loading: false,
        },
      };
    }

    case ADD_CONTACT_SUCCESS: {
      return {
        ...state,
        addContact: {
          ...state.addContact,
          loading: false,
          data: payload,
        },

        contacts: {
          ...state.contacts,
          loading: false,
          data: [payload, ...state.contacts.data],
        },
      };
    }

    case DELETE_CONTACT_LOADING: {
      return {
        ...state,
        contacts: {
          ...state.contacts,
          loading: false,
          data: state.contacts.data.map((item) => {
            if (item.id === payload) {
              return { ...item, deleting: true };
            }
            return item;
          }),
        },
      };
    }

    case ADD_REMOVE_STAR_SUCCESS: {
      return {
        ...state,
        contacts: {
          ...state.contacts,
          data: state.contacts.data.map((item) => {
            if (item.id === payload.id) {
              return payload;
            }
            return item;
          }),
        },
      };
    }

    case DELETE_CONTACT_SUCCESS: {
      return {
        ...state,
        contacts: {
          ...state.contacts,
          loading: false,
          data: state.contacts.data.filter((item) => item.id !== payload),
        },
      };
    }

    case SEARCH_CONTACTS: {
      const searchValue = payload?.toLowerCase();
      return {
        ...state,
        contacts: {
          ...state.contacts,
          loading: false,
          isSearchActive: !!payload.length > 0 || false,
          foundContacts: state.contacts.data.filter((item) => {
            try {
              return (
                item.first_name.toLowerCase().search(searchValue) !== -1 ||
                item.last_name.toLowerCase().search(searchValue) !== -1 ||
                item.phone_number.toLowerCase().search(searchValue) !== -1
              );
            } catch (error) {
              return [];
            }
          }),
        },
      };
    }
    default:
      return state;
  }
};

export default contacts;
