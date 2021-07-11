import React, {useContext, useEffect, useState} from 'react';

import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import CartContext from '../../store/cart-context'

const HeaderCartButton = (props) => {
    const[bump, setBump] = useState(false)
    const cartCtx = useContext(CartContext)
    const {items} = cartCtx

    const totalNumberOfItems = items.reduce((currentNum, item) => {
        return currentNum + item.amount
    } , 0)

    useEffect(() => {
      if(items.length === 0) {
        return
      }
      setBump(true)
      const timer = setTimeout(() => {
        setBump(false)
      }, 300)
      return () => {
        clearTimeout(timer)
      }
    }, [items])

    const btnClasses = `${classes.button} ${bump ? classes.bump : ""}`;
    return (
      <button className={btnClasses} onClick={props.onOrder}>
        <span className={classes.icon}>
          <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{totalNumberOfItems}</span>
      </button>
    );
}

export default HeaderCartButton
