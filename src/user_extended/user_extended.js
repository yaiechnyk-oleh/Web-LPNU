// user_extended.js

import React from 'react';
import styles from './user_extended.module.css';

function User_extended({ name, email, onDelete }) {
    const handleDeleteClick = () => {
        // Call the onDelete callback when the delete button is clicked
        onDelete();
    };

    return (
        <div className={styles.userContainer}>
            <p className={styles.name}>{name}</p>
            <p className={styles.email}>{email}</p>
            <div className={styles.emailImage}></div>
            <div className={styles.registredImage}></div>
            <div className={styles.resendImage}></div>
            <button className={styles.binImage} onClick={handleDeleteClick}></button>
        </div>
    );
}

export default User_extended;
