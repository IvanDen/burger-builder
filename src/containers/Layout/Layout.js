import React, {useState} from 'react';
import Aux from '../../hoc/Ayx/Ayx';
import classes from './Layout.module.css';
import {Toolbar} from "../../components/Navigation/ToolBar/ToolBar";
import {SideDrawer} from "../../components/Navigation/SideDrawer/SideDrawer";

const Layout = (props) => {
	const [layoutState, setLayoutState] = useState({
		showSideDrawer: false,
	});

	const sideDrawerClosedHandler = () => {
		setLayoutState({showSideDrawer: false});
	}

	const sideDrawerToggleHandler = () => {
		setLayoutState((prevState) => {
			return {showSideDrawer: !prevState.showSideDrawer};
		});
	}

	return (
		<Aux>
			<Toolbar drawerToggleClicked={sideDrawerToggleHandler} />
			<SideDrawer open={layoutState.showSideDrawer} closed={sideDrawerClosedHandler} />
			<main className={classes.content}>
				{props.children}
			</main>
		</Aux>
	);
};

export default Layout;
