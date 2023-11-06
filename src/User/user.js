import styles from './user.module.css'

function User(props){
    console.log(props.user_name)
    return(
        <div className = {styles.userContainer}>
            <span>{props.position}</span>
            <p>{props.name}</p>
            <div className = {styles.swapImage}></div>
        </div>
    )
}

export default User
