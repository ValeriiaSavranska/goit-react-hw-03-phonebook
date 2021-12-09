import styles from './App.module.css';
import ContactForm from '../ContactForm/ContactForm.jsx';
import ContactList from '../ContactList/ContactList.jsx';
import Filter from '../Filter/Filter.jsx';

import { Component } from 'react';
import { nanoid } from 'nanoid';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

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

        <Filter value={this.state.filter} onChange={this.changeFilter} />

        <ContactList
          filteredContacts={filteredContacts}
          onDeleteContacts={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
