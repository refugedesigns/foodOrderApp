import React, { useContext, useState } from "react";

import axios from "../../utils/axios";

import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "../Checkout/Checkout";

const Cart = (props) => {
  const [showOrderForm, setShowOrderForm] = useState(true);
  const [ordered, setOrdered] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cancelOrderHandler = () => {
    cartCtx.clearCart();
  };

  const orderHandler = () => {
    setOrdered(true);
    setShowOrderForm(false);
  };
  const orderSubmitHandler = async (data) => {
    const order = {
      items: cartCtx.items,
      totalAmount: cartCtx.totalAmount,
      userData: data,
    };
    setSubmitting(true);
    const response = await axios.post("orders.json", order);
    setSubmitting(false);
    if (response.statusText === "OK") {
      cartCtx.clearCart();
      setSubmitted(true);
    }
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={+item.price}
          amount={item.amount}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  let cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {hasItems && ordered && (
        <Checkout
          onSubmit={orderSubmitHandler}
          onCloseModal={props.onCloseModal}
          onCancel={cancelOrderHandler}
        />
      )}

      <div className={classes.actions}>
        {!hasItems && (
          <button
            className={classes["button--alt"]}
            onClick={props.onCloseModal}
          >
            Close
          </button>
        )}
        {hasItems && showOrderForm && (
          <button className={classes.button} onClick={orderHandler}>
            Order
          </button>
        )}
      </div>
    </React.Fragment>
  );

  if (submitting) {
    cartModalContent = <p>Sending order data...</p>;
  }

  if (submitted) {
    cartModalContent = (
      <React.Fragment>
        <p>Order successfully sent!</p>
        <div className={classes.actions}>
          <button className={classes.button} onClick={props.onCloseModal}>
            Close
          </button>
        </div>
      </React.Fragment>
    );
  }
  return <Modal onCloseModal={props.onCloseModal}>{cartModalContent}</Modal>;
};

export default Cart;
