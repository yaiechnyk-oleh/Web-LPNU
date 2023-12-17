import styles from './user_extended.module.css'

function User_extended(props){
    console.log(props.user_name)
    return(
        <div className = {styles.userContainer}>
            <p className={styles.name}>{props.name}</p>
            <p className={styles.email}>{props.email}</p>
            <div className = {styles.emailImage}></div>
            <div className = {styles.registredImage}></div>
            <div className = {styles.resendImage}></div>
            <div className = {styles.binImage}></div>

        </div>
    )
}

export default User_extended
