import React from 'react';
import classes from './Order.module.css'

const Order = (props) => {

	return (
		<div className={classes.Order}>
			<p>Ingredients: Salad</p>
			<p>Prise: <strong>USD 5.33</strong></p>>
		</div>
	);
}

export default Order;
