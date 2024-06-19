import './Login.css';

const Login = () => {
  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_REACT_APP_API_URL}/login/`;
  };

  return (
    <div className='login-button-container'>
      <button className='login-button' onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
};

export default Login;