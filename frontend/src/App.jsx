import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { userDataContext } from "./context/UserContext";
import Customize from "./pages/Customize";
import Customize2 from "./pages/Customize2";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
    const {userData,setUserData}=useContext(userDataContext)
    return (
        <Routes>
            <Route path='/' element={(userData?.assistantImage && userData?.assistantName)?  <Home /> :<Navigate to={"/customize"}/>} />

            <Route path='/signup' element={!userData?<SignUp /> :<Navigate to={"/customize"} />} />

            <Route path='/signin' element={!userData?<SignIn /> :<Navigate to={"/"} />} />

            <Route path='/customize' element={userData?<Customize /> : <Navigate to ={"/signup"}/>} />

            <Route path='/customize2' element={userData?<Customize2 /> : <Navigate to ={"/signup"}/>} />
            <Route path='/home' element={<Home />} />

        </Routes>
    )
}

export default App