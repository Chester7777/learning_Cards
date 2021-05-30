import React from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/store";
import s from './Profile.module.css'
import {url} from "inspector";
import {Button} from "../../common/Button/Button";

const  Profile=React.memo(function (){
    const name=useSelector<AppRootStateType,string>(state => state.profile.name)
    const ava=useSelector<AppRootStateType,string>(state => state.profile.avatar)
    const email=useSelector<AppRootStateType,string>(state => state.profile.email)
    const created=useSelector<AppRootStateType,string>(state => state.profile.created)
    const publicCardPacksCount=useSelector<AppRootStateType,string>(state => state.profile.publicCardPacksCount)

    return (
        <div>
            Profile
            <div className={s.wrapProfile}>
                <div className={s.wrapAva} style={{backgroundImage:  `url(${ava})`}}>ss</div>
<div className={s.wrapInfo}>
    <div className={s.infoBlock}>
        <div className={s.titles}>Name:</div>
        <div className={s.info}>ignat{name}</div>
    </div>
    <div className={s.infoBlock}>
        <div className={s.titles}>Email:</div>
        <div className={s.info}>{email}</div>
    </div>
    <div className={s.infoBlock}>
        <div className={s.titles}>Registration date:</div>
        <div className={s.info}>{created}</div>
    </div>
    <div className={s.infoBlock}>
        <div className={s.titles}>Card Packs:</div>
        <div className={s.info}>{publicCardPacksCount}</div>
    </div>
    <Button label={"LogOut"}/>

</div>

            </div>
        </div>

    );

})


export default Profile;

