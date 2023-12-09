import styles from './group.module.css'
import User from "../User/user";
import user from "../User/user";
import {useState} from "react";
import GroupList from "../GroupList/group_list";

function Group() {

    const [isListVisible, setListVisible] = useState(false);

    const handleClick = () => {
        setListVisible(!isListVisible);
    };


    const users =
            [{user_name: "Oleh Yaiechnyk"},
            {user_name: "Myrosh Andriy"},
            {user_name: "Halych Maxym"},
            {user_name: "Koval Denys"},
            {user_name: "Oleh Yaiechnyk"},
            {user_name: "Myrosh Andriy"},
            {user_name: "Halych Maxym"},
            {user_name: "Koval Denys"},
            {user_name: "Oleh Yaiechnyk"},
            {user_name: "Myrosh Andriy"},
            {user_name: "Halych Maxym"},
            {user_name: "Myrosh Andriy"},
            {user_name: "Halych Maxym"},
            {user_name: "Koval Denys"},
            {user_name: "Oleh Yaiechnyk"},
            {user_name: "Myrosh Andriy"},
            {user_name: "Halych Maxym"},
            {user_name: "Koval Denys"}]


    const groups =
            [{group_name: "SHI 21"},
            {group_name: "SHI 22"},
            {group_name: "SHI 23"},
            {group_name: "SHI 24"}]

    return (
        <div className={styles.queueWrapper}>

            <div className={styles.title}>

                <div className={styles.groupContainer}>
                    <button onClick={handleClick}>My groups:</button>
                    {isListVisible && (
                        <div>
                            {groups.map((group, index) => (
                                <GroupList name={group.group_name}/>
                            ))}
                            <button className={styles.groupList}>Add Group</button>

                        </div>
                    )}
                </div>
                <span className={styles.groupName}>GROUP NAME</span>
            </div>

            <div className={styles.studentsList}>
                <ul className={styles.groupUsers}>
                    {users.map((user, index) => (
                        <User name={user.user_name}/>
                    ))}
                </ul>
            </div>

        </div>
    )
}

export default Group
