import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './Header.module.css';

const Header = () => {
    return (
        <nav className={s.nav}>
            <div className={s.item}>
                {<NavLink to='/Login' activeClassName={s.active}>Login</NavLink>}
            </div>
            <div className={s.item}>
                <NavLink to='/Registration' activeClassName={s.active}>Registration</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/forgot-password' activeClassName={s.active}>Forgot Password</NavLink>
            </div>
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