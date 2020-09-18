import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, Route, NavLink } from 'react-router-dom'
import Form from './Form'
import formSchema from './formSchema'
import Order from './Order'
import * as yup from 'yup'


const initialFormValues = {
  //text inputs
  orderName: '',
  instructions: '',

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
  size: ''
}

const initialOrder = []
const initialDisabled = true

const App = () => {
  const [orderBtn, setOrderBtn] = useState(false)
  const [orders, setOrders] = useState(initialOrder)          // array of orders objects
  const [formValues, setFormValues] = useState(initialFormValues) // object for values state
  const [formErrors, setFormErrors] = useState(initialFormErrors) // object for errors
  const [disabled, setDisabled] = useState(initialDisabled)       // boolean to enable submit button
  

  const postNewOrder = newOrder => {
    axios.post('https://reqres.in/api/user', newOrder)
      .then(good => {
        setOrders([...orders, good.data]) //adding newOrder to state
      })
      .catch(err => {
        console.log(err)
        debugger
      })

  }

  const inputChange = (name, value) => {
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
    const newOrder = {
      username: formValues.orderName.trim(),
      email: formValues.instructions.trim(),
      pepperoni: formValues.pepperoni,
      bacon: formValues.bacon,
      pineapple: formValues.pineapple,
      jalapeno: formValues.jalapeno,
    }

    // making a new order
    postNewOrder(newOrder)
  }

  useEffect(() => {
    //changes disabled everytime formValue changes
    formSchema.isValid(formValues)
      .then(valid => {
        setDisabled(!valid);
      })
  }, [formValues])

  function order() {
    setOrderBtn(!orderBtn)
  }

  return (
    <div className = "App">
    <header>
      <nav>
        <ul>
          <li><NavLink to={'./Form'} >order Pizza</NavLink></li>
          <li><NavLink to={'/'}>Home</NavLink></li>
        </ul>
        </nav>
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
            <Order details={orders} />
          }
        </div>
      </div>
  );
};
export default App;

 