import React from 'react';
import classes from "./Input.module.css";

export const Input = (props) => {

	let inputElement = null;

	switch (props.elementType) {
		case('input'):
			inputElement = <input
				className={classes.InputElement}
				{...props.elementConfig}
				value={props.value}/>;
			break;
		case('textarea'):
			inputElement = <textarea
				className={classes.InputElement}
				{...props.elementConfig}
				value={props.value}/>;
			break;
		default:
			inputElement = <input
				className={classes.InputElement}
				{...props.elementConfig}
				value={props.value}/>;
	}


	return (
		<div className={classes.InputWrap} >
			<label className={classes.Label} >{props.lable}</label>
			{inputElement}
		</div>
	);
}
