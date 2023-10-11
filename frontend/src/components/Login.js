import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const Login = () => {

    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({email: credentials.email, password: credentials.password})
          });
          const json = await response.json()
          //   If success = true then redirect 
          if(json.success){
              //  Save the auth token and redirect
              localStorage.setItem('token', json.authtoken);
              swal({
                title: "Success!",
                text: "Welcome to iNotebook",
                icon: "success",
                button: "Ok",
              });
              navigate("/"); 
            }
            else{
                // Else Show Alert
                swal({
                    title: "Error!",
                    text: "Invalid Credentials!",
                    icon: "error",
                    button: "Ok",
                  });
            }
            
            
            //   Clear all form fields
            
          console.log(json)
          setCredentials({
            email: "",
            password: ""
        })
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <div>
      <form  onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" value={credentials.email}onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" value={credentials.password} onChange={onChange}id="password" name='password' />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default Login
