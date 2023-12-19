import styles from './queueSuggestion.module.css'

function queueSuggestion(){
    return(
        <div className = {styles.suggestionContainer}>
            <div className={styles.nameAndDateContainer}></div>
            <div className={styles.capacityContainer}></div>
        </div>
    )
}

export default queueSuggestion
