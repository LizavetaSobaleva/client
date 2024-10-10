import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./authorization.less";
import Input from "../UI/input/Input";
import PrimaryButton from "../UI/primaryButton/PrimaryButton";
import { useDispatch } from 'react-redux';
import { login } from "../../actions/user";
import Image_1 from "../../assets/img/main_page.png"
import Image_2 from "../../assets/img/profile.png"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

  return (
    <div className="authorization">
      <div className="authorization__banner">
        <div className="authorization__header">
          <h2>Effortless storage for your digital life</h2>
          <h3>Keep your files close, no matter where you are</h3>
        </div>
        <div className="authorization__images">
          <img className="authorization__images__image_1" src={Image_1}/>
          <img className="authorization__images__image_2" src={Image_2}/>
        </div>
      </div>
      <div className="authorization__container">
        <div className="authorization__label" data-testid="formTitle">
          <h1>Log in to cloud</h1>
        </div>
        <div className="authorization__form">
          <div className="authorization__item">
            <label htmlFor="emailInput">Email</label>
            <Input id="emailInput" value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Enter your email" data-testid="emailInput" />
          </div>

          <div className="authorization__item">
            <label htmlFor="passwordInput">Password</label>
            <Input id="passwordInput" value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Enter your password" data-testid="passwordInput" />
          </div>

          <PrimaryButton onClick={() => dispatch(login(email, password))} data-testid="loginButton">Log in</PrimaryButton>
        </div>
        <div className="authorization__login"  data-testid="registrationLink">
          <Link to="/registration">Create an account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
