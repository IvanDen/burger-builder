import React, {useEffect, useState} from 'react';
import Order from "../../components/Order/Order";
import axois from '../../axios-orders';
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const Orders = (props) => {

	const [ordersState, setOrders] = useState({
		orders: [],
		loading: true
	});
	useEffect(() => {
		axois.get('/orders.json')
			.then(res => {
				const fetchedOrders = [];
				for (let key in res.data) {
					fetchedOrders.push({
						...res.data[key],
						id: key
					});
				}
				setOrders({orders: fetchedOrders,	loading: false});
			})
			.catch(err => {
				setOrders({...ordersState,	loading: false});
			});
	}, []);

	return (
		<div>
			{ordersState.orders.map(order => (
				<Order
					key={order.id}
					ingredients={order.ingredients}
					price={order.price}
				/>
			))}
		</div>
	);
}

export default WithErrorHandler(Orders, axois);
