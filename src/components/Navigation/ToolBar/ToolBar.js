import React from 'react';
import classes from './Toolbar.module.css';
import {Logo} from "../../Logo/Logo";
import {NavigationItems} from "../Navigationitems/Navigationitems";
import {DrawerToggle} from "../SideDrawer/DrawerToggle/DrawerToggle";


export const Toolbar = (props) => (
	<header className={classes.Toolbar}>
		<DrawerToggle clicked={props.drawerToggleClicked} />
		<div className={classes.Logo}>
			<Logo />
		</div>
		<nav className={classes.DesktopOnly}>
			<NavigationItems />
		</nav>
	</header>
);
