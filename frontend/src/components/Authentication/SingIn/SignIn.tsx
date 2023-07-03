import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { signIn } from "../../../actions/user";
import { useAppDispatch } from "../../../store/store";
import "./SignIn.scss";

const initialSignInState = {
  email: "",
  password: "",
};
const SignIn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [signInData, setSignInData] = useState(initialSignInState);

  const signInHandler = (event:any) => {
    event.preventDefault();
    dispatch(signIn(signInData));
    setSignInData(initialSignInState);
    navigate('/', { replace: true });
  };
  return (
    <div className="signin">
      <h1>Sign In</h1>
      <form onSubmit={signInHandler}>
        <label>Email</label>
        <input
          type="email"
          placeholder="email..."
          onChange={(e) =>
            setSignInData((prevState) => ({
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
            setSignInData((prevState) => ({
              ...prevState,
              password: e.target.value,
            }))
          }
        />
        <br />
        <button type="submit" className="full-button"> Sign In</button>
        <br />
        <p>
          New here? <Link to='/signup' style={{color:"white"}}>create a new account</Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
