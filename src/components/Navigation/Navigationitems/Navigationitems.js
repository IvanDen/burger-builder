import React from 'react';
import classes from './NavigationItems.module.css';
import {NavigationItem} from "./Navigationitem/Navigationitem";

export const NavigationItems = (props) => {
	return (
		<ul className={classes.NavigationItems}>
			<NavigationItem link="/" active>Burger Builder</NavigationItem>
			<NavigationItem link="/" >Checkout</NavigationItem>
		</ul>
	);
}
