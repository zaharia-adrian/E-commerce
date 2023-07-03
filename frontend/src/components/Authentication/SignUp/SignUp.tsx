import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch } from "../../../store/store";
import { signUp } from "../../../actions/user";

import "./SignUp.scss";
import { setError } from "../../../actions/error";

const initialSignUpState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState(initialSignUpState);

  const signUpHandler = (event:any) => {
    event.preventDefault();

    if (signUpData.password.length < 6) {
      dispatch(setError("Password should have at least 6 characters!"));
      return;
    }
    if (signUpData.password !== signUpData.confirmPassword) {
      dispatch(setError("Password and confirm password must coincide!"));
      return;
    }
    dispatch(signUp(signUpData));
    setSignUpData(initialSignUpState);
    navigate("/", { replace: true });
  };
  return (
    <div className="signup">
      <h1>Sign Up</h1>
      <form onSubmit={signUpHandler}>
        <label>Name</label>
        <input
          type="text"
          placeholder="name..."
          onChange={(e) =>
            setSignUpData((prevState) => ({
              ...prevState,
              name: e.target.value,
            }))
          }
        />
        <label>Email</label>
        <input
          type="email"
          placeholder="email..."
          onChange={(e) =>
            setSignUpData((prevState) => ({
              ...prevState,
              email: e.target.value,
            }))
          }
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="password..."
          onChange={(e) =>
            setSignUpData((prevState) => ({
              ...prevState,
              password: e.target.value,
            }))
          }
        />
        <label>Confirm password</label>
        <input
          type="password"
          placeholder="confirm password..."
          onChange={(e) =>
            setSignUpData((prevState) => ({
              ...prevState,
              confirmPassword: e.target.value,
            }))
          }
        />
        <br />
        <button type="submit" className="full-button"> Sign Up</button>
        <br />
        <p>
          Already have an account? <Link to='/signin' style={{color:"white"}}>Sign In</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
