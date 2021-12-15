import styles from './App.module.css';
import ContactForm from '../ContactForm/ContactForm.jsx';
import ContactList from '../ContactList/ContactList.jsx';
import Filter from '../Filter/Filter.jsx';
import * as storage from '../../services/localStorage';

import { Component } from 'react';
import { nanoid } from 'nanoid';

const STORAGE_KEY = 'contacts';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = storage.get(STORAGE_KEY);
    if (savedContacts) {
      this.setState({ contacts: savedContacts });
    }
  }

  componentDidUpdate(prevState, prevProps) {
    if (prevState.contacts !== this.state.contacts) {
      storage.save(STORAGE_KEY, this.state.contacts);
    }
  }

  formSubmitHandler = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(({ contacts }) => {
      if (
        contacts.some(
          contact =>
            contact.name.toLowerCase() === newContact.name.toLowerCase(),
        )
      ) {
        return alert(`${newContact.name} is already in contacts!`);
      }

      return { contacts: [newContact, ...contacts] };
    });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
      filter: '',
    }));
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizeFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter),
    );
  };

  changeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  render() {
    const filteredContacts = this.getFilteredContacts();

    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />

        <h2 className={styles.title}>Contacts</h2>

        {this.state.contacts.length > 1 && (
          <Filter value={this.state.filter} onChange={this.changeFilter} />
        )}

        {!!filteredContacts.length && (
          <ContactList
            filteredContacts={filteredContacts}
            onDeleteContacts={this.deleteContact}
          />
        )}
      </div>
    );
  }
}

export default App;
