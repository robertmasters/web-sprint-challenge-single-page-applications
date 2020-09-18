import React from 'react'

export default function Order({details}) {
    // const {info} = props

    return (

        <div className= 'user-container'>
            <pre> {JSON.stringify(details, null, 4)}</pre> {/*<pre> preformats teh output data without needing to manualy style it. JSON.stringify() is converting details to JSON, null means no function, and im using a space of 4 */}
            {console.log(details)}
        </div>

        // <div className='return-order-container'>
        // <p>Order Name: {info.orderName}</p>
        // <p>Pizza Size: {info.size}</p>
        // <p>Instructions: {info.instructions}</p>
        // <p>Topping pepperoni: {info.pepperoni}</p>
        // <p>Topping bacon: {info.bacon}</p>
        // <p>Topping pineapple: {info.pineapple}</p>
        // <p>Topping jalapeno: {info.jalapeno}</p>
        // </div>
    )

}