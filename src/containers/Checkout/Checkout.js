import React, {Component, useState, useEffect} from 'react';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

const Checkout = (props) => {

	const [checkout, setCheckout] = useState({
		ingredients: {
			salad: 1,
			bacon: 1,
			cheese: 1,
			meat: 1,
		},
	});

	return (
		<>
			<CheckoutSummary ingredients={checkout.ingredients} />
		</>
	);
}

export default Checkout;
