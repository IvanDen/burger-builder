import React, {useState} from 'react';
import classes from './Spinner.module.css';

const Spinner = () => (
	<div className={classes.LoaderWrap}>
		<div className={classes.Loader}>Loading...</div>
	</div>

)

export default Spinner;
