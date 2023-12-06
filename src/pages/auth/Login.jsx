import{Link, useNavigate} from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "../firebaseConfig";
import { useState } from 'react';

export default function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    let navigate = useNavigate();
    const handleLogin = () => {

      if(email!=='' && password!==''){
        const auth = getAuth(firebaseApp);
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            navigate("/");
            // ...
          })
          .catch((error) => {
            alert("wrong password");
          });
      }else{
        alert("incorect or missing credentials")
      } 
    }
    return(
        <div className="container border p-5 rounded">
            <h1 className="fw-bold">Login</h1>
            <label htmlFor="email">Email</label>
            <input id="email" type="email"  className="form-control" onChange={(e)=>setEmail(e.target.value)} value={email} />
            <label htmlFor="password">Password</label>
            <input id="password" type="password" className="form-control" onChange={(e)=>setPassword(e.target.value)} value={password}  />
            <button className="btn btn-success mt-3" onClick={()=>handleLogin()}>Login</button>
            <hr />
            <Link to="/register">Don't have an account? Register here.</Link>

        </div>
    )
};