import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './AddStudent.module.css';

function AddStudent() {
    const [addOption, setAddOption] = useState('single');

    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        console.log(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleRadioChange = (event) => {
        setAddOption(event.target.value);
    };

    return (
        <div className={"modalContainer"}>
            <div className={styles.modalPlaceholder}>
                <div className={styles.titleContainer}>
                    <h1 className={styles.titleText}>Add Student</h1>
                </div>

                <div className={styles.queueFormContainer}>
                    <h3 className={styles.queueFormLabel}>Add a new student</h3>

                    <div>
                        <label>
                            <input
                                type="radio"
                                value="single"
                                checked={addOption === 'single'}
                                onChange={handleRadioChange}
                            />
                            Add one student
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="group"
                                checked={addOption === 'group'}
                                onChange={handleRadioChange}
                            />
                            Add all group
                        </label>
                    </div>

                    <form className={styles.queueForm}>
                        {addOption === 'single' && (
                            <>
                                <div className={styles.inputContainer}>
                                    <label htmlFor="semail">Student's email:</label>
                                    <input type="text" id="semail" name="semail"/>
                                </div>
                                <div className={styles.inputContainer}>
                                    <label htmlFor="fname">First name:</label>
                                    <input type="text" id="fname" name="fname"/>
                                </div>
                                <div className={styles.inputContainer}>
                                    <label htmlFor="lname">Last name:</label>
                                    <input type="text" id="lname" name="lname"/>
                                </div>
                            </>
                        )}

                        {addOption === 'group' && (
                            <>
                                <label style={{marginBottom: '10px'}} htmlFor="ugroup">Upload a group:</label>
                                <div {...getRootProps()} className={styles.dropZone}>
                                    <input className={styles.dropZone} id="ugroup" name="ugroup" {...getInputProps()} />
                                </div>
                            </>
                        )}

                        <div className={styles.buttonGroup}>
                            <button className={`${styles.btn} ${styles.continue}`}>Continue</button>
                            <button className={`${styles.btn} ${styles.cancel}`}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddStudent;
