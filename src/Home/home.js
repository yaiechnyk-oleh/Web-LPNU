import React, {useEffect, useState} from 'react';
import styles from './home.module.css';
import {Link} from "react-router-dom";
import {securedFetch} from "../Login/login";


function Home() {
    const [queues, setQueues] = useState([]);
    const [schedule, setSchedule] = useState([])

    function convertToMinutes(timeString) {
        const [hours, minutes] = timeString.split(":").map(Number);
        return hours * 60 + minutes;
    }

    useEffect(() => {
        async function fetchQueues() {
            try {
                const token = localStorage.getItem('access_token');
                const response = await securedFetch('http://localhost:5000/queues', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });

                if (!response.ok) {
                    throw new Error('Request failed: ' + response.statusText);
                }

                const data = await response.json();
                setQueues(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchQueues();
    }, []);

    const processQueueData = (queueData) => {
        const processedData = {};

        queueData.forEach(queue => {
            const startTime = new Date(queue.start_time);
            const endTime = new Date(queue.end_time);
            const day = startTime.toLocaleString('en-us', { weekday: 'short' });

            const timeSlot = `${startTime.getHours()}:${startTime.getMinutes()} - ${endTime.getHours()}:${endTime.getMinutes()}`;

            if (!processedData[timeSlot]) {
                processedData[timeSlot] = {
                    time: timeSlot,
                    subjects: { Mon: null, Tue: null, Wed: null, Thu: null, Fri: null }
                };
            }

            processedData[timeSlot].subjects[day] = {
                id: queue.id,
                name: queue.subject_name,
                teacher: queue.teacher_id,
                group: queue.group_id,
            };


        });

        const sortedData = Object.values(processedData).sort((a, b) => {
            // Splitting the time string and converting it to minutes for comparison
            const timeA = a.time.split(" - ");
            const timeB = b.time.split(" - ");
            const startTimeA = convertToMinutes(timeA[0]);
            const startTimeB = convertToMinutes(timeB[0]);

            // Comparing start times
            return startTimeA - startTimeB;
        });

        return sortedData;
    };

    useEffect(() => {
        if (queues.length) {
            const scheduleData = processQueueData(queues);
            setSchedule(scheduleData)
        }
    }, [queues]);

    // const schedule = [
    //     {
    //         time: "08:30 - 09:50",
    //         subjects: {
    //             Mon: { name: "Information Theory", teacher: "Dr. Smith", auditory: "101", capacity: "30", group: "A" },
    //             Tue: null,
    //             Wed: { name: "Information Theory", teacher: "Dr. Smith", auditory: "101", capacity: "30", group: "A" },
    //             Thu: null,
    //             Fri: { name: "Information Theory", teacher: "Dr. Smith", auditory: "101", capacity: "30", group: "A" }
    //         }
    //     },
    //     {
    //         time: "10:05 - 11:25",
    //         subjects: {
    //             Mon: null,
    //             Tue: { name: "Calculus", teacher: "Prof. Johnson", auditory: "202", capacity: "40", group: "B" },
    //             Wed: null,
    //             Thu: { name: "Calculus", teacher: "Prof. Johnson", auditory: "202", capacity: "40", group: "B" },
    //             Fri: null
    //         }
    //     },
    //     {
    //         time: "11:40 - 13:00",
    //         subjects: {
    //             Mon: null,
    //             Tue: { name: "Calculus", teacher: "Prof. Johnson", auditory: "202", capacity: "40", group: "B" },
    //             Wed: null,
    //             Thu: { name: "Calculus", teacher: "Prof. Johnson", auditory: "202", capacity: "40", group: "B" },
    //             Fri: null
    //         }
    //     },
    //     {
    //         time: "13:15 - 14:35",
    //         subjects: {
    //             Mon: null,
    //             Tue: { name: "Calculus", teacher: "Prof. Johnson", auditory: "202", capacity: "40", group: "B" },
    //             Wed: null,
    //             Thu: { name: "Calculus", teacher: "Prof. Johnson", auditory: "202", capacity: "40", group: "B" },
    //             Fri: null
    //         }
    //     },
    //     // ... more time slots
    // ];
    console.log(schedule)
    return (
        <div className={styles.scheduleContainer}>
            <div className={styles.timeColumn}>
                <div className={styles.timeHeaderCell}>Time</div>
                {schedule.map(slot => (
                    <div className={styles.timeCell} key={slot.time}>{slot.time}</div>
                ))}
            </div>

            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => (
                <div className={styles.dayColumn} key={day}>
                    <div className={styles.dayHeaderCell}>{day}</div>
                    {schedule.map(slot => (
                        <div className={styles.subjectCell} key={`${day}-${slot.time}`}>
                            {slot.subjects[day] ? (
                                <Link to ={`/queue/${slot.subjects[day].id}`} className={`${styles.queueContainer} ${styles.linkNoUnderline}`}>
                                    <div className={styles.queueHeader}>
                                        <p>{slot.subjects[day].name}</p>
                                    </div>
                                    <div className={styles.queueInfo}>
                                        <div className={styles.mainInfo}>
                                            <span>{slot.subjects[day].teacher}</span>
                                            <span className={styles.textCorrection}>{slot.subjects[day].auditory}</span>
                                        </div>
                                        <div className={styles.extraInfo}>
                                            <span>Capacity: {slot.subjects[day].capacity}</span>
                                            <span>Group: {slot.subjects[day].group}</span>
                                        </div>
                                    </div>
                                </Link>
                            ) : (
                                <div>No Class</div>
                            )}
                        </div>
                    ))}

                </div>
            ))}
        </div>
    );
}

export default Home;
