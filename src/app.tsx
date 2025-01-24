import 'src/global.css';

import Fab from '@mui/material/Fab';

import { Router } from 'src/routes/sections';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import { ThemeProvider } from 'src/theme/theme-provider';

import { Iconify } from 'src/components/iconify';

import { useEffect } from 'react';

import { auth } from 'src/auth/config';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('User is signed in:', user.email);
      } else {
        console.log('User is signed out');
      }
    });

    return () => unsubscribe();
  }, []);

  const githubButton = (
    <Fab
      size="medium"
      aria-label="Github"
      href="https://github.com/minimal-ui-kit/material-kit-react"
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
  );

  return (
    <ThemeProvider>
      <Router />
      {githubButton}
    </ThemeProvider>
  );
}
