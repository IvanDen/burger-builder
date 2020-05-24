import React, {Component, useState, useEffect} from 'react';
import {Burger} from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from './CheckoutSummary.module.css';



const CheckoutSummary = (props) => {
	return(
		<div className={classes.CheckoutSummary}>
			<h1>We hope it tastes well!</h1>
			<div style={{width: '100%'}}>
				<Burger ingredients={props.ingredients}/>
			</div>
			<div>
				<Button btnType="Danger"
						clicked={props.checkoutCancelled}>CANCEL</Button>
				<Button btnType="Success"
						clicked={props.checkoutContinued}>CONTINUE</Button>
			</div>
		</div>
	)
}

export default CheckoutSummary;
