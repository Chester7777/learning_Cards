import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Error404 from '../common/Error404';
import Registration from '../components/registration/Registration';
import ForgotPassword from '../components/forgotPassword/ForgotPassword';
import Profile from '../components/profile/Profile';
import {Login} from '../components/login/Login';
import Packs from '../components/packs/Packs';
import Cards from '../components/cards/Cards';
import NewPassword from '../components/forgotPassword/NewPassword';
import CardsContainer from '../components/cards/Cards';
import { Card } from '../components/cardComponent/card';


const Routes = () => {
    return (
        <>
            <Switch>
                <Route exact path={'/'} render={() => <div> Hello</div>}/>
                <Route exact path={'/registration'} render={() => <Registration/>}/>
                <Route exact path={'/forgot-password'} render={() => <ForgotPassword/>}/>
                <Route exact path={'/new-password/:token'} render={() => <NewPassword/>}/>
                {/*<Route exact path={'/new-password/:token/$token$'} render={() => <Login/>}/>*/}
                <Route exact path={'/profile'} render={() => <Profile/>}/>
                <Route exact path={'/login'} render={() => <Login/>}/>
                <Route exact path={'/packs'} render={() => <Packs/>}/>
                <Route exact path={'/card/:id?'} render={() => <Card/>}/>
                <Route exact path={'/cards/:id?'} render={() => <CardsContainer/>}/>
                {/*<Route path={'/404'} render={() => <Error404/>}/>*/}
                {/*<Redirect path={'*'} to={'/404'}/>*/}
            </Switch>
        </>
    );
}

export default Routes;