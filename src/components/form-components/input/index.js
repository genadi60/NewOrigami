import React from 'react';
import styles from './index.module.css';

const Input = ({ type, autocomplete, id, value, error, label, onChange }) => {
    const handleChange = (e) => {
        onChange(e);
    }
    return(
        <div className={styles['form-control']}>
            <label htmlFor={id}>
                {label}:
            </label>
            <input type={type} name={autocomplete} id={id} value={value} autoComplete="on" onChange={handleChange} />
            {error ? (<div>You have an error</div>) : null}
        </div>
    );
}

export default Input;