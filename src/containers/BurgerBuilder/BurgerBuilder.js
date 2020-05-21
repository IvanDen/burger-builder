import React, {useState, useEffect} from 'react';
import Aux from "../../hoc/Ayx/Ayx";
import {Burger} from "../../components/Burger/Burger";
import {BuildControls} from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
	salad: 0.6,
	bacon: 0.7,
	cheese: 0.3,
	meat: 1.5,
};

const BurgerBuilder = (props) => {

	const [builderState, setBuilderState] = useState({
			ingredients: null,
			totalPrice: 3,
			purchasable: false,
			purchasing: false,
			loading: false,
			error: false,
		});

	useEffect(() => {
		axios.get('https://react-burger-d6a26.firebaseio.com/ingredients.json')
			.then(response => {
				setBuilderState({
					...builderState,
					ingredients: response.data,
				});
			})
			.catch(error => {
				setBuilderState({
					...builderState,
					error: true,
				});
			});
	}, []);

	const updatePurchaseState = ( ingredients ) => {
		const sum = Object.keys( ingredients )
			.map( igKey => {
				return ingredients[igKey];
			} )
			.reduce( ( sum, el ) => {
				return sum + el;
			}, 0 );
		return sum > 0;
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
		const isPurchasable = updatePurchaseState(updateIngredients);
		setBuilderState({
			...builderState,
			totalPrice: newPrice,
			ingredients: updateIngredients,
			purchasable: isPurchasable,
		});
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
		updatePurchaseState(updateIngredients);
		const isPurchasable = updatePurchaseState(updateIngredients);
		setBuilderState({
			...builderState,
			totalPrice: newPrice,
			ingredients: updateIngredients,
			purchasable: isPurchasable,
		});
	}

	const purchaseHandler = () => {
		setBuilderState( {
			...builderState,
			purchasing: true ,
		} );
	}

	const purchaseCancelHandler = () => {
		setBuilderState( {
			...builderState,
			purchasing: false
		} );
	}

	const purchaseContinueHandler = () => {

		// setBuilderState({
		// 	...builderState,
		// 	loading: true,
		// });
		//
		// const order = {
		// 	ingredients: builderState.ingredients,
		// 	price: builderState.totalPrice,
		// 	customer: {
		// 		name: 'Ivan Den',
		// 		address: {
		// 			street: 'Teststreet 11',
		// 			zipCode: '22334',
		// 			country: 'Russia',
		// 		},
		// 		email: 'test@test.com',
		// 	},
		// 	deliveryMethod: 'fastest'
		// }
		// axios.post('/orders.json', order)
		// 	.then(response => {
		// 		setBuilderState({
		// 			...builderState,
		// 			loading: false,
		// 			purchasing: false,
		// 		});
		// 	})
		// 	.catch(error => {
		// 		setBuilderState({
		// 			...builderState,
		// 			loading: false,
		// 			purchasing: false,
		// 		});
		// 	});
		props.history.push('/checkout');
	}

	const disabledInfo = {
		...builderState.ingredients
	}

	for (let key in disabledInfo) {
		disabledInfo[key] = disabledInfo[key] <= 0;
	}
	let noteErrorMassage = (
		<div
			style={{margin: 'auto',	alignContent: 'center'}}>
			<p>Ingredients can't be loaded!</p>
		</div>
	);
	let orderSummary = null;
	let burger = builderState.error ? noteErrorMassage : <Spinner/>;

	if (builderState.ingredients) {
		burger = (
			<Aux>
				<Burger ingredients={builderState.ingredients} />
				<BuildControls
					ingreidientAdded={addIngredientHandler}
					ingreidientRemoved={removeIngredientHandler}
					disabled={disabledInfo}
					price={builderState.totalPrice}
					purchasable={builderState.purchasable}
					ordered={purchaseHandler}
				/>
			</Aux>
		);
		orderSummary = <OrderSummary
			ingredients={builderState.ingredients}
			price={builderState.totalPrice}
			purchaseCancelled={purchaseCancelHandler}
			purchaseContinued={purchaseContinueHandler}
		/>;
	}
	if (builderState.loading) {
		orderSummary = <Spinner />;
	}

	return (
		<Aux>
			<Aux>
				<Modal show={builderState.purchasing} modalClosed={purchaseCancelHandler}>
					{orderSummary}
				</Modal>
			</Aux>
			{burger}
		</Aux>
	);

}

export default WithErrorHandler(BurgerBuilder, axios);

