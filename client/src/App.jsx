import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <BrowserRouter>

    <Header />
    <Toaster
      position="top-right"
      reverseOrder={true}
    />

    <Routes>
      <Route path="/" element={<Home />} />
      
      <Route path="/about" element={<About />} />

      <Route path="/sign-in" element={<SignIn />} />

      <Route path="/sign-up" element={<SignUp />} />

      <Route element={<PrivateRoute />} >
        <Route path="/profile" element={<Profile />} />
      </Route>

    </Routes>

    </BrowserRouter>
  )
}
