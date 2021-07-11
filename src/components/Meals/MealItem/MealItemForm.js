import React, {useState} from 'react'

import classes from './MealItemForm.module.css'
import Input from '../../UI/Input'

const MealItemForm = (props) => {
    const [amount, setAmount] = useState(1)
    const [amountisValid, setAmountIsValid] = useState(true)

    const fetchAmountHandler = receivedAmt => {
        setAmount(receivedAmt);
    }

    const submitAmountHandler = (event) => {
        event.preventDefault()
        
        if(amount.length === 0 || amount < 1 || amount > 5) {
            setAmountIsValid(false)
            return;
        }
        props.onAddAmount(amount)
        console.log(amount)
    }

    return (
      <form className={classes.form} onSubmit={submitAmountHandler}>
        <Input
          label="Amount"
          input={{
            id: "amount",
            type: "number",
            min: "1",
            max: "5",
            step: "1",
            // defaultValue: '1',
          }}
          value={amount}
          onFetchAmount={fetchAmountHandler}
        />
        <button>+ Add</button>
        {!amountisValid && <p>Please enter a valid abount (1 - 5).</p>}
      </form>
    );
}

export default MealItemForm
