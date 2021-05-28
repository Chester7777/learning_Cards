import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import Header from "./header/Header";
import Routes from "./routes/Routes";
import {initializeAppTC} from "../m2-bll/appReducer";
import {useDispatch} from "react-redux";




const App = () => {

    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

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
