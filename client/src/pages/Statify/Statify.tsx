import "./Statify.css"
import "../../components/Login"
import Login from "../../components/Login"
import { useEffect, useState } from 'react';
import MostPlayedSongs from "../../components/MostPlayedSongs";
import Logout from "../../components/Logout";
import Cookies from 'js-cookie';

const Statify = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      if (Cookies.get('spotify_token') != undefined) {
        setIsLoggedIn(true);
      }
    };

    checkAuth();
  }, []);

  return (
    <div className='statify-container'>
      {!isLoggedIn ? (
        <Login></Login>
      ) : (
        <div>
          <Logout setIsLoggedIn={setIsLoggedIn}></Logout>
          <MostPlayedSongs></MostPlayedSongs>
        </div>
      )
      }
    </div>
  )
}

export default Statify