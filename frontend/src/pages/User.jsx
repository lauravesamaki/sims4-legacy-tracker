import { useSelector } from "react-redux"
import { selectUser } from "../services/userSlice"

export default function User() {
    const user = useSelector(selectUser)    
    return (
        <div>
            <h2>Welcome, {user.user}!</h2>
        </div>
    )
}