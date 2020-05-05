import React, {useState} from 'react';
import Aux from '../../hoc/Ayx';
import classes from './Layout.module.css';
import {Toolbar} from "../Navigation/ToolBar/ToolBar";
import {SideDrawer} from "../Navigation/SideDrawer/SideDrawer";
const Layout = (props) => {
	const [layoutState, setLayoutState] = useState({
		showSideDrawer: true,
	});

	const sideDrawerClosedHandler = () => {
		setLayoutState({
			showSideDrawer: false,
		});
	}

	return (
		<Aux>
			<Toolbar/>
			<SideDrawer open={layoutState.showSideDrawer} closed={sideDrawerClosedHandler} />
			<main className={classes.content}>
				<div>Toolbar, SideDrawer, Backdrop</div>
				{props.children}
			</main>
		</Aux>
	);
};

export default Layout;
