import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';


const Register = () => {
    const history = useHistory()
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [contactNo, setContactNo] = useState("")
    const [email, setEmail] = useState("")
    const [url, setUrl] = useState(undefined)

    useEffect(() => {
        if(url) {
            uploadFields()
        }
    },[url])



    const uploadFields = () => {
        if(!name||!email || !password || !contactNo){
            M.toast({html: "Please Fill all details", classes:"#f44336 red"})
            return
        }
        if(!/^[a-zA-Z ]{3,30}$/.test(name)){
            M.toast({html: "Invalid name", classes:"#f44336 red"})
            return
        }
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "Invalid email", classes:"#f44336 red"})
            return
        }
        if(!/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/.test(password)){
            M.toast({html: "Invalid password", classes:"#f44336 red"})
            return
        }

        const token = localStorage.jwt
        console.log("token",token)
        fetch("/api/users/createuser", {
            method:"post",
            headers: {
                "Content-Type": "application/json",
                "Authorization":`jwt ${token}`
            },
            body:JSON.stringify({
                name,
                password,
                email,
                contactNo
            })
            }).then(res =>res.json())
            .then(data => {
               if(data.error) {
                    M.toast({html: data.error, classes:"#f44336 red"})
               }
               else {
                   M.toast({html:data.message,classes:"#43a047 green darken-1"})
                   history.push('/')
               }
            }).catch(err => {
                console.log(err)
            })
    }
    
    const PostData = () => {
            uploadFields()
    }
   
        return (
            <>
            <div className="landing-page">
                <div className="cont s-signup">
                    <div className="sub-cont">
                        <div className="form sign-up">
                                <h2>Register</h2>
            <label>
                <span>Name</span>
                <input type="text"placeholder='Enter name (min contain 3 characters)' value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
                <span>Email</span>
                <input type="email" placeholder='Enter a valid email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </label>
            <label>
                <span>Password</span>
                <input type="password" placeholder='Password'value={password}
                     onChange={(e) => setPassword(e.target.value)} />
            </label>
            <label>
                <span>Phone Number</span>
                <input type="int" placeholder='Ponfirm password'
                     value={contactNo}
                    onChange={(e) => setContactNo(e.target.value)}/>
            </label>
            <button type="button" className="submit" onClick={() =>PostData()}>Sign Up Now</button>
            <Link className="link-login" to="/login">Already have an account , Sign In !</Link>
        </div>
    </div>
</div>
        </div>
        </>
        )
    }
    


export default Register;