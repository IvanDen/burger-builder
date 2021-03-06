import React from 'react';
import classes from './SideDrawer.module.css';
import {Logo} from "../../Logo/Logo";
import {NavigationItems} from "../Navigationitems/Navigationitems";
import { Backdrop } from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Ayx/Ayx";

export const SideDrawer = (props) => {

	let attachedClasses = [classes.SideDrawer, classes.Close];
	if (props.open) {
		attachedClasses = [classes.SideDrawer, classes.Open]
	}
	return (
		<Aux>
			<Backdrop show={props.open} clicked={props.closed} />
			<div className={attachedClasses.join(' ')}>
				<div className={classes.Logo}>
					<Logo/>
				</div>
				<nav>
					<NavigationItems/>
				</nav>
			</div>
		</Aux>
	);
}
