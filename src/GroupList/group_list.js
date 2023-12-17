import styles from './group_list.module.css'

function GroupList(props){
    console.log(props.group_name)
    return(
        <button className = {styles.groupContainer}>
            <p>{props.name}</p>
            <div className = {styles.binImage}></div>
        </button>

    )
}

export default GroupList
