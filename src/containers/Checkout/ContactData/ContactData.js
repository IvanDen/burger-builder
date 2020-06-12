import React, {Component, useState, useEffect} from 'react';
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css"
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import {Input} from "../../../components/UI/Input/Input";
import _ from 'lodash';

const ContactData = (props) => {
	const [contactData , setContactData] = useState({
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your ZIP code'
				},
				value: '',
				validation: {
					required: true,
					minLength: 6,
					maxLength: 6,
				},
				valid: false
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Email'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{value: 'fastest', displayValue: 'Fastest'},
						{value: 'cheapest', displayValue: 'Cheapest'}
					],
					config: {}
				},
				value: ''
			}
		},
		loading: false,
	});

	const orderHandler = (event) => {
		event.preventDefault();

		setContactData({
			...contactData,
			loading: true,
		});

		const formData = {}
		for (let formElementIdentifier in contactData.orderForm ) {
			formData[formElementIdentifier] = contactData.orderForm[formElementIdentifier].value;
		}

		const order = {
			ingredients: props.ingredients,
			price: props.price,
			orderData: formData,
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
	}

	const checkValidity = (value, rules) => {
		let isValid = false;
		if (rules.required) {
			isValid = value.trim() !== '';
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength;
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength;
		}

		return isValid;
	}

	const inputChangedHandler = (event, inputIdentifier) => {
		const updateOrderForm = _.clone(contactData.orderForm);
		updateOrderForm[inputIdentifier].value = event.target.value;
		updateOrderForm[inputIdentifier].valid = checkValidity(updateOrderForm[inputIdentifier].value, updateOrderForm[inputIdentifier].validation);

		setContactData({
			...contactData,
			orderForm: updateOrderForm
		});

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
				<form action="" onSubmit={orderHandler}>
					{formElementArray.map(formElement => (
						<Input
							key={formElement.id}
							elementType={formElement.config.elementType}
							elementConfig={formElement.config.elementConfig}
							value={formElement.config.value}
							changed={(event) => inputChangedHandler(event, formElement.id)}
						/>
					))}
					<Button btnType="Success" >ORDER</Button>
				</form>
			</div>
		);
	}
}

export default ContactData;
