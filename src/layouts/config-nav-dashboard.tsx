import { ReactNode, useCallback } from 'react';
import { useAuthState } from 'src/hooks/use-auth-state';
import { logout } from 'src/auth/auth';
import { Iconify } from 'src/components/iconify';

type NavItem = {
  title: string;
  path: string;
  icon: ReactNode;
  info?: ReactNode;
  onClick?: () => void;
};

export function useNavConfig() {
  const { isAuthenticated } = useAuthState();

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      console.log('Logged out successfully');
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, []);

  const navItems: NavItem[] = [
    {
      title: 'Students',
      path: '/students',
      icon: <Iconify icon="solar:users-group-rounded-bold" width={24} />,
    },
    ...(isAuthenticated
      ? [
          {
            title: 'Logout',
            path: '#',
            icon: <Iconify icon="solar:logout-3-bold" width={24} />,
            onClick: handleLogout,
          },
        ]
      : []),
  ];

  return navItems;
}
