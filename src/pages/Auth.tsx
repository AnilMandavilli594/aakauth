import React, { useEffect, useState } from 'react'
import '../styles/Auth.css'
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser } from '../redux/authSlice.ts';
import { UserState,UserDispatch } from '../store.ts';
import NavBar from "../components/NavBar.tsx";
import { useNavigate } from 'react-router-dom';

interface FieldErrors {
    fname: string;
    lname: string;
    uname: string;
    email: string;
    password: string;
    userType: string;
  }
  
function Auth() {
    const [fname,setFname] = useState("")
    const [lname,setLname] = useState("")
    const [uname,setUname] = useState("")
    const [password,setPassword]=useState("")
    const [email,setEmail] = useState("")
    const [userType, setUserType] = useState<string>("");
    const [passwordError, setPasswordError] = useState("");
    const [generalError, setGeneralError] = useState({
        fname: "",
        lname: "",
        uname: "",
        email: "",
        password: "",
        userType: ""
      });
    const navigate = useNavigate(); 

    const dispatch:UserDispatch = useDispatch();
    const userSuccessDetails = useSelector((state: UserState)=>state.user);
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };
      

    const validatePassword = (password) => {
        const minLength = 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
        
        if (password.length < minLength) {
          return `Password must be at least ${minLength} characters long.`;
        }
        if (!hasUppercase) {
          return "Password must contain at least one uppercase letter.";
        }
        if (!hasLowercase) {
          return "Password must contain at least one lowercase letter.";
        }
        if (!hasNumber) {
          return "Password must contain at least one number.";
        }
        if (!hasSpecialChar) {
          return "Password must contain at least one special character.";
        }
        
        return ""; // No error
      };
    const validateFields = () => {
        const errors: FieldErrors = {
            fname: "",
            lname: "",
            uname: "",
            email: "",
            password: "",
            userType: ""
        };
        errors.fname = fname ? "" : "First name is required.";
        errors.lname = lname ? "" : "Last name is required.";
        errors.uname = uname ? "" : "User name is required.";
        errors.email = email ? "" : "Email is required.";
        errors.password = password ? "" : "Password is required.";
        errors.userType = userType ? "" : "User type is required.";
        if (!email || !validateEmail(email)) {
            errors.email = "Please enter a valid email address.";
          }

        setGeneralError(errors);
      
        return Object.values(errors).some(error => error !== "");
      };
      
      const hasErrors = () => {
        return Object.values(generalError).some(error => error !== "");
      };
      
      const handleSignUp = () => {
        
        const passwordValidationError = validatePassword(password);
        if (passwordValidationError) {
          setGeneralError(prevErrors => ({ ...prevErrors, password: passwordValidationError }));
          return;
        }

        if (validateFields()) {

          return;
        }
        console.log("hii");

        console.log("success");
        
        navigate("/success")
      
        let credentials = {
          first_name: fname, last_name: lname, password, username: uname, email, user_type: userType
        };
        dispatch(signUpUser(credentials));
      };
      


    useEffect(()=>{
        console.log("after dispatch",JSON.stringify(userSuccessDetails));
    },[userSuccessDetails])

    return (
        <div>
            <NavBar />
            <div className='container'>
                <div className='header'>
                    <div className="text">
                        Sign Up
                    </div>
                    <div className='underline'></div>
                </div>
                <div className="inputs">
                    <div className="input">
                        <label htmlFor="fname">First Name</label>
                        <input id="fname" type="text" placeholder='First Name' value={fname} onChange={(e) => setFname(e.target.value)} />
                        {generalError.fname && <p className="error">{generalError.fname}</p>}
                    </div>
                    <div className="input">
                        <label htmlFor="lname">Last Name</label>
                        <input id="lname" type="text" placeholder='Last Name' value={lname} onChange={(e) => setLname(e.target.value)} />
                        {generalError.lname && <p className="error">{generalError.lname}</p>}
                    </div>
                    <div className="input">
                        <label htmlFor="uname">User Name</label>
                        <input id="uname" type="text" placeholder='User Name' value={uname} onChange={(e) => setUname(e.target.value)} />
                        {generalError.uname && <p className="error">{generalError.uname}</p>}
                    </div>
                    <div className="input">
                        <label htmlFor="email">Email Id</label>
                        <input id="email" type="email" placeholder='Email Id' value={email} onChange={(e) => setEmail(e.target.value)} />
                        {generalError.email && <p className="error">{generalError.email}</p>}
                    </div>
                    <div className="input">
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        {generalError.password && <p className="error">{generalError.password}</p>}
                        {passwordError && <p className="error">{passwordError}</p>}
                    </div>
                    <div className="input">
                        <Dropdown onSelect={(eventKey: string | null) => setUserType(eventKey || "")}>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {userType || "Select User Type"}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                            <Dropdown.Item eventKey="researcher">Researcher</Dropdown.Item>
                            <Dropdown.Item eventKey="investor">Investor</Dropdown.Item>
                            <Dropdown.Item eventKey="institution_staff">Institution Staff</Dropdown.Item>
                            <Dropdown.Item eventKey="service_provider">Service Provider</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        {generalError.userType && <p className="error">{generalError.userType}</p>}
</div>


                    {/* Dropdown remains unchanged */}
                </div>
                <div className="submit-container">
                    <button 
                        type="button" // Specify button type, if not submitting a form you can use "button"
                        className="submit"
                        onClick={handleSignUp} 
                        disabled={hasErrors() || !validateEmail(email) || validatePassword(password)}
                    >
                        Sign Up
                    </button>
                    </div>
            </div>
        </div>
    );

}

export default Auth