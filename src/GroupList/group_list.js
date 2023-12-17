// group_list.js

import React from 'react';
import styles from './group_list.module.css';

function GroupList({ name, onClick, onDeleteGroup }) {
    return (
        <div className={styles.groupContainer} onClick={onClick}>
            <button className={styles.text}>{name}</button>
            <button className={styles.binImage} onClick={onDeleteGroup}></button>
        </div>
    );
}

export default GroupList;
