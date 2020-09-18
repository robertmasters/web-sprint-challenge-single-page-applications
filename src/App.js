import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Route, Link } from 'react-router-dom'
import Form from './Form'
import formSchema from './formSchema'
import Order from './Order'
import * as yup from 'yup'


const initialFormValues ={
  //setting up initial text inputs default value
  orderName: '',
  insturctions: '',

  //topping checkboxes
  pepperoni: false,
  bacon: false,
  pineapple: false,
  jalapeno: false,

  //dropdown
  size: ''
}

const initialFormErrors = {
  orderName: '',
  size: '',
}

const initialOrder = []
const initialDisabled = true

const App = () => {

  const [orders, setOrders] = useState(initialOrder)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

  const postNewOrder = newOrder => {
    axios.post('https://reqres.in/api/orders', newOrder)
      .then(good => {
        setOrders([...orders, good.data]) //adding newOrder to state
      })
      .catch(err => {
        console.log(err)
        debugger
      })
      .finally(() => { //form resets regardless of success or failure
        setFormValues(initialFormValues)
      })
  }

  const inputChange = (name, value) =>{
    //  validation with yup
    yup
      .reach(formSchema, name)
      //validate using the value
      .validate(value)
      // if the validation is successful, error message is cleared
      .then(valid => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        })
      })
      // if the validation is unsuccessful, return error message set up in formSchema
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        })
      })

    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const checkboxChange = (name, isChecked) => {
    //new state for the whole form
    setFormValues({
      ...formValues,
      [name]: isChecked
    })
  }

  const submit = () => {
    const newOrder ={
      orderName: formValues.orderName.trim(),
      instructions: formValues.instructions.trim(),
      pepperoni: formValues.pepperoni,
      bacon: formValues.bacon,
      pineapple: formValues.pineapple,
      jalapeno: formValues.jalapeno,
      size: formValues.size
    }
    //making a new order
    postNewOrder(newOrder)
  }

  useEffect(() => {
    //change disabled everytime formValue changes
    formSchema.isValid(formValues)
    .then(valid => {
      setDisabled(!valid);
    })
  }, [formValues])

  return (
    <div className = "App">
    <header>
      <div>
          
            <div><Link to={'./Form'} >order Pizza</Link></div>
            <div><Link to={'/'}>Home</Link></div>
         
        </div>

      <Route exact path= '/'>
        <App  />
      </Route>

        <Route path='./Form'>
          <Form />
        </Route>

        </header>
    
        <div className="Order-component">
          <Form
          values={formValues}
          inputChange={inputChange}
          checkboxChange={checkboxChange}
          submit={submit}
          disabled={disabled}
          errors={formErrors}
          />
        </div>

        <div className="Order-Container">
          {
            <Order info={orders} />
          }
        </div>
      </div>
  );
};
export default App;
