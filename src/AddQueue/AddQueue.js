import styles from './AddQueue.module.css'
function AddQueue () {
    return(
        <div className = {"modalContainer"}>
            <div className={styles.modalPlaceholder}>
                <div className={styles.titleContainer}>
                <h1 className = {styles.titleText}>Create Queue</h1>
                </div>
                <div className={styles.queueFormContainer}>
                    <h3 className={styles.queueFormLabel}>Create a new queue</h3>
                    <form className={styles.queueForm}>
                        <div className={styles.inputContainer}>
                            <label htmlFor="sname">Subject name:</label>
                            <input type="text" id="sname" name="sname"/>
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor="place">Place:</label>
                            <input type="text" id="place" name="place"/>
                        </div>
                        {/*<div className={`${styles.inputContainer} ${styles.fix}`}>*/}
                        {/*    <label>Every week</label>*/}
                        {/*    <label className={styles.switch}>*/}
                        {/*        <input type="checkbox"/>*/}
                        {/*            <span className={`${styles.slider} ${styles.round}`}></span>*/}
                        {/*    </label>*/}
                        {/*</div>*/}
                        <div className={`${styles.inputContainer} ${styles.test}`}>
                            <label htmlFor="time">Time:</label>
                            <select id="time">
                                <option value="" disabled selected>Select time</option>
                                <option value="8:30">8:30 - 9:50</option>
                            </select>
                            <select id="day">
                                <option value="" disabled selected>Select day</option>
                                <option value="mon">Mon</option>
                            </select>
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor="description">Description:</label>
                            <textarea id="description" placeholder=" "></textarea>
                        </div>
                        <div className={styles.buttonGroup}>
                            <button className={`${styles.btn} ${styles.continue}`}>Continue</button>
                            <button className={`${styles.btn} ${styles.cancel}`}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddQueue









