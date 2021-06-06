import React, {useCallback, useState} from 'react';
import {Button} from '../../common/Button/Button';
import {useDispatch, useSelector} from "react-redux";
import {forgotPasswordTC, resetNewPassword, setForgotPasswordError} from "../../../m2-bll/forgotReducer";
import {AppRootStateType} from "../../../m2-bll/store";
import s from "./ForgotPassword.module.css";
import {useParams} from 'react-router-dom';
import {NavLink, Redirect} from 'react-router-dom';


const NewPassword = React.memo(function ForgotPassword() {

    const dispatch = useDispatch();
    // const resetPasswordToken = useSelector((state: AppRootStateType) => state.forgotPassword.resetPasswordToken);
    const info = useSelector((state: AppRootStateType) => state.forgotPassword.info);
    const error = useSelector((state: AppRootStateType) => state.forgotPassword.error);
    const {token} = useParams<{ token: string }>();


    const [password, setPassword] = useState<string>("");


    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        if (e.currentTarget.value && e.currentTarget.value.trim() !== "") {
            setPassword(e.currentTarget.value);
        } else {
            dispatch(setForgotPasswordError(error));
        }
    }

    const onClickBtn = useCallback((event) => {
        event.preventDefault()
        dispatch(resetNewPassword(password, token))
        setPassword('')
    }, [password, dispatch])

    // if (info === "setNewPassword success —ฅ/ᐠ.̫ .ᐟฅ—") {
    if (info === "setNewPassword success —ฅ/ᐠ.̫ .ᐟฅ—") {
        return <Redirect to={"/login"}/>
        // return (
        //     <div>
        //         <div>
        //             <p> !!!Success!!! <br/>
        //                 Please send your email and new password</p>
        //         </div>
        //         <NavLink to='/login'>Login</NavLink>
        //     </div>
        // )
    } 

    return (
        <div className={s.forgotPasswordBlock}>
            <div className={s.registerBlock}>
                <p> Please enter new password and press "Forgot password" </p>
                <div className={s.registerForm}>
                    <label htmlFor={'password'}>Password ********</label>
                    <div className={s.register}>
                        <input
                            onChange={handleChange}
                            className={s.registerFormInput}
                            type="password"
                            style={{
                                display: "block",
                                marginLeft: "auto",
                                marginRight: 'auto',
                                marginBottom: "5px",
                                marginTop: "5px"
                            }}
                        />
                    </div>
                    <Button onClick={onClickBtn} size={'small'} label={"Forgot Password"}
                            backgroundColor={"rgb(100 214 124)"}/>
                </div>

                <div className={s.errorText}>{error}</div>
            </div>
        </div>
    );
})


export default NewPassword;