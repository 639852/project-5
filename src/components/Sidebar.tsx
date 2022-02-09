/** @jsxImportSource @emotion/react */
import { Drawer } from '@mui/material';
import { ConfirmationNumber, ExitToApp, PieChart } from '@mui/icons-material';
import { Outlet } from 'react-router-dom';
import { logoStyles, sidebarItemStyles, sidebarStyles } from '../style';
import SidebarItem from './SidebarItem';

function Sidebar() {
  return (
    <>
      <Drawer css={sidebarStyles} variant="permanent" anchor="left">
        <div css={logoStyles}>
          <img src="../img/logo.svg" alt="Logo" />
          <h2>Dashboard Kit</h2>
        </div>
        <SidebarItem
          className="active"
          styles={sidebarItemStyles}
          icon={<PieChart />}
          text="Dashboard"
        />
        <SidebarItem
          styles={sidebarItemStyles}
          icon={<ConfirmationNumber />}
          text="Tickets"
        />
        <SidebarItem
          styles={sidebarItemStyles}
          icon={<ExitToApp />}
          text="Exit"
          exit
        />
      </Drawer>

      <Outlet />
    </>
  );
}

export default Sidebar;
