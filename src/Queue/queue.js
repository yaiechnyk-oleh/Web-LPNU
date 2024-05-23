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

                const s_dateTime = new Date(data.start_time);
                const s_hours = s_dateTime.getHours().toString().padStart(2, "0"); // Ensure two digits, padding with leading zeros if necessary
                const s_minutes = s_dateTime.getMinutes().toString().padStart(2, "0"); // Same for minutes
// Format into "hh:mm"
                const startTime = `${s_hours}:${s_minutes}`;

                const e_dateTime = new Date(data.end_time);
                const e_hours = e_dateTime.getHours().toString().padStart(2, "0"); // Ensure two digits, padding with leading zeros if necessary
                const e_minutes = e_dateTime.getMinutes().toString().padStart(2, "0"); // Same for minutes
// Format into "hh:mm"
                const endTime = `${e_hours}:${e_minutes}`;

                setQueueDetails({
                    id: data.id,
                    name: data.subject_name,
                    teacher: data.teacher_id,
                    group: data.group_id,
                    start_time: startTime,
                    end_time: endTime,
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
                        <div className = {styles.infoTemplate}>Time: {`${queueDetails.start_time} - ${queueDetails.end_time}`}</div>
                        <div className = {styles.infoTemplate}>Location: 125 I a.b.</div>
                        <div className = {styles.infoTemplate}>Group: SHI-24</div>
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
