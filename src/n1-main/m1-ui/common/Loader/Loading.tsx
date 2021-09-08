import React from "react";
import spinner from '../Loader/__Iphone-spinner-1.gif'
import s from '../Loader/loading.module.css'

const Loading = () => {
    return (
        <div>
            <div className={s.loadingStyle}><img src={spinner} alt="Be patient..."/></div>
        </div>

    );
}

export default Loading;