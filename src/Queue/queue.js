import styles from './queue.module.css'
import User from "../User/user";
import QueueSuggestion from "../QueueSuggestion/queueSuggestion";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {securedFetch} from "../Login/login";
function Queue() {
    let {queueId} = useParams();
    const [queueDetails, setQueueDetails] = useState([])

    useEffect(() => {
        async function fetchQueueDetails() {
            const response = await securedFetch(`http://localhost:5000/queues/${queueId}`, {
                headers: {},
            })

            if (response.ok) {
                const data = await response.json();
                setQueueDetails({
                    id: data.id,
                    name: data.subject_name,
                    teacher: data.teacher_id,
                    group: data.group_id,
                    start_time: data.start_time,
                    end_time: data.end_time,
                });
            } else {
                console.error("Failed to fetch queue details");
            }
        }

        fetchQueueDetails()

    }, [queueId])

    const userRole = "teacher";

    const users =
        [{id: 1, user_name: "Oleh Yaiechnyk"},
            {id: 2, user_name: "Myrosh Andriy"},
            {id: 3, user_name: "Myrosh Andriy"},
            {id: 4, user_name: "Myrosh Andriy"},
            {id: 5, user_name: "Myrosh Andriy"},
            {id: 6, user_name: "Myrosh Andriy"},
            {id: 7, user_name: "Myrosh Andriy"},
           ];

    const otherQueues = [
        {teacherName: "Aboba", date: "2023.12.12", capacity: 1000, queue_id: 1},
        {teacherName: "Aboba", date: "2023.12.12", capacity: 1000, queue_id: 2},
        {teacherName: "Aboba", date: "2023.12.12", capacity: 1000, queue_id: 3},
        {teacherName: "Aboba", date: "2023.12.12", capacity: 1000, queue_id: 4},
    ]

    return(
        <div className = {styles.queueWrapper}>
            <div className = {styles.queueInfo}>
                {userRole === "student" ? <div className = {styles.otherQueues}>
                    {otherQueues.map(queue => {
                        return <QueueSuggestion key={queue.queue_id} position={queue.teacherName.id} name={queue.date} capacity={queue.capacity}/>;
                    })}
                </div> : (
                    <div className = {styles.queueInfoSettings}>
                        <p>Settings</p>
                        <div className = {styles.infoTemplate}>Subject name: {queueDetails.name}</div>
                        <div className = {styles.infoTemplate}>Time: {queueDetails.start_time}-{queueDetails.end_time}</div>
                        <div className = {styles.infoTemplate}>Location: 125 I a.b.</div>
                        <div className = {styles.infoTemplate}>Group: {queueDetails.group}</div>
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
