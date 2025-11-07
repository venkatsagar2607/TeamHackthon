import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './Auth/Signin';
import Signup from './Auth/Signup';
import Home from './Pages/Home'
import NavBar from './Navigation/Navbar'
import Profile from './Pages/Profile';
import Footer from './Navigation/Footer';
import Contact from './Navigation/Contact'
import Dashboard from './Pages/Dashboard';
import Report from './Pages/Report';
import Alert from './Pages/Alert';
import Settings from './Pages/Settings';
import MyReports from './Pages/MyReports';
import Maps from './Pages/MapPage'



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signin />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/navbar' element={<NavBar />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/footer' element={<Footer />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/report' element={<Report />}></Route>
          <Route path='/alert' element={<Alert />}></Route>
          <Route path='/settings' element={<Settings />}></Route>
          <Route path='/myreports' element={<MyReports />}></Route>
          <Route path='/maps' element={<Maps />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
