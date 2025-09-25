import { logoutUser } from "./userSlice"

async function refreshtoken(dispatch, navigate) {
    const url = 'http://127.0.0.1:5000/refresh'
    const options = {
        credentials: 'include'
    }
    const res = await fetch(url, options)

    if (res.ok) {
        const data = await res.json()
        const csrf = data.csrf
        sessionStorage.setItem('csrf', csrf)
        return true
    } else {
        sessionStorage.clear()
        dispatch(logoutUser())
        navigate('/')
        return false
    }
}

async function fetchWithRefresh(req,dispatch,navigate) {
    let res = await req()

    if (res?.error && res.error.status === 302) {
        const ok = await refreshtoken(dispatch,navigate)

        if (!ok) return res

        res = await req()
    }

    return res
}

export {
    refreshtoken,
    fetchWithRefresh
}