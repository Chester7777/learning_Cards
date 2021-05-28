import React from "react";
import s from './Registration.module.css'
import {Button} from "../../common/Button/Button";


const Registration = () => {



        return (
            <div>
                <p> Please fill in the blank fields and press sign up </p>
                <form className={s.register}>

                    <div>Email</div>
                    <input />
                    <div >Password</div>
                    <input />
                    <div >Password</div>
                    <input />


                    <Button
                        label={'Sign Up'}
                        backgroundColor={'blue'}/>
                </form>
            </div>

        )

}

export default Registration;