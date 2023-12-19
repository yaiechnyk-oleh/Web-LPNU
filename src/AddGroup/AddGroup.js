// add-group.js

import React, { useState } from 'react';
import styles from './AddGroup.module.css';

function AddGroup({ onGroupAdded, onClose }) {
    const [groupName, setGroupName] = useState('');

    const handleButton = () => {
        onGroupAdded(groupName);
        setGroupName(''); // Reset groupName state
        onClose(); // Close the modal
    };

    return (
        <div className="modalContainer">
            <div className={styles.queueFormContainer}>
                <h3 className={styles.queueFormLabel}>Create a group</h3>
                <form className={styles.queueForm}>
                    <div className={styles.inputHandler}>
                        <div className={styles.inputContainer}>
                            <label htmlFor="gname">Group name:</label>
                            <input
                                type="text"
                                id="gname"
                                name="gname"
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={styles.buttonGroup}>
                        <button className={`${styles.btn} ${styles.continue}`} onClick={handleButton}>
                            Continue
                        </button>
                        <button className={`${styles.btn} ${styles.cancel}`} onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddGroup;
