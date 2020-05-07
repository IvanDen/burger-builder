import React, { useEffect } from 'react';

import Aux from '../../../hoc/Ayx/Ayx';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {

    useEffect(() => {
        console.log('useEffect Run');
    }, []);


    const ingredientSummary = Object.keys( props.ingredients )
        .map( igKey => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>
                        {igKey}
                    </span>: {props.ingredients[igKey]}
                </li>);
        } );
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>
                <strong>Total Price: {props.price.toFixed( 2 )}</strong>
            </p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    );
    
}

export default OrderSummary;
