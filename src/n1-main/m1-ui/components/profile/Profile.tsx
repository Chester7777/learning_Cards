import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/store";
import s from './Profile.module.css'
import {Button} from "../../common/Button/Button";
import {logoutTC} from "../../../m2-bll/loginReducer";
import {logOutAC} from "../../../m2-bll/profileReducer";
import {Redirect} from "react-router-dom";

const Profile =React.memo(function (){
    const dispatch = useDispatch()
    const name = useSelector<AppRootStateType, string>(state => state.profile.name)
    const ava = useSelector<AppRootStateType, string>(state => state.profile.avatar)
    const email = useSelector<AppRootStateType, string>(state => state.profile.email)
    const created = useSelector<AppRootStateType, string>(state => state.profile.created)
    const publicCardPacksCount = useSelector<AppRootStateType, string>(state => state.profile.publicCardPacksCount)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)

    function logOutHandler() {
        dispatch(logoutTC())
        dispatch(logOutAC())
    }

    if (!isLoggedIn) {
        return <Redirect to='/login'/>

    }
    return (
        <div>
            Profile
            <div className={s.wrapProfile}>
                <div className={s.wrapAva} style={{backgroundImage: `url(${ava})`}}>ss</div>
                <div className={s.wrapInfo}>
                    <div className={s.infoBlock}>
                        <div className={s.titles}>Name:</div>
                        <div className={s.info}>{name}</div>
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
                    <Button onClick={logOutHandler} label={"LogOut"}/>

                </div>

            </div>
        </div>

    );

}
)

export default Profile;

