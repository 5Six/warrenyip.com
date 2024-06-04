import './Login.css'

const Login = () => {
  const handleLogin = () => {
    window.location.href = 'http://localhost:8000/api/login/';
    console.log('hi');
  };

    return (
        <div className='login-button-container'>
            <button className='login-button' onClick={handleLogin}>Login with Spotify</button>
        </div>
    );
};

export default Login;