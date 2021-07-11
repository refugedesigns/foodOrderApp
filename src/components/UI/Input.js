import React from 'react'

import classes from './Input.module.css'

const Input = (props) => {
    const getAmountHandler = event => {
        props.onFetchAmount(event.target.value)
    }
    return (
        <div className={classes.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input onChange={getAmountHandler} {...props.input} value={props.value}/>
        </div>
    )
}

export default Input
