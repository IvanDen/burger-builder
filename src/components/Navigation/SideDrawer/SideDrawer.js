import React from 'react';
import classes from './SideDrawer.module.css';
import {Logo} from "../../Logo/Logo";
import {NavigationItems} from "../Navigationitems/Navigationitems";

export const SideDrawer = (props) => {
	return (
		<div className={classes.SideDrawer}>
			<div className={classes.Logo}>
				<Logo/>
			</div>
			<nav>
				<NavigationItems/>
			</nav>
		</div>
	);
}
