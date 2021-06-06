import React, {useState, MouseEvent} from "react";
import s from './Registration.module.css'
import {Button} from "../../common/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {SendRegisterTC} from "../../../m2-bll/registerReducer";
import {AppRootStateType} from "../../../m2-bll/store";


const Registration = () => {
    const dispatch = useDispatch()
    const ApiError = useSelector<AppRootStateType, string>(state => state.register.setError)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorPassword, setErrorPassword] = useState<string | null>(null)

    const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
        if (password === confirmPassword && password.length >= 8) {
            dispatch(SendRegisterTC(email, password))
        } else if (password !== confirmPassword) {
            setErrorPassword("Passwords don't match.")
        } else if (password.length < 8 || confirmPassword.length < 8) {
            setErrorPassword("Password must contain at least 8 characters.")
        }
    }


    return <div className={s.background}>
        <div className={s.registerBlock}>
            <p> Please fill in the blank fields and press sign up </p>

            <form>
                <div className={s.registerForm}>
                    <label htmlFor={'email'}>Email</label>
                    <div className={s.register}>
                        <input className={s.registerFormInput}
                               name={'email'}
                               type={'email'}
                               onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <label htmlFor={'password'}>Password</label>
                    <div className={s.register}>

                        <input className={s.registerFormInput}
                               name={'password'}
                               type={'password'}
                               onChange={(e) => setPassword(e.target.value)}
                        />


                    </div>

                    <label htmlFor={'confirmPassword'}>Confirm password</label>
                    <div className={s.register}>
                        <input className={s.registerFormInput}
                               name={'confirmPassword'}
                               type={'password'}
                               onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <Button
                        onClick={handleSubmit}
                        label={'Sign Up'}
                        backgroundColor={'blue'}/>
                </div>
                {ApiError && <div className={s.formSummaryError}>{ApiError}</div>}
                {errorPassword ? <div className={s.formSummaryError}>{errorPassword}</div> : null}
            </form>
        </div>
    </div>
}

export default Registration;