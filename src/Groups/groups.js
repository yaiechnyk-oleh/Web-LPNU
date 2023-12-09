import styles from './groups.module.css'
import GroupList from "../GroupList/group_list";

function Groups() {

    const groups =
        [{group_name: "SHI 21"},
            {group_name: "SHI 22"},
            {group_name: "SHI 23"},
            {group_name: "SHI 24"}]

    return (
        <div className={styles.queueWrapper}>
            <button className={styles.addGroup}>Add Group</button>

            <div className={styles.studentsList}>
                {groups.map((group, index) => (
                    <GroupList name={group.group_name}/>
                ))}
            </div>

        </div>
    )
}

export default Groups
