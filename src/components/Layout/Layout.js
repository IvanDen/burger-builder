import React from 'react';
import Aux from '../../hoc/Ayx';
import classes from './Layout.module.css';
import {Toolbar} from "../Navigation/ToolBar/ToolBar";
import {SideDrawer} from "../Navigation/SideDrawer/SideDrawer";
const Layout = (props) => (
	<Aux>
		<Toolbar />
		<SideDrawer />
		<main className={classes.content}>
			<div>Toolbar, SideDrawer, Backdrop</div>
			{props.children}
		</main>
	</Aux>
);

export default Layout;
