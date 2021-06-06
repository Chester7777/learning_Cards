import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './Header.module.css';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../m2-bll/store";

const Header = () => {
    const name = useSelector<AppRootStateType, string>(state => state.profile.name)

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    return (
        <nav className={s.nav}>
            {isLoggedIn ? <div className={s.item}>
                    {<NavLink to='/Profile' activeClassName={s.active}>{name}</NavLink>}
                </div> :
                <div className={s.item}>
                    {<NavLink to='/Login' activeClassName={s.active}>Login</NavLink>}
                </div>}

            <div className={s.item}>
                <NavLink to='/Registration' activeClassName={s.active}>Registration</NavLink>
            </div>
            {!isLoggedIn ? <div className={s.item}>
                <NavLink to='/forgot-password' activeClassName={s.active}>Forgot Password</NavLink>
            </div> :
                <div className={s.item}>
                    <NavLink to='/new-password' activeClassName={s.active}>New Password</NavLink>
                </div>}
            {/*<div className={s.item}>*/}
            {/*    <NavLink to='/forgot-password' activeClassName={s.active}>Forgot Password</NavLink>*/}
            {/*</div>*/}
            {/*<div className={s.item}>*/}
            {/*    <NavLink to='/new-password' activeClassName={s.active}>New Password</NavLink>*/}
            {/*</div>*/}
            <div className={s.item}>
                <NavLink to='/Profile' activeClassName={s.active}>Profile</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/packs' activeClassName={s.active}>Packs</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/cards' activeClassName={s.active}>Cards</NavLink>
            </div>
        </nav>
    )
}

export default Header