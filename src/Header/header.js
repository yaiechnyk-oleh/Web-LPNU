import styles from './header.module.css'
import {useNavigate} from "react-router-dom";

// export async function login(email, password) {
//     try {
//         const response = await fetch('http://127.0.0.1:5000/auth/login', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({email: email, password: password}),
//         })
//
//         if (!response.ok) {
//             throw new Error('Request failed: ' + response.statusText);
//         }
//
//         return true;
//     } catch (error) {
//         console.error(error)
//         return false;
//     }
// }

function Header({isLoggedIn}){
    const navigate = useNavigate();
    function logOut(){
        localStorage.clear();
        userName = ""
        navigate('/login')
    }
    let userName = "Prof. Jones"
    let userRole = "admin"
    return(
        <div className = {styles.header}>
            <h3 className = {styles.title}>Quenic</h3>
            { isLoggedIn && <div className = {styles.headerOptions}>
                <div onClick={logOut} className  = {styles.headerUser}>{userName}</div>
                { userRole === "teacher" && <button className = {styles.addQueueButton}>Add Queue</button> }
            </div>}
        </div>
    )
}

export default Header
