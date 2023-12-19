import styles from './user.module.css'

function User(props){
    return(
        <div className = {styles.userContainer}>
            <span>{props.position}</span>
            <p>{props.name}</p>
            <div className = {styles.swapImage}></div>
        </div>
    )
}

export default User
