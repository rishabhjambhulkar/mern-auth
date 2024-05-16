import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Verification from './pages/Verification';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Book from './pages/Book';
import { useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log(isAuthenticated);
  return (
    <BrowserRouter>
      {isAuthenticated && <Header />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/verification' element={<Verification />} />
        <Route path='/book' element={<Book />} />
        <Route path='/sign-in' element={<SignIn setIsAuthenticated={setIsAuthenticated} />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route element={<PrivateRoute setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} />}>
          <Route path='/profile' element={<Profile setIsAuthenticated={setIsAuthenticated} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
