import { useAuth0 } from '@auth0/auth0-react';
function Login() {
  const {
    isAuthenticated,
    loginWithRedirect,
  } = useAuth0();
  function handleLogin() {
    loginWithRedirect();
  }
  return (!isAuthenticated &&
    <button className="auth-button" onClick={handleLogin}>Log in</button>
  );
}
export default Login;