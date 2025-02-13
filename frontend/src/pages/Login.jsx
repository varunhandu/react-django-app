import Form from "../components/Form"
import '../styles/pages.css'

function Login() {
    return <div className="background-image">
        <Form route='/token/create/' method='login'/>
    </div>
}

export default Login