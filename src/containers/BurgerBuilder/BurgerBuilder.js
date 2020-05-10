import React, {useState} from 'react';
import Aux from "../../hoc/Ayx/Ayx";
import {Burger} from "../../components/Burger/Burger";
import {BuildControls} from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
	salad: 0.6,
	bacon: 0.7,
	cheese: 0.3,
	meat: 1.5,
};

export const BurgerBuilder = (props) => {


	const [builderState, setBuilderState] = useState({
			ingredients: {
				salad: 0,
				bacon: 0,
				cheese: 0,
				meat: 0,
			},
			totalPrice: 3,
		});
	const [purchaseState, setPurchaseState] = useState({
		purchasable: false,
		purchasing: false,
	});

	const updatePurchaseState = ( ingredients ) => {
		const sum = Object.keys( ingredients )
			.map( igKey => {
				return ingredients[igKey];
			} )
			.reduce( ( sum, el ) => {
				return sum + el;
			}, 0 );
		setPurchaseState( {
			...purchaseState,
			purchasable: sum > 0 }
		);
	}


	const addIngredientHandler = (type) => {
		const oldCount = builderState.ingredients[type];
		const updateCount = oldCount + 1;
		const updateIngredients = {
			...builderState.ingredients,
		};
		updateIngredients[type] = updateCount;
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = builderState.totalPrice;
		const newPrice = oldPrice + priceAddition;
		setBuilderState({
			totalPrice: newPrice,
			ingredients: updateIngredients,
		});
		updatePurchaseState(updateIngredients);
	}

	const removeIngredientHandler = (type) => {
		const oldCount = builderState.ingredients[type];
		if (oldCount <= 0 ) return;
		const updateCount = oldCount - 1;
		const updateIngredients = {
			...builderState.ingredients,
		};
		updateIngredients[type] = updateCount;
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = builderState.totalPrice;
		const newPrice = oldPrice - priceAddition;
		setBuilderState({
			totalPrice: newPrice,
			ingredients: updateIngredients,
		});
		updatePurchaseState(updateIngredients);
	}

	const purchaseHandler = () => {
		setPurchaseState( {
			...purchaseState,
			purchasing: true ,
		} );
	}

	const purchaseCancelHandler = () => {
		setPurchaseState( {
			...purchaseState,
			purchasing: false
		} );
	}

	const purchaseContinueHandler = async () => {
		const order = {
			ingredients: builderState.ingredients,
			price: builderState.totalPrice,
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
		let response = await axios.post('/orders.json', order);
		if (response.reject) {
			console.log(response.reject);
		}
		else {
			console.log(response);
		}
		// await axios.post('/orders.json', order)
		// 	.then(response => console.log(response))
		// 	.catch(error => console.log(error));
	}

	const disabledInfo = {
		...builderState.ingredients
	}

	for (let key in disabledInfo) {
		disabledInfo[key] = disabledInfo[key] <= 0;
	}

	return (
		<Aux>
			<Aux>
				<Modal show={purchaseState.purchasing} modalClosed={purchaseCancelHandler}>
					<OrderSummary
						ingredients={builderState.ingredients}
						price={builderState.totalPrice}
						purchaseCancelled={purchaseCancelHandler}
						purchaseContinued={purchaseContinueHandler}
					/>;
				</Modal>
			</Aux>
			<Burger ingredients={builderState.ingredients} />
			<BuildControls
				ingreidientAdded={addIngredientHandler}
				ingreidientRemoved={removeIngredientHandler}
				disabled={disabledInfo}
				price={builderState.totalPrice}
				purchasable={purchaseState.purchasable}
				ordered={purchaseHandler}
			/>
		</Aux>
	);

}
