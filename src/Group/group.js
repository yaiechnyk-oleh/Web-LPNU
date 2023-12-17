// group.js

import React, { useState } from 'react';
import styles from './group.module.css';
import Email from '../user_extended/user_extended';
import GroupList from '../GroupList/group_list';
import AddGroup from '../AddGroup/AddGroup';
import AddStudent from '../AddStudent/AddStudent';
import { useNavigate } from 'react-router-dom';

function Group() {
    const [selectedGroup, setSelectedGroup] = useState('');
    const [groups, setGroups] = useState(['SHI 21', 'SHI 22', 'SHI 23']);
    const [users, setUsers] = useState([
        { name: 'Oleh', surname: "Yaiechnyk", email: 'Oleh.Yaiechnyk.shi.2022@lpnu.ua', group: 'SHI 23' },
        // Add other user data with group information
    ]);

    const [isAddGroupModalOpen, setIsAddGroupModalOpen] = useState(false);
    const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false); // New state for AddStudent modal
    const navigate = useNavigate("/groups");

    const handleButtonAddGroup = (newGroupName) => {
        if (!groups.includes(newGroupName)) {
            setGroups((prevGroups) => [...prevGroups, newGroupName]);
            setIsAddGroupModalOpen(false);
        } else {
            console.warn(`Group "${newGroupName}" already exists.`);
        }
    };

    const handleGroupClick = (groupName) => {
        setSelectedGroup(groupName);
    };

    const openAddGroupModal = () => {
        setIsAddGroupModalOpen(true);
    };

    const handleButtonDeleteStudent = (email) => {
        // Filter out the deleted student from the users state
        setUsers((prevUsers) => prevUsers.filter((user) => user.email !== email));
    };

    const closeAddGroupModal = () => {
        setIsAddGroupModalOpen(false);
    };

    const handleButtonAddStudent = (newUsers) => {
        setUsers((prevUsers) => {
            if (Array.isArray(newUsers)) {
                // Add multiple users
                return [...prevUsers, ...newUsers];
            } else {
                // Add a single user
                return [...prevUsers, newUsers];
            }
        });
    };

    const openAddStudentModal = () => {
        setIsAddStudentModalOpen(true);
    };

    const closeAddStudentModal = () => {
        setIsAddStudentModalOpen(false);
    };

    const handleButtonDeleteGroup = (groupName) => {
        // Filter out the deleted group from the state
        setGroups((prevGroups) => prevGroups.filter((group) => group !== groupName));

        // Optionally, you can update the users state to remove users from the deleted group
        setUsers((prevUsers) => prevUsers.filter((user) => user.group !== groupName));

        // If the deleted group was the selected group, reset the selectedGroup state
        if (selectedGroup === groupName) {
            setSelectedGroup('');
        }
    };

    return (
        <div className={styles.queueWrapper}>
            <div className={styles.groupContainer}>
                <span>My groups:</span>
                <div className={styles.groupList}>
                    {groups.map((group, index) => (
                        <GroupList
                            name={group}
                            key={index}
                            onClick={() => handleGroupClick(group)}
                            onDeleteGroup={() => handleButtonDeleteGroup(group)}
                        />
                    ))}
                    <button className={styles.addGroup} onClick={openAddGroupModal}>
                        Add Group
                    </button>
                </div>
            </div>

            <div className={styles.studentContainer}>
                <span>{selectedGroup}:</span>
                <div className={styles.studentList}>
                    {users
                        .filter((user) => user.group === selectedGroup)
                        .map((user, index) => (
                            <Email
                                name={`${user.name} ${user.surname}`}
                                email={user.email}
                                key={index}
                                onDelete={() => handleButtonDeleteStudent(user.email)}
                            />
                        ))}
                    {users.filter((user) => user.group === selectedGroup).length === 0 && (
                        <p className={styles.noStudents}>Please add students</p>
                    )}
                </div>
                <button className={styles.addStudent} onClick={openAddStudentModal}>
                    Add Student
                </button>
            </div>

            {isAddGroupModalOpen && (
                <AddGroup onGroupAdded={handleButtonAddGroup} onClose={closeAddGroupModal} />
            )}

            {isAddStudentModalOpen && (
                <AddStudent
                    onStudentAdded={handleButtonAddStudent}
                    selectedGroup={selectedGroup}
                    onClose={closeAddStudentModal}
                />
            )}
        </div>
    );
}

export default Group;
