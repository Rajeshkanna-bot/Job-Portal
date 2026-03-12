import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login/index";
import Register from "./Pages/Signup/index";
import Jobs from "./Pages/Jobs";
import Createjob from "./Pages/Createjob";




function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/jobs" element={<Jobs/>}/>
        <Route path="/createjob" element={<Createjob/>}/>

       
      </Routes>

    </BrowserRouter>
  );
}

export default App;
