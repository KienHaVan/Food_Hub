import { Images } from '../../assets';

export const MenuItems = [
  {
    id: 0,
    name: 'My Orders',
    icon: Images.ICON.ORDERS,
    toScreen: 'Billing',
  },
  {
    id: 1,
    name: 'My Profile',
    icon: Images.ICON.PROFILE,
    toScreen: 'Profile',
  },
  {
    id: 2,
    name: 'Payment Methods',
    icon: Images.ICON.PAYMENT,
    toScreen: 'ManageCreditCard',
  },
  // {
  //   id: 4,
  //   name: 'Contact Us',
  //   icon: Images.ICON.CONTACT,
  // },
  // {
  //   id: 5,
  //   name: 'Settings',
  //   icon: Images.ICON.SETTING,
  // },
  // {
  //   id: 6,
  //   name: 'Helps & FAQs',
  //   icon: Images.ICON.HELP,
  // },
];
