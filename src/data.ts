import { OfficeBuildingIcon, UserIcon } from '@heroicons/react/outline'
import { INavigationItem } from './types/INavigationItem'

const navigation: INavigationItem[] = [
  {
    name: 'Products',
    pageTitle: 'Products',
    icon: OfficeBuildingIcon,
    path: '/',
  },
  {
    name: 'Friends',
    pageTitle: 'Friends',
    icon: UserIcon,
    path: '/friends',
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
