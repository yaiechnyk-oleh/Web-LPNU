import styles from './AddQueue.module.css'
function AddQueue () {
    return(
        <div className = {"modalContainer"}>
            <div className={styles.addQueueContainer}>
                <h1 className = {styles.addQueueTitle}>Create Queue</h1>
                <form className = {styles.addForm}>
                    <input placeholder = {"Enter name of subject:"} className = {styles.addInput}/>
                    <input placeholder = {"Enter the auditory:"} className  = {styles.addInput}/>
                    <input placeholder = {"Enter min number of students:"} className = {styles.addInput}/>
                    <input placeholder = {"Enter max number of students:"} className = {styles.addInput}/>
                    <input placeholder = {"Enter group:"} className = {styles.addInput}/>
                    <button className = {styles.addButton}>Create Queue</button>
                </form>
            </div>
        </div>
    )
}

export default AddQueue
