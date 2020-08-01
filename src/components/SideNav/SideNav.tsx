import React, { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import './SideNav.scss';

export function SideNav(): ReactElement
{
    return (
    <nav className='main-menu'>
        <h1>Fin Track</h1>
        <ul className='menu-sections'>
            <li>
                <span className='menu-title'>Administration</span>
                <ul>
                    <li className='menu-item'><NavLink activeClassName='selected' to='/admin/banks'> <i className='ms-Icon ms-Icon--Bank'/> Bank </NavLink></li>
                    <li className='menu-item'><NavLink activeClassName='selected' to='/admin/rules'> <i className='ms-Icon ms-Icon--Match'/> Rules </NavLink></li>
                </ul>
            </li>

            <li>
                <span className='menu-title'>Data Entry</span>
                <ul>
                    <li className='menu-item'><NavLink activeClassName='selected' to='/entry/csv'> <i className='ms-Icon ms-Icon--Import'/> Import From CSV </NavLink></li>
                    <li className='menu-item'><NavLink activeClassName='selected' to='/entry/manual'> <i className='ms-Icon ms-Icon--Manual'/> Manual Entry </NavLink></li>
                </ul>
            </li>

            <li>
                <span className='menu-title'>Reports</span>
                <ul>
                    <li className='menu-item'><NavLink activeClassName='selected' to='/reports/totals'> <i className='ms-Icon ms-Icon--Report'/> Totals </NavLink></li>
                    <li className='menu-item'><NavLink activeClassName='selected' to='/reports/monthly'> <i className='ms-Icon ms-Icon--Report'/> Monthly </NavLink></li>
                </ul>
            </li>
        </ul>
    </nav>
    );
}
