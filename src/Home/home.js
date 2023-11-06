// import styles from './home.module.css'
//
// function Home(){
//     return(
//         <div className = {styles.homeWrapper}>
//             <div className = {styles.time}>
//                 <div className = {styles.timeTitleContainer}>
//                     <p className={styles.timeText}>Time</p>
//                 </div>
//                 <div className = {styles.daysContainer}>
//                 <p className={styles.timeText}>Mon</p>
//                 <p className={styles.timeText}>Tue</p>
//                 <p className={styles.timeText}>Wed</p>
//                 <p className={styles.timeText}>Thu</p>
//                 <p className={styles.timeText}>Fri</p>
//                 </div>
//             </div>
//             <div>
//                 <div>
//
//                 </div>
//             </div>
//         </div>
//     )
// }
//
// export default Home
import React from 'react';
import styles from './home.module.css';
import {Link} from "react-router-dom";

function Home() {
    const schedule = [
        {
            time: "08:30 - 09:50",
            subjects: {
                Mon: { name: "Information Theory", teacher: "Dr. Smith", auditory: "101", capacity: "30", group: "A" },
                Tue: null,
                Wed: { name: "Information Theory", teacher: "Dr. Smith", auditory: "101", capacity: "30", group: "A" },
                Thu: null,
                Fri: { name: "Information Theory", teacher: "Dr. Smith", auditory: "101", capacity: "30", group: "A" }
            }
        },
        {
            time: "10:30 - 12:00",
            subjects: {
                Mon: null,
                Tue: { name: "Calculus", teacher: "Prof. Johnson", auditory: "202", capacity: "40", group: "B" },
                Wed: null,
                Thu: { name: "Calculus", teacher: "Prof. Johnson", auditory: "202", capacity: "40", group: "B" },
                Fri: null
            }
        },
        // ... more time slots
    ];

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
                                <Link to = "/queue" className={`${styles.queueContainer} ${styles.linkNoUnderline}`}>
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
