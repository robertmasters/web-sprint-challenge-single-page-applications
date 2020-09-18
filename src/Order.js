import React from 'react'

export default function Order(props) {
    const {info} = props

    return (
        <div className='return-order-container'>
        <p>Order Name: {info.orderName}</p>
        <p>Pizza Size: {info.size}</p>
        <p>Instructions: {info.instructions}</p>
        <p>Topping pepperoni: {info.pepperoni}</p>
        <p>Topping bacon: {info.bacon}</p>
        <p>Topping pineapple: {info.pineapple}</p>
        <p>Topping jalapeno: {info.jalapeno}</p>
        </div>
    )

}