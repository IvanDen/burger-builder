import React from 'react';
import Aux from "../../hoc/Ayx";
import {Burger} from "../../components/Bourger/Burger";
import {BuildControls} from "../../components/Bourger/BuildControls/BuildControls";

const INGREDIENT_PRICES = {
	salad: 0.6,
	bacon: 0.7,
	cheese: 0.3,
	meat: 1.5,
};

export class BurgerBuilder extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			ingredients: {
				salad: 0,
				bacon: 0,
				cheese: 0,
				meat: 0,
			},
			totalPrice: 3,
		};
	}



	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updateCount = oldCount + 1;
		const updateIngredients = {
			...this.state.ingredients,
		};
		updateIngredients[type] = updateCount;
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;
		this.setState({
			totalPrice: newPrice,
			ingredients: updateIngredients,

		})
	};

	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		if (oldCount <= 0 ) return;
		const updateCount = oldCount - 1;
		const updateIngredients = {
			...this.state.ingredients,
		};
		updateIngredients[type] = updateCount;
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceAddition;
		this.setState({
			totalPrice: newPrice,
			ingredients: updateIngredients,
		})
	};

	render () {
		const disabledInfo = {
			...this.state.ingredients
		};

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		return (
			<Aux>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls
					ingreidientAdded={this.addIngredientHandler}
					ingreidientRemoved={this.removeIngredientHandler}
					disabled={disabledInfo}
					price={this.state.totalPrice}
				/>
			</Aux>
		);
	}
}
