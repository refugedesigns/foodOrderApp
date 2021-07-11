import React, { useState, useEffect } from 'react'
import axios from '../../utils/axios'

import classes from './AvailableMeals.module.css'
import Card from '../UI/Card'
import MealItem from '../Meals/MealItem/MealItem'

const AvailableMeals = () => {
 const [meals, setMeals] = useState([])
 const [loading, setLoading] = useState(false)
 const [error, setError] = useState()
  useEffect(() => {
    fetchMeals()
  }, [])

  async function fetchMeals() {

    try {
      setLoading(true);
      const response = await axios.get("meals.json");
      console.log(response.data);
      setMeals(response.data);
      setLoading(false);
    } catch(error) {
      setError(error)
      setLoading(false)
    }
    

  }
  let content;
  if(meals.length > 0) {
    content = (
      <ul>
        {meals.map((meal) => (
          <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
          />
        ))}
      </ul>
    );
  }
  if(loading) {
    content = <p style={{textAlign: 'center'}}>Loading...</p>
  }
  if(error) {
    content = <p style={{ textAlign: "center" }}>{error.message}</p>;
  }
    return (
      <section className={classes.meals}>
        <Card>
          {content}
        </Card>
      </section>
    );
}

export default AvailableMeals
