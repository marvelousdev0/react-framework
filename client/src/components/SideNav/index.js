/* eslint-disable no-lone-blocks */
import React from 'react';
import clsx from 'clsx';
import { useLocation, useHistory } from 'react-router-dom';
import { Drawer, Box, List, Toolbar, Typography, Collapse, Avatar, Chip, Tooltip } from '@material-ui/core';
import { blue, red, green } from '@material-ui/core/colors';
import { Home } from '@styled-icons/feather/Home';
import { Info } from '@styled-icons/feather/Info';
import { Smartphone } from '@styled-icons/feather/Smartphone';
import { Settings } from '@styled-icons/feather/Settings';
import { Mail } from '@styled-icons/feather/Mail';
import { PhoneCall } from '@styled-icons/feather/PhoneCall';
import { User } from '@styled-icons/feather/User';
import { LogOut } from '@styled-icons/feather/LogOut';
import logo from 'static/logos/logo.svg';
import userImg from 'static/icons/user.svg';
import NavItem from '../NavItem';
import sideNavStyles from './style';
import StyledBadge from 'components/StyledBadge';

function SideNav({ open, user, handleSideNav }) {
  const { pathname } = useLocation();
  const history = useHistory();

  const [openSub, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!openSub);
  };

  const classes = sideNavStyles({ open });
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx(classes.paper, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <Toolbar className={classes.drawerToolbar}>
        <Box display="flex" alignItems="center">
          <img src={logo} style={{ height: 40, width: 56 }} alt="app-logo" />
          <Typography className={classes.appTitle}>Project Name</Typography>
        </Box>
      </Toolbar>
      <div className={classes.userContainer}>
        <StyledBadge
          overlap="circle"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          variant="dot"
        >
          <Avatar src={userImg} className={classes.avatar} />
        </StyledBadge>
        <Box width={168} display="flex" flexDirection="column" pl={2}>
          <Tooltip title="User" arrow placement="top-start">
            <Typography style={{ fontSize: 14 }} noWrap>
              Hi, User
            </Typography>
          </Tooltip>
          <Box className={classes.userActionsContainer}>
            <Tooltip title="Settings" arrow placement="bottom">
              <Settings
                style={{ height: 16, width: 16, cursor: 'pointer' }}
                onClick={() => {
                  history.push('/settings');
                }}
              />
            </Tooltip>
            <User style={{ height: 16, width: 16 }} />
            <LogOut style={{ height: 16, width: 16 }} />
          </Box>
        </Box>
      </div>
      <div className={classes.versionWrapper}>
        <Chip variant="outlined" color="secondary" label={!open ? '1.0' : 'Version 1.0'} />
      </div>
      <Box className={classes.drawerContainer}>
        <List component="nav" className={classes.list}>
          <NavItem
            label="Home"
            to="/"
            icon={<Home style={{ height: 24, width: 24 }} />}
            alt="home"
            active={pathname === '/'}
            background={blue}
            handleSideNav={handleSideNav}
          />
          <NavItem
            label="About"
            to="/about"
            icon={<Info style={{ height: 24, width: 24 }} />}
            alt="about"
            active={pathname === '/about'}
            background={red}
            handleSideNav={handleSideNav}
          />
          <NavItem
            label="Contact"
            icon={<Smartphone style={{ height: 24, width: 24 }} />}
            alt="contact"
            active={pathname.split('/').includes('contact')}
            background={green}
            open={open}
            hasSubMenu={true}
            expanded={openSub}
            onClick={handleClick}
            handleSideNav={handleSideNav}
          />
          <Collapse in={openSub} timeout="auto" unmountOnExit classes={{ wrapper: classes.collapseWrapper }}>
            <List component="nav" style={{ paddingTop: 0, paddingBottom: 0 }}>
              <NavItem
                label="Email"
                to="/contact/email"
                icon={<Mail style={{ height: 18, width: 18 }} />}
                alt="email"
                active={pathname === '/contact/email'}
                background={green}
                handleSideNav={handleSideNav}
                subMenu={true}
              />
              <NavItem
                label="Phone"
                to="/contact/phone"
                icon={<PhoneCall style={{ height: 18, width: 18 }} />}
                alt="phone"
                active={pathname === '/contact/phone'}
                background={green}
                handleSideNav={handleSideNav}
                subMenu={true}
              />
            </List>
          </Collapse>
        </List>
      </Box>
    </Drawer>
  );
}

export default SideNav;

{
  /* <div className={classes.action}>
  <IconButton color="primary" aria-label="open side nav" onClick={handleSideNav}>
    {open ? <ChevronsLeft style={{ height: 20, width: 20 }} /> : <ChevronsRight style={{ height: 20, width: 20 }} />}
  </IconButton>
</div>; */
}
