// AddStudent.js
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './AddStudent.module.css';
import * as XLSX from 'xlsx';

function AddStudent({ onStudentAdded, selectedGroup, onClose }) {
    const [addOption, setAddOption] = useState('single');
    const [studentEmail, setStudentEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [uploadedData, setUploadedData] = useState(null);

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            // Assuming the structure is [name, surname, email]
            setUploadedData(jsonData.map(([name, surname, email]) => ({ name, surname, email, group: selectedGroup })));
        };

        reader.readAsArrayBuffer(file);
    }, [selectedGroup]);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleRadioChange = (event) => {
        setAddOption(event.target.value);
    };

    const handleButtonCancel = () => {
        onClose();
    };

    const handleButtonContinue = () => {
        if (addOption === 'single') {
            const newStudent = {
                name: `${firstName}`,
                surname: `${lastName}`,
                email: studentEmail,
                group: selectedGroup,
            };
            onStudentAdded([newStudent]); // Pass a single user as an array
        } else if (addOption === 'group' && uploadedData) {
            onStudentAdded(uploadedData); // Assuming uploadedData is an array
        }
        onClose();
    };

    return (
        <div className={'modalContainer'}>
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
                                    <input
                                        type="text"
                                        id="semail"
                                        name="semail"
                                        value={studentEmail}
                                        onChange={(e) => setStudentEmail(e.target.value)}
                                    />
                                </div>
                                <div className={styles.inputContainer}>
                                    <label htmlFor="fname">First name:</label>
                                    <input
                                        type="text"
                                        id="fname"
                                        name="fname"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                                <div className={styles.inputContainer}>
                                    <label htmlFor="lname">Last name:</label>
                                    <input
                                        type="text"
                                        id="lname"
                                        name="lname"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                            </>
                        )}

                        {addOption === 'group' && (
                            <>
                                <label style={{ marginBottom: '10px' }}>Upload a group:</label>
                                <div {...getRootProps()} className={styles.dropZone}>
                                    <input className={styles.dropZone} {...getInputProps()} />
                                </div>
                            </>
                        )}

                        <div className={styles.buttonGroup}>
                            <button className={`${styles.btn} ${styles.continue}`} onClick={handleButtonContinue}>
                                Continue
                            </button>
                            <button className={`${styles.btn} ${styles.cancel}`} onClick={handleButtonCancel}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddStudent;
