import styles from './ContactList.module.css';

import PropTypes from 'prop-types';

const ContactList = ({ filteredContacts, onDeleteContacts }) => (
  <ul className={styles.list}>
    {filteredContacts.map(contact => (
      <li key={contact.id} className={styles.item}>
        <p className={styles.text}>
          {contact.name}: {contact.number}
        </p>
        <button
          className={styles.btn}
          type="button"
          onClick={() => onDeleteContacts(contact.id)}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
);

ContactList.propTypes = {
  filteredContacts: PropTypes.array,
  onDeleteContacts: PropTypes.func,
};

export default ContactList;
