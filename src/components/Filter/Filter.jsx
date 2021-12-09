import styles from './Filter.module.css';

import PropTypes from 'prop-types';

const Filter = ({ value, onChange }) => (
  <label className={styles.label}>
    Find contacts by name
    <input
      className={styles.input}
      type="text"
      value={value}
      onChange={onChange}
    ></input>
  </label>
);

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Filter;
