import { onAuthStateChanged } from 'firebase/auth';
import './App.css';
import ParentComponent from './components/ParentComponent';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom"
import ResetPassword from './components/ResetPassword';
import { useEffect, useState } from 'react';
import { auth } from './components/firebase';



function App() {
  // eslint-disable-next-line
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Clean up the subscription when the component unmounts.
  }, []);

  const handleClick = () => {
    auth.signOut()
      .then(() => {
        console.log('Signed Out');
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            {/* <ParentComponent/> */}
            <Route path='/' element={[<button onClick={handleClick}> Sign Out</button>, <br/>, <Link to={'/login-signup'}>Login</Link>]}/>
            <Route path='/forgot-password' element={<ResetPassword />}></Route>
            <Route path='/login-signup' element={<ParentComponent />}></Route>
            {/* <Route path='/' element={user ? user.email : ''}></Route> */}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
