import styles from './AddGroup.module.css'
import {useCallback} from "react";
import { useDropzone } from 'react-dropzone';

function AddGroup (){

    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        console.log(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps  } = useDropzone({ onDrop });

    return(
        <div className = {"modalContainer"}>
            {/*<div className={styles.modalPlaceholder}>*/}
            {/*    <div className={styles.titleContainer}>*/}
            {/*        <h1 className = {styles.titleText}>Create Group</h1>*/}
            {/*    </div>*/}
                <div className={styles.queueFormContainer}>
                    <h3 className={styles.queueFormLabel}>Create a group</h3>
                    <form className={styles.queueForm}>
                       <div className = {styles.inputHandler}>
                        <div className={styles.inputContainer}>
                            <label htmlFor="gname">Group name:</label>
                            <input type="text" id="gname" name="gname"/>
                        </div>
                       </div>
                        {/*<label style={{marginBottom: '10px'}} htmlFor="ugroup">Upload a group:</label>*/}
                        {/*<div {...getRootProps()} className = {styles.dropZone}>*/}
                        {/*    <input  id="ugroup" name="ugroup" {...getInputProps()} />*/}
                        {/*</div>*/}
                        <div className={styles.buttonGroup}>
                            <button className={`${styles.btn} ${styles.continue}`}>Continue</button>
                            <button className={`${styles.btn} ${styles.cancel}`}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        // </div>
    )
}

export default AddGroup
