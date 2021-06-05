import React, {useState} from "react";
import s from "../login/Login.module.css";
import {Button} from "../../common/Button/Button";
import {loginTC} from "../../../m2-bll/loginReducer";
import {useDispatch, useSelector} from "react-redux";
import {LoginParamsType} from "../../../m3-dal/auth-api";
import {AppRootStateType} from "../../../m2-bll/store";
import {Redirect} from "react-router-dom";
import Profile from "../profile/Profile";
import {Simulate} from "react-dom/test-utils";
import {minMaxLength, validEmail } from "../../common/validators.ts";

type  LoginContentPropsType = {

    onClickHandler: ({email, password, rememberMe}: LoginParamsType) => void
}

export const Login = () => {
    const dispatch = useDispatch()

    const onClickHandler = ({email, password, rememberMe}: LoginParamsType) => {
        dispatch(loginTC({email, password, rememberMe}))
    }
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    if (isLoggedIn) {
        return <Redirect to={'/Profile'}/>
    }
    return <LoginContent onClickHandler={onClickHandler}/>


}


const LoginContent: React.FC<LoginContentPropsType> = ({
                                                           onClickHandler

                                                       }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [emailError,setEmailError]=useState('')
    const [passwordError,setPasswordError]=useState('')

 const onchangeEmailHandler=(e: React.ChangeEvent<HTMLInputElement>)=>{
        if(e.currentTarget.value &&validEmail(e.currentTarget.value)){
            setEmail(e.currentTarget.value)
            setEmailError('')

        }
        else    {
            setEmailError('Email not valid!')
            setEmail(e.currentTarget.value)

        }
 }
    const onchangePasswordHandler=(e: React.ChangeEvent<HTMLInputElement>)=>{
        if(e.currentTarget.value && minMaxLength(e.currentTarget.value,5)){
            setPassword(e.currentTarget.value)
            setPasswordError('')

        }
        else    {
            setPasswordError('password not valid!')
            setPassword(e.currentTarget.value)

        }
    }

    const onClickLoginButton = () => {
        onClickHandler({email, password, rememberMe})
    }

    const error = useSelector<AppRootStateType, string>(state => state.profile.error)

        return (
        <div className={s.background}>
            <div className={s.registerBlock}>
                <p> Please fill in the blank fields and press Login </p>

                <form className={s.registerForm}>

                    <label htmlFor={'email'}>Email nya-admin@nya.nya</label>
                    <div className={s.register}>
                        <input
                            className={s.registerFormInput}
                            type="email"
                            name="email"
                            value={email}
                            onChange={onchangeEmailHandler}/>
                    </div>

                    <div className={s.errorText}>{emailError}</div>

                    <label htmlFor={'password'}>Password 1qazxcvBG</label>
                    <div className={s.register}>
                        <input
                            className={s.registerFormInput}
                            type="password"
                            name="password"
                            value={password}
                            onChange={onchangePasswordHandler}
                        />
                    </div>
                    <div className={s.errorText}>{passwordError}</div>
                    <label htmlFor={'checkbox'}> <span className={s.check}>Remember Me</span></label>
                    <input
                        className={s.inputcheck}
                        type={"checkbox"}
                        name="rememberMe"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(!rememberMe)}
                    />
                    <Button
                        primary={true}
                        onClick={onClickLoginButton}
                        label={'Login'}
                    />
                    <div className={s.errorText}>{error}</div>

                </form>
            </div>

        </div>

    )


}




