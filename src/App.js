import './App.css';
import Navbar from './Component/Navbar';
import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';
import Home from './Pages/Home';
import BookingPage from './Pages/BookingPage';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import Admin from './Pages/Admin';
import Landing from './Pages/Landing';



function App() {
  return (
    <div className="App">
      <Navbar/>



      <Router>


      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/room/:roomid/:fromdate/:todate" element={<BookingPage />} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/' element={<Landing/>}/>




      </Routes>
    </Router>

    </div>
  );
}

export default App;
