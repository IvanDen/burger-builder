import React, {Component, useState, useEffect} from 'react';
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css"
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import {Input} from "../../../components/UI/Input/Input";

const ContactData = (props) => {
	const [contactData , setContactData] = useState({
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name'
				},
				value: ''
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street'
				},
				value: ''
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your ZIP code'
				},
				value: ''
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country'
				},
				value: ''
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Email'
				},
				value: ''
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{value: 'fastest', displayValue: 'Fastest'},
						{value: 'cheapest', displayValue: 'Cheapest'}
					]
				},
				value: ''
			}

			// name: 'Ivan Den',
			// street: 'Teststreet 11',
			// zipCode: '22334',
			// country: 'Russia',
			// email: 'test@test.com',
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

	const formElementArray = [];
	for (let key in contactData.orderForm) {
		formElementArray.push({
			id: key,
			config: contactData.orderForm[key],
		})
	}

	if (contactData.loading) {
		return <Spinner />
	}
	else {
		return (
			<div className={classes.ContactData}>
				<h4>Enter your contact data</h4>
				<form action="">
					{formElementArray.map(formElement => (
						<Input
							key={formElement.id}
							elementType={formElement.config.elementType}
							elementConfig={formElement.config.elementConfig}
							value={formElement.config.value}/>
					))}
					<Button btnType="Success" clicked={orderHandler}>ORDER</Button>
				</form>
			</div>
		);
	}
}

export default ContactData;
