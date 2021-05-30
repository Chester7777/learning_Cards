import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import Header from "./header/Header";
import Routes from "./routes/Routes";
import {initializeAppTC} from "../m2-bll/appReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../m2-bll/store";




const App = () => {
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)

    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])
    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            Загрузка крутилка
        </div>
    }

  return (
      <BrowserRouter>
    <div className="App">
      {/*// hashrouter //  provider*/}
      <Header />
      <Routes />
    </div>
      </BrowserRouter>
  );
}

export default App;
