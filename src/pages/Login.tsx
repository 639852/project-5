import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import styled from '@emotion/styled';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { setUser } from '../store/slices/userSlice';

const Main = styled.main`
  position: relative;
  z-index: 1500;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  box-sizing: border-box;
  background: var(--dark-background-color);
`;

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const userString = localStorage.getItem('user') || '{}';
    const user = JSON.parse(userString);

    if (userString !== '{}') {
      dispatch(setUser({ ...user }));

      navigate('/dashboard');
    }
  }, []);

  function login() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(({ user }) => {
        const userData = {
          id: user.uid,
          email: user.email,
          token: user.refreshToken,
          name: user.displayName,
          avatar: user.photoURL,
        };

        dispatch(setUser(userData));

        localStorage.setItem('user', JSON.stringify(userData));

        navigate('/dashboard');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const credential = GoogleAuthProvider.credentialFromError(error);
        const { email } = error;

        console.error(`
          Error ${errorCode}.
          ${errorMessage} for ${email}!
          ${credential}.
        `);
      });
  }

  return (
    <Main>
      <Button
        variant="contained"
        size="large"
        sx={{ textTransform: 'none' }}
        onClick={() => login()}
      >
        Log in with Google
      </Button>
    </Main>
  );
}

export default Login;
