import './App.css';
import NewComponent from './Components/NewComponent';
import Payment from './Components/Payment';
import Binance from './Components/Binance';
import Home from './Components/Home';
import About from './Components/About';
import Navbar from './Components/Navbar';
import Contact from './Components/Contact';
import Developer from './Components/Developer';
import Profile from './Components/Profile';
import Login from './Components/Login';
import Register  from './Components/Register';
import Forgot from './Components/Forgot';
import Footer from './Components/Footer';
import OtpVerification from './Components/OtpVerification';
import Dashboard from './Components/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Components/Main'; // Import the Main component
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
  
    <Router>
      <Routes>
      <Route path="/main" element={<Main />} />
      <Route path="/" element={<Login />} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/developer" element={<Developer/>} />
      <Route path="/register" element={<Register />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/footer" element={<Footer />} />
      <Route path="/OtpVerify" element={<OtpVerification/>} />
      <Route path="/forgot" element={<Forgot/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/Binance" element={<Binance />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
     </Router>
  );
}

export default App;
