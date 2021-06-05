import React from "react";
import s from './Registration.module.css'
import {Button} from "../../common/Button/Button";


const Registration = () => {


    return (
        <div className={s.background}>
            <div className={s.registerBlock}>
                <p> Please fill in the blank fields and press sign up </p>

                <form className={s.registerForm}>

                    <label htmlFor={'email'}>Email</label>
                    <div className={s.register}>
                    <input className={s.registerFormInput}  type="email"

                    />
                    </div>

                    <label htmlFor={'password'}>Password</label>
                    <div className={s.register}>
                    <input className={s.registerFormInput} type="password"/>
                    </div>

                    <label htmlFor={'password'}>Confirm password</label>
                    <div className={s.register}>
                    <input className={s.registerFormInput} type="password"/>
                    </div>
                    <Button
                        label={'Sign Up'}
                        primary={true}
                        />
                </form>
            </div>
        </div>

    )

}

export default Registration;