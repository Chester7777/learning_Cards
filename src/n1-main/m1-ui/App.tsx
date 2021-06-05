import React, {useEffect} from 'react';
import './App.css';
import {HashRouter} from "react-router-dom";
import Header from "./header/Header";
import Routes from "./routes/Routes";
import {initializeAppTC} from "../m2-bll/appReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../m2-bll/store";
import Loading from "./common/Loader/Loading";




const App = () => {
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)

    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])
    if (!isInitialized) {
        return <Loading/>
    }

  return (
      <HashRouter>
    <div className="App">
      {/*// hashrouter //  provider*/}
      <Header />
      <Routes />
    </div>
      </HashRouter>
  );
}

export default App;
