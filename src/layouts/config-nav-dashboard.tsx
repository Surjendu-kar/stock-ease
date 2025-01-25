import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';
import { useAuthState } from 'src/hooks/use-auth-state';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

// const baseNavItems = [
//   {
//     title: 'Dashboard',
//     path: '/',
//     icon: icon('ic-analytics'),
//   },
//   {
//     title: 'User',
//     path: '/user',
//     icon: icon('ic-user'),
//   },
//   {
//     title: 'Product',
//     path: '/products',
//     icon: icon('ic-cart'),
//     info: (
//       <Label color="error" variant="inverted">
//         +3
//       </Label>
//     ),
//   },
//   {
//     title: 'Blog',
//     path: '/blog',
//     icon: icon('ic-blog'),
//   },
//   {
//     title: 'Not found',
//     path: '/404',
//     icon: icon('ic-disabled'),
//   },
// ];

const baseNavItems = [
  {
    title: 'Students',
    path: '/students',
    icon: icon('ic-user'),
  },
];

export function useNavConfig() {
  const { isAuthenticated } = useAuthState();

  const navItems = [
    ...baseNavItems,
    ...(!isAuthenticated
      ? [
          {
            title: 'Sign in',
            path: '/sign-in',
            icon: icon('ic-lock'),
          },
        ]
      : []),
  ];

  return navItems;
}
