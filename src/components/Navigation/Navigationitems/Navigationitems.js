import React from 'react';
import classes from './NavigationItems.module.css';
import {NavigationItem} from "./Navigationitem/Navigationitem";

export const NavigationItems = (props) => {
	return (
		<ul className={classes.NavigationItems}>
			<NavigationItem link="/" exact >Burger Builder</NavigationItem>
			<NavigationItem link="/orders" >Orders</NavigationItem>
		</ul>
	);
}
