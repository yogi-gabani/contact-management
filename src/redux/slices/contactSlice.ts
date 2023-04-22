import { createSlice, createSelector, PayloadAction, current} from '@reduxjs/toolkit';

export type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  isActive: string;
}

const initialState:Contact[]  = [];

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact (state, action: PayloadAction<Contact>) {
      state.push(action.payload);
    },
    editContact (state, action: PayloadAction<Contact>) {
      const contacts = current(state);
      const updatedContacts = contacts.map(contact => {
        if (contact.id === action.payload.id) {
          return action.payload;
        }
        return contact;
      });

      console.log(updatedContacts);
      return updatedContacts;
    },
    deleteContact(state, action: PayloadAction<string>) {
      const contacts = current(state);
      const data = contacts.filter(contact => contact.id !== action.payload);

      return data;
    }
  }
});

export const { addContact, editContact, deleteContact } = contactSlice.actions;

const contact = (state: { contacts: Contact[]}) => state;

export const contacts = createSelector([contact], state => state.contacts);

export default contactSlice.reducer;