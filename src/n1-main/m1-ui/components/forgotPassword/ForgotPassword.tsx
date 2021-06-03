import React, {useCallback, useState} from 'react';
import {Button} from '../../common/Button/Button';
import {useDispatch, useSelector} from "react-redux";
import {forgotPasswordTC} from "../../../m2-bll/forgotReducer";
import {AppRootStateType} from "../../../m2-bll/store";
import s from "./ForgotPassword.module.css"


const ForgotPassword = React.memo(function ForgotPassword() {

    const dispatch = useDispatch();
    const message = useSelector((store: AppRootStateType) => store.forgotPassword.message);
    const from = useSelector((store: AppRootStateType) => store.forgotPassword.from)


    const [value, setValue]= useState<string>("");


    const handleChange =(e:React.FormEvent<HTMLInputElement>)=> {
        if (e.currentTarget.value && e.currentTarget.value.trim() !== ""){
            setValue(e.currentTarget.value);
        }
    }

    const onClickBtn = useCallback(() => {
        dispatch(forgotPasswordTC(value, message, from))
        setValue('')}, [value, dispatch])

    return (
        <div className={s.forgotPasswordBlock} style={{marginTop:"25px"}}>
            Enter your email
            <input
                onChange={handleChange}
                type="email"
                style={{display:"block", marginLeft: "auto", marginRight:'auto', marginBottom:"5px", marginTop:"5px"}}
            />
                <Button  onClick={onClickBtn} size={'small'} label={"Forgot Password"} backgroundColor={"rgb(100 214 124)"} />

        </div>
    );
})


export default ForgotPassword;