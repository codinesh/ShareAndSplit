import { OfficeBuildingIcon, UserIcon } from '@heroicons/react/outline'
import { INavigationItem } from './types/INavigationItem'

const navigation: INavigationItem[] = [
  {
    name: 'Home',
    pageTitle: 'Home',
    icon: OfficeBuildingIcon,
    path: '/',
  },
  {
    name: 'Organizer',
    pageTitle: 'Home',
    icon: UserIcon,
    path: '/organizer',
  },
  {
    name: 'Subscriber',
    pageTitle: 'Home',
    icon: UserIcon,
    path: '/subscriber',
  },
]

const userNavigation = [
  { name: 'Your Profile', href: '/profile' },
  { name: 'Settings', href: '/settings' },
  {
    name: 'Sign out',
    href: '#signout',
    onClick: () => {
      console.log('signing out')
    },
  },
]

export const data = {
  navigation,
  userNavigation,
}
