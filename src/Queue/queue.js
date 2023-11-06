import styles from './queue.module.css'
import User from "../User/user";
import user from "../User/user";
function Queue() {

    const userRole = "teacher";

    const users =
        [{id: 1, user_name: "Oleh Yaiechnyk"},
            {id: 2, user_name: "Myrosh Andriy"},
            {id: 3, user_name: "Halych Maxym"},
            {id: 4, user_name: "Koval Denys"}]

    return(
        <div className = {styles.queueWrapper}>
            <div className = {styles.queueInfo}>
                {userRole === "student" ? <div className = {styles.otherQueues}>
                    You haven't other queues
                </div> : (
                    <div className = {styles.queueInfoSettings}>
                        <p>Settings</p>
                        <div className = {styles.infoTemplate}>Subject name: Infromation theory</div>
                        <div className = {styles.infoTemplate}>Time: 10:30-11:50</div>
                        <div className = {styles.infoTemplate}>Location: 125 I a.b.</div>
                        <div className = {styles.infoTemplate}> Group: SHI-24</div>
                    </div>
                )}
                <div className = {styles.queueDescription}>
                    <p className = {styles.queueLabel}>Description</p>
                    <div className = {styles.queueDescriptionArea}></div>
                </div>
            </div>
            <div className = {styles.queueUsersContainer}>
                <div className = {styles.queueUsers}>
                    {users.map(user => {
                        return <User key={user.id} position={user.id} name={user.user_name}/>;
                    })}
                </div>
                {userRole === "student" && <button className = {styles.joinButton}> Join the queue </button>}
            </div>
        </div>
    )
}

export default Queue
