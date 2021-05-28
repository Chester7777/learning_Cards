import React from "react";
import s from "../registration/Registration.module.css";
import {Button} from "../../common/Button/Button";


export const Login = () => {


    return <div >
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
                />
            </div>
            <div>
                Password
                <input
                    type="password"
                    name="password"
                />
            </div>
            <input
                type={"checkbox"}
                name="rememberMe"
            />
            <div className={s.errorText}>

            </div>
            <Button
                label={'Login'}
                backgroundColor={'blue'}
            />
        </form>
    </div>
}

