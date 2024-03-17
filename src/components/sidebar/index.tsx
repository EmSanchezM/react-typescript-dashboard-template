import { useState, useEffect } from 'react';

export enum UserRolesEnum {
  API_USER = 'API_USER',
  ADMIN_USER = 'ADMIN_USER',
  SUPER_USER = 'SUPER_USER'
}

export interface MenuItemTypes {
  key: string;
  label: string;
  isTitle?: boolean;
  icon?: string;
  url?: string;
  roles: UserRolesEnum[];
  badge?: {
    variant: string;
    text: string;
  };
  parentKey?: string;
  target?: string;
  children?: MenuItemTypes[];
}

const MENU_ITEMS: MenuItemTypes[] = [
  {
    key: 'cash-in',
    label: 'Cash in',
    isTitle: true,
    roles: [UserRolesEnum.SUPER_USER, UserRolesEnum.ADMIN_USER]
  },
  {
    key: 'transactions',
    label: 'Transactions',
    isTitle: false,
    icon: 'bx bx-bell',
    roles: [UserRolesEnum.SUPER_USER, UserRolesEnum.ADMIN_USER],
    children: [
      {
        key: 'bank-transactions',
        label: 'Bank transactions',
        url: '/bank/transactions',
        parentKey: 'transactions',
        roles: [UserRolesEnum.SUPER_USER, UserRolesEnum.ADMIN_USER]
      },
      {
        key: 'wallet-transactions',
        label: 'Wallet Transactions',
        url: '/wallet/transactions',
        parentKey: 'transactions',
        roles: [UserRolesEnum.SUPER_USER, UserRolesEnum.ADMIN_USER]
      }
    ]
  },
  {
    key: 'closures',
    label: 'Closures',
    isTitle: false,
    icon: 'bx bx-bell',
    roles: [UserRolesEnum.SUPER_USER, UserRolesEnum.ADMIN_USER],
    children: [
      {
        key: 'pending-closures',
        label: 'Pending Closures',
        url: '/pending/closures',
        parentKey: 'closures',
        roles: [UserRolesEnum.SUPER_USER, UserRolesEnum.ADMIN_USER]
      },
      {
        key: 'paid-closures',
        label: 'Paid Closures',
        url: '/paid/closures',
        parentKey: 'closure',
        roles: [UserRolesEnum.SUPER_USER, UserRolesEnum.ADMIN_USER]
      }
    ]
  },
  {
    key: 'serviceChannels',
    label: 'Service Channels',
    isTitle: true,
    roles: [UserRolesEnum.ADMIN_USER, UserRolesEnum.ADMIN_USER]
  },
  {
    isTitle: false,
    key: 'payment-links',
    icon: 'bx bx-bell',
    label: 'Links de pagos',
    url: '/services/payment-links',
    parentKey: 'services',
    roles: [UserRolesEnum.ADMIN_USER, UserRolesEnum.ADMIN_USER]
  },
  {
    isTitle: false,
    key: 'subscriptions',
    label: 'Subscriptions',
    icon: 'bx bx-bell',
    url: '/services/subscriptions',
    parentKey: 'services',
    roles: [UserRolesEnum.ADMIN_USER, UserRolesEnum.ADMIN_USER]
  },
  {
    key: 'customers',
    label: 'Customers',
    isTitle: false,
    icon: 'bx bx-bell',
    url: '/services/customers',
    parentKey: 'services',
    roles: [UserRolesEnum.ADMIN_USER, UserRolesEnum.ADMIN_USER]
  },
  {
    key: 'products',
    label: 'Products',
    isTitle: false,
    icon: 'bx bx-bell',
    url: '/services/products',
    parentKey: 'services',
    roles: [UserRolesEnum.ADMIN_USER, UserRolesEnum.ADMIN_USER]
  },
  {
    key: 'admin',
    label: 'Admin',
    isTitle: true,
    roles: [UserRolesEnum.SUPER_USER]
  },
  {
    isTitle: false,
    key: 'blacklist',
    icon: 'bx bx-bell',
    label: 'Blacklist',
    url: '/blacklist',
    roles: [UserRolesEnum.SUPER_USER]
  },
  {
    isTitle: false,
    key: 'accounts',
    icon: 'bx bx-bell',
    label: 'Accounts',
    url: '/accounts',
    roles: [UserRolesEnum.SUPER_USER]
  },
  {
    isTitle: false,
    key: 'venues',
    icon: 'bx bx-bell',
    label: 'Venues',
    url: '/accounts/venues',
    roles: [UserRolesEnum.SUPER_USER]
  },
  {
    isTitle: false,
    key: 'conciliation',
    icon: 'bx bx-bell',
    label: 'Concilations',
    url: '/conciliations',
    roles: [UserRolesEnum.SUPER_USER]
  },
  {
    isTitle: false,
    key: 'report-payments',
    icon: 'bx bx-bell',
    label: 'Comissions report',
    url: '/reports/payments',
    roles: [UserRolesEnum.SUPER_USER]
  },
  {
    key: 'settings',
    label: 'System settings',
    isTitle: true,
    roles: [UserRolesEnum.SUPER_USER]
  },
  {
    key: 'settings',
    label: 'Settings',
    isTitle: false,
    icon: 'bx bx-bell',
    roles: [UserRolesEnum.SUPER_USER],
    children: [
      {
        key: 'banks-settings',
        label: 'Banks',
        url: '/settings/banks',
        parentKey: 'settings',
        roles: [UserRolesEnum.SUPER_USER]
      },
      {
        key: 'bin-settings',
        label: 'Bins Settings',
        url: '/settings/bins',
        parentKey: 'settings',
        roles: [UserRolesEnum.SUPER_USER]
      },
      {
        key: 'wallet-settings',
        label: 'Wallet Settings',
        url: '/settings/wallets',
        parentKey: 'settings',
        roles: [UserRolesEnum.SUPER_USER]
      },
      {
        key: 'countries-settings',
        label: 'Countries Settings',
        url: '/settings/countries',
        parentKey: 'settings',
        roles: [UserRolesEnum.SUPER_USER]
      },
      {
        key: 'currencies-settings',
        label: 'Currencies Settings',
        url: '/settings/currencies',
        parentKey: 'settings',
        roles: [UserRolesEnum.SUPER_USER]
      },
      {
        key: 'channels-settings',
        label: 'Channels Settings',
        url: '/settings/channels',
        parentKey: 'settings',
        roles: [UserRolesEnum.SUPER_USER]
      },
      {
        key: 'payment-method-settings',
        label: 'Payment Method Settings',
        url: '/settings/payment-methods',
        parentKey: 'settings',
        roles: [UserRolesEnum.SUPER_USER]
      },
      {
        key: 'categories-settings',
        label: 'Categories Settings',
        url: '/settings/categories',
        parentKey: 'settings',
        roles: [UserRolesEnum.SUPER_USER]
      },
      {
        key: 'security-providers-settings',
        label: 'Security Providers',
        url: '/settings/security-providers',
        parentKey: 'settings',
        roles: [UserRolesEnum.SUPER_USER]
      }
    ]
  }
];

