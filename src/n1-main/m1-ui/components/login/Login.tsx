import React, {useState} from "react";
import s from "../registration/Registration.module.css";
import {Button} from "../../common/Button/Button";
import {loginTC} from "../../../m2-bll/loginReducer";
import {useDispatch, useSelector} from "react-redux";
import {LoginParamsType} from "../../../m3-dal/auth-api";
import {AppRootStateType} from "../../../m2-bll/store";
import {Redirect} from "react-router-dom";
import Profile from "../profile/Profile";

type  LoginContentPropsType = {
    // email: string
    // setEmail: () => void
    // password: string
    // setPassword: () => void
    // rememberMe: boolean
    // setRememberMe: () => void
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

    const [email, setEmail] = useState('nya-admin@nya.nya')
    const [password, setPassword] = useState('1qazxcvBG')
    const [rememberMe, setRememberMe] = useState(false)
    const onClickLoginButton = () => {
        onClickHandler({email, password, rememberMe})
    }


    return <div>
        <p> Please fill in the blank fields and press LOGIN </p>
        <p>or use common test account credentials:</p>
        <p>Email: <b>nya-admin@nya.nya</b></p>
        <p>Password: <b>1qazxcvBG</b></p>
        <form className={s.register}>

            <div>
                Email
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}/>
            </div>
            <div>
                Password
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                />
            </div>
            <input
                type={"checkbox"}
                name="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(!rememberMe)}
            />
            <div className={s.errorText}>

            </div>
            <Button
                onClick={onClickLoginButton}
                label={'Login'}
                backgroundColor={'blue'}
            />
        </form>
    </div>


}






