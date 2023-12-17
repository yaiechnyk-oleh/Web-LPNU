import styles from './group.module.css'
import Email from "../user_extended/user_extended";
import GroupList from "../GroupList/group_list";

function Group() {


    const users =
            [{user_name: "Oleh Yaiechnyk", email: "Oleh.Yaiechnyk.shi.2022@lpnu.ua"},
            {user_name: "Myrosh Andriy", email: "Oleh.Yaiechnyk.shi.2022@lpnu.ua"},
            {user_name: "Halych Maxym", email: "Oleh.Yaiechnyk.shi.2022@lpnu.ua"},
            {user_name: "Koval Denys", email: "Oleh.Yaiechnyk.shi.2022@lpnu.ua"},
            {user_name: "Oleh Yaiechnyk", email: "Oleh.Yaiechnyk.shi.2022@lpnu.ua"},
            {user_name: "Myrosh Andriy", email: "Oleh.Yaiechnyk.shi.2022@lpnu.ua"},
            {user_name: "Myrosh Andriy", email: "Oleh.Yaiechnyk.shi.2022@lpnu.ua"},
            {user_name: "Halych Maxym", email: "Oleh.Yaiechnyk.shi.2022@lpnu.ua"},
            {user_name: "Koval Denys", email: "Oleh.Yaiechnyk.shi.2022@lpnu.ua"}]

    // const email =
    //     [{user_name: "Oleh Yaiechnyk"},
    //         {user_name: "Myrosh Andriy"},
    //         {user_name: "Halych Maxym"},
    //         {user_name: "Koval Denys"},
    //         {user_name: "Oleh Yaiechnyk"},
    //         {user_name: "Myrosh Andriy"},
    //         {user_name: "Myrosh Andriy"},
    //         {user_name: "Halych Maxym"},
    //         {user_name: "Koval Denys"}]


    const groups =
            [{group_name: "SHI 21"},
            {group_name: "SHI 22"},
            {group_name: "SHI 23"},            {group_name: "SHI 22"},
            {group_name: "SHI 23"},            {group_name: "SHI 22"},
            {group_name: "SHI 23"},            {group_name: "SHI 22"},
            {group_name: "SHI 23"},
            {group_name: "SHI 24"}]

    return (
        <div className={styles.queueWrapper}>

            <div className={styles.groupContainer}>
                <span>My groups:</span>
                    <div className={styles.groupList}>
                        {groups.map((group, index) => (
                            <GroupList name={group.group_name}/>
                        ))}
                        <button className={styles.addGroup}>Add Group</button>
                    </div>
            </div>

            <div className={styles.studentContainer}>
                <span>SHI - 24:</span>
                <div className={styles.studentList}>
                    {users.map((user, index) => (
                        <Email name={user.user_name} email={user.email} key={index}/>
                    ))}
                </div>
                <button className={styles.addStudent}>Add Student</button>
            </div>








            {/*<div className={styles.title}>*/}
            {/*    <div className={styles.groupContainer}>*/}
            {/*        <button>My groups:</button>*/}
            {/*            <div>*/}
            {/*                {groups.map((group, index) => (*/}
            {/*                    <GroupList name={group.group_name}/>*/}
            {/*                ))}*/}
            {/*                <button className={styles.groupList}>Add Group</button>*/}
            {/*            </div>*/}
            {/*    </div>*/}
            {/*    <span className={styles.groupName}>GROUP NAME</span>*/}
            {/*</div>*/}

            {/*<div className={styles.studentsList}>*/}
            {/*    <ul className={styles.groupUsers}>*/}
            {/*        {users.map((user, index) => (*/}
            {/*            <User name={user.user_name}/>*/}
            {/*        ))}*/}
            {/*    </ul>*/}
            {/*</div>*/}

        </div>
    )
}

export default Group