const Sidebar = () => {
  const [sidebarClosed, setSidebarClosed] = useState(false);

  const [submenuVisible, setSubmenuVisible] = useState(
    new Array(MENU_ITEMS.length).fill(false)
  );

  const handleSubmenuToggle = (index: number) => {
    setSubmenuVisible(prevVisibility =>
      prevVisibility.map((value, i) => (i === index ? !value : false))
    );
  };

  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarClosed(true);
    }
  }, []);

  const handleMouseEnter = () => {
    if (sidebarClosed) {
      setSidebarClosed(false);
    }
  };

  const handleMouseLeave = () => {
    if (sidebarClosed) {
      setSidebarClosed(true);
    }
  };

  const toggleSidebar = () => {
    setSidebarClosed(!sidebarClosed);
  };

  return (
    <>
      <nav className='navbar'>
        <div className='logo_item'>
          <img src='/vite.svg' alt='clinpays' />
          Clinpays
          <i
            className='bx bx-menu'
            id='sidebarOpen'
            onClick={toggleSidebar}
          ></i>
        </div>
        <div className='search_bar'>
          <input type='text' placeholder='Search' />
        </div>
        <div className='navbar_content'>
          <i className='bi bi-grid'></i>
          <i className='bx bx-sun' id='darkLight'></i>
          <i className='bx bx-bell'></i>
          <img src='/vite.svg' alt='' className='profile' />
        </div>
      </nav>

      <nav
        className={`sidebar ${sidebarClosed ? 'close' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className='menu_content'>
          <ul className='menu_items'>
            {MENU_ITEMS.map((menuItem, index) => (
              <li key={`${menuItem.key}_${index}`} className='item'>
                {menuItem.isTitle ? (
                  <div className='menu-title'>{menuItem.label}</div>
                ) : (
                  <div
                    className={`nav_link submenu_item ${
                      submenuVisible[index] ? 'show_submenu' : ''
                    }`}
                    onClick={() => handleSubmenuToggle(index)}
                  >
                    <span className='navlink_icon'>
                      <i className={menuItem.icon}></i>
                    </span>
                    <span className='navlink'>{menuItem.label}</span>
                    {menuItem.children && (
                      <i className='bx bx-chevron-right arrow-left'></i>
                    )}
                  </div>
                )}
                {menuItem.children && (
                  <ul className='menu_items submenu'>
                    {menuItem.children.map((subItem, subIndex) => (
                      <a
                        href={subItem.url}
                        key={subIndex}
                        className='nav_link sublink'
                      >
                        <span className='navlink_icon'>
                          <i className={menuItem.icon}></i>
                        </span>
                        <span className='navlink'>{subItem.label}</span>
                      </a>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className='bottom_content'>
          <div className='bottom expand_sidebar' onClick={toggleSidebar}>
            <span> Expand</span>
            <i className='bx bx-log-in'></i>
          </div>
          <div className='bottom collapse_sidebar' onClick={toggleSidebar}>
            <span> Collapse</span>
            <i className='bx bx-log-out'></i>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
