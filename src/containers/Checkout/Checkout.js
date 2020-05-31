import React, {Component, useState, useEffect} from 'react';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Route} from "react-router-dom";
import ContactData from "./ContactData/ContactData";

const Checkout = (props) => {



	// const [queryParams, setQuery] = useState(props.location.search);

	// getIngredientsFromURL(props.location.search);

	const getIngredientsFromURL = (search) => {
		const query = new URLSearchParams(search);
		const ingredients = {};
		let price = 0;
		for (let param of query.entries()) {
			if(param[0] === 'price') {
				price = param[1];
			}
			else {
				ingredients[param[0]] = +param[1];
			}
		}
		return [ingredients, price]
	}

	const [checkout, setCheckout] = useState({
		ingredients: getIngredientsFromURL(props.location.search)[0],
		totalPrice: getIngredientsFromURL(props.location.search)[1],
	});

	const checkoutCancelledHandler = () => {
		props.history.goBack();
	}

	const checkoutContinuedHandler = () => {
		props.history.replace('/checkout/contact-data');
	}

	return (
		<>
			<CheckoutSummary
				ingredients={checkout.ingredients}
				checkoutCancelled={checkoutCancelledHandler}
				checkoutContinued={checkoutContinuedHandler}
			/>
			<Route
				path={props.match.path + '/contact-data'}
				render={(props) => (
					<ContactData
						ingredients={checkout.ingredients}
						price={checkout.totalPrice}
						{...props}
					/>
				)} />
		</>
	);
}

export default Checkout;
