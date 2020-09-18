
import React from 'react'

export default function PizzaOrder(props){

    const {
        values,
        submit,
        inputChange,
        checkboxChange,
        disabled,
        errors,
    } = props


    const onInputChange = evt => {
        const { name, value } = evt.target
        inputChange(name, value)
      }
    
    const onCheckboxChange = evt => {
        const { name, checked } = evt.target
        checkboxChange(name, checked)
      }

    const onSubmit = evt => {
        evt.preventDefault()
        submit()
    }

    return (
        <form className = 'form-container' onSubmit = {onSubmit}>
        <div className = 'submit-btn'>
                <button id = 'submitOrderBtn' disabled = {disabled} >submit order</button>
            </div>

            <div className='errors'>
                {/* 2 validation errors */}
                <div>{errors.orderName}</div>
                <div>{errors.size}</div>
            </div>

            <div className = 'order-details-text-input'>

                        <label>OrderName:
                            <input 
                            value = {values.orderName}
                            onChange={onInputChange}
                            name='orderName'
                            placeholder='Name'
                            minLength='2'
                            type='text'
                            />

                            </label>
                            <label>Special Instructions:
                            <input 
                            value = {values.OrderName}
                            onChange={onInputChange}
                            name='instructions'
                            placeholder='special instructions'
                            minLength=''
                            type='text'
                            />
                        </label>

                        <label> Pizza size: 
                            <select onChange ={onInputChange} value ={values.size} name="size">
                                <option value="">Select Pizza Size</option>
                                <option value="small">Small</option>
                                <option value="medium">Medium</option>
                                <option value="large">Large</option>
                            </select>
                        </label>

                    <p>Select Toppings</p>
                        <label>Pepperoni
                        <input
                        type="checkbox"
                        name="pepperoni"
                        checked={values.pepperoni}
                        onChange={onCheckboxChange}
                        />
                    </label>

                    <label>Bacon
                    <input
                        type="checkbox"
                        name="bacon"
                        checked={values.bacon}
                        onChange={onCheckboxChange}
                    />
                    </label>

                    <label>Pineapple
                    <input
                    type="checkbox"
                    name="pineapple"
                    checked={values.pineapple}
                    onChange={onCheckboxChange}
                    />
                </label>

                <label>Jalapeno
                <input
                    type="checkbox"
                    name="jalapeno"
                    checked={values.jalapeno}
                    onChange={onCheckboxChange}
                />
                </label>
            </div>
        </form>
    )


}