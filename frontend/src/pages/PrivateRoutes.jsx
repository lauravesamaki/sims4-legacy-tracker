import { Navigate, Outlet } from 'react-router-dom'
import { useEffect, useState } from "react"

export default function PrivateRoutes() {
    const [loading, setLoading] = useState(true)
    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        async function checkAuth() {
            try {
                const response = await fetch("/auth-check", {
                    method: "GET",
                    credentials: "include"
                })

                if (response.ok) {
                    setIsAuth(true)
                } else {
                    setIsAuth(false)
                }
            } catch {
                setIsAuth(false)
            } finally {
                setLoading(false)
            }
        }

        checkAuth()
    }, [])

    if (loading) return <div>Loading...</div>
    return (
        isAuth ? <Outlet /> : <Navigate to='/login' />
    )
}