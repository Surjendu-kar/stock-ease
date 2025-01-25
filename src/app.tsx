import 'src/global.css';

import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Fab from '@mui/material/Fab';
import { Tooltip } from '@mui/material';

import { Router } from 'src/routes/sections';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import { ThemeProvider } from 'src/theme/theme-provider';

import { Iconify } from 'src/components/iconify';

import { auth } from 'src/auth/config';

const PUBLIC_PATHS = ['/sign-in', '/sign-up'];

export default function App() {
  useScrollToTop();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      const isPublicPath = PUBLIC_PATHS.includes(location.pathname);

      if (!user && !isPublicPath) {
        navigate('/sign-in');
      } else if (user) {
        console.log('User is signed in:', user.email);
      }
    });

    return () => unsubscribe();
  }, [navigate, location]);

  const githubButton = (
    <Tooltip title="Click to visit github repo" arrow>
      <Fab
        size="medium"
        aria-label="Github"
        href="https://github.com/Surjendu-kar/material-kit"
        sx={{
          zIndex: 9,
          right: 20,
          bottom: 20,
          width: 44,
          height: 44,
          position: 'fixed',
          bgcolor: 'grey.800',
          color: 'common.white',
        }}
      >
        <Iconify width={24} icon="eva:github-fill" />
      </Fab>
    </Tooltip>
  );

  return (
    <ThemeProvider>
      <Router />
      {githubButton}
    </ThemeProvider>
  );
}
