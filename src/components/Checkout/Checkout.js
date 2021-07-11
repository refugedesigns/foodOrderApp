
import classes from "./Checkout.module.css";
import Card from '../UI/Card'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

const schema = yup.object().shape({
  name: yup.string().required(),
  street: yup.string().matches(/^[#.0-9a-zA-Z\s,-]+$/).required(),
  postalCode: yup.number().positive().min(5).required(),
  city: yup.string().required()
});

const Checkout = (props) => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })
    
    const confirmHandler =  (data) => {
        props.onSubmit(data)
        reset()
    }

    return (
      <Card className={classes.checkout}>
        <form onSubmit={handleSubmit(confirmHandler)}>
          <div className={classes.formControl}>
            <div
              className={`${classes.control} ${errors.name && classes.invalid}`}
            >
              <label htmlFor="name">Your Name</label>
              <input {...register("name")} />
              <p>{errors.name?.message}</p>
            </div>
            <div
              className={`${classes.control} ${
                errors.street && classes.invalid
              }`}
            >
              <label htmlFor="street">Street</label>
              <input {...register("street")} />
              <p>{errors.street?.message}</p>
            </div>
            <div className={`${classes.control} ${errors.postalCode && classes.invalid}`}>
              <label htmlFor="postal">Postal Code</label>
              <input {...register("postalCode")} />
              <p>{errors.postalCode?.message}</p>
            </div>
            <div className={`${classes.control} ${errors.city && classes.invalid}`}>
              <label htmlFor="city">City</label>
              <input {...register("city")} />
              <p>{errors.city?.message}</p>
            </div>
            <div className={classes.actions}>
              <button type="button" onClick={props.onCancel}>
                Cancel
              </button>
              <button className={classes.submit}>Confirm</button>
            </div>
          </div>
        </form>
      </Card>
    );
};

export default Checkout;
