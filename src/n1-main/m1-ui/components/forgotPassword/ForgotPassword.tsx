import React from 'react';
import {Button} from '../../common/Button/Button';


const ForgotPassword = React.memo(function ForgotPassword() {


    return (
        <div style={{marginTop:"25px"}}>
            Enter your email
            <input type="email"   style={{display:"block",    marginLeft: "auto", marginRight:'auto', marginBottom:"5px", marginTop:"5px"}}/>
            <Button size={'small'} label={"Forgot Password"} backgroundColor={"rgb(100 214 124)"} />
        </div>
    );
})


export default ForgotPassword;