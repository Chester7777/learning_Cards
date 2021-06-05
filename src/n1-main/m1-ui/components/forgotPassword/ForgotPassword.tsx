import React, {useCallback, useState} from 'react';
import {Button} from '../../common/Button/Button';
import {useDispatch, useSelector} from "react-redux";
import {forgotPasswordTC, setForgotPasswordError} from "../../../m2-bll/forgotReducer";
import {AppRootStateType} from "../../../m2-bll/store";
import s from "./ForgotPassword.module.css"


const ForgotPassword = React.memo(function ForgotPassword() {

    const dispatch = useDispatch();
    const message = useSelector((state: AppRootStateType) => state.forgotPassword.message);
    const from = useSelector((state: AppRootStateType) => state.forgotPassword.from);
    const error = useSelector((state: AppRootStateType) => state.forgotPassword.error);



    const [email, setEmail]= useState<string>("");


    const handleChange =(e:React.FormEvent<HTMLInputElement>)=> {
        if (e.currentTarget.value && e.currentTarget.value.trim() !== ""){
            setEmail(e.currentTarget.value);
        } else {
            dispatch(setForgotPasswordError(error))
        }
    }

    const onClickBtn = useCallback(() => {
        dispatch(forgotPasswordTC(email, message, from))
        setEmail('')}, [email, dispatch])

    return (
        <div className={s.forgotPasswordBlock} style={{marginTop:"25px"}}>
            Enter your email
            <input
                onChange={handleChange}
                type="email"
                style={{display:"block", marginLeft: "auto", marginRight:'auto', marginBottom:"5px", marginTop:"5px"}}
            />
                <Button  onClick={onClickBtn} size={'small'} label={"Forgot Password"} backgroundColor={"rgb(100 214 124)"} />
            <div className={s.errorText}>{error}</div>
        </div>
    );
})


export default ForgotPassword;