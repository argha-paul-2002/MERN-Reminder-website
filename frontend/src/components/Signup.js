import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';


const Signup = () => {

    let navigate = useNavigate();


    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        cpassword:""
    })

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const {name, email, password} = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({name, email, password})
          });
          const json = await response.json()
          //   If success = true then redirect 
          if(json.success){
              //  Save the auth token and redirect
              swal({
                title: "Success!",
                text: "Account created Successfully",
                icon: "success",
                button: "Ok",
              });
              localStorage.setItem('token', json.authtoken);
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
            name: "",
            email: "",
            password: "",
            cpassword:""
        })
    }
    
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" onChange={onChange} name='name' aria-describedby="emailHelp" minLength={3} /> 
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" onChange={onChange} name='email' aria-describedby="emailHelp" /> 
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" onChange={onChange} name='password'  minLength={5} required />
            </div>
            <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="cpassword" onChange={onChange} name='cpassword' minLength={5} required />
            </div> 
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}
export default Signup
