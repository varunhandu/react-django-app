import { useState } from "react";
import api from "../api";
import "../styles/Form.css"
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

function Form({route, method}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const name = method === 'login' ? 'Login' : 'Register'

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        try {
            const res = await api.post(route, { username, password })
            if (method == 'login') {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                console.log('access : ' + res.data.access)
                console.log('refresh : ' + res.data.refresh)
                navigate('/')
                console.log('access : ' + ACCESS_TOKEN)
                console.log('refresh : ' + REFRESH_TOKEN)
            } else {
                navigate('/login')
            }
        } catch (error) {
            alert('caught an error : '+error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1>
            <input
                className = 'form-input'
                type = 'text'
                value = {username}
                onChange = {(e) => setUsername(e.target.value)}
                placeholder = 'Username'
            />
            <input
                className = 'form-input'
                type = 'password'
                value = {password}
                onChange = {(e) => setPassword(e.target.value)}
                placeholder = 'Password'
            />
            <button className='form-button' type='submit'>
                {name}
            </button>
        </form>
    )
}

export default Form