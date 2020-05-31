import React, {Component, useState, useEffect} from 'react';
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css"
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";

const ContactData = (props) => {
	const [contactData , setContactData] = useState({
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: '',
		},
		loading: false,
	});

	const orderHandler = (event) => {

		setContactData({
			...contactData,
			loading: true,
		});

		const order = {
			ingredients: props.ingredients,
			price: props.price,
			customer: {
				name: 'Ivan Den',
				address: {
					street: 'Teststreet 11',
					zipCode: '22334',
					country: 'Russia',
				},
				email: 'test@test.com',
			},
			deliveryMethod: 'fastest'
		}
		axios.post('/orders.json', order)
			.then(response => {
				setContactData({
					...contactData,
					loading: false,
				});
				props.history.push('/');
			})
			.catch(error => {
				setContactData({
					...contactData,
					loading: false,
				});
			});
		event.preventDefault();
	}

	if (contactData.loading) {
		return <Spinner />
	}
	else {
		return (
			<div className={classes.ContactData}>
				<h4>Enter your contact data</h4>
				<form action="">
					<input className={classes.Input} type="text" name="name" placeholder="Your Name" />
					<input className={classes.Input} type="email" name="email" placeholder="Your Mail" />
					<input className={classes.Input} type="text" name="street" placeholder="Street" />
					<input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
					<Button btnType="Success" clicked={orderHandler}>ORDER</Button>
				</form>
			</div>
		);
	}
}

export default ContactData;
