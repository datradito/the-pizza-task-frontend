import React, {useEffect} from 'react';
import { PseudoBox, Spinner } from '@chakra-ui/core';
import Form from './Form';

//WE ASSUME THE COST OF DELIVERY 5% OF THE TOTAL
const DELIVERY=0.05
let price_array = []
let isOrder = false


const Checkout = (data) => {

    price_array = data.order.map(item=>{
        if(item.units>0)
            return item.price*item.units
        else
            return item.price*0
    })

    const reducer = (accumulator, currentValue) => accumulator + currentValue
    return (
    <>
        {console.log('Checkout: ',data.order)}
        {console.log('CURRENCY', data.currency)}
        {console.log('TOGGLE', data.toggle)}
        {console.log('LOADING',data.loading)}
        {console.log('')}
        {data.loading ? 
            <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
            />        
        : 
            <>            
            {console.log('subtotal:',  price_array.reduce(reducer))} 
            { isOrder = !!price_array.reduce(reducer)}
            <PseudoBox 
                bg='gray.300'
                margin='10px 0'
                padding='15px'
            >
                <PseudoBox 
                    bg='gray.100'
                    margin='10px 0'
                    padding='20px'
                >
                {data.toggle ? 
                `Subtotal $${(price_array.reduce(reducer)).toFixed(2)}` : 
                `Subtotal $${(price_array.reduce(reducer) * data.currency).toFixed(2)}`}
                </PseudoBox>

                <PseudoBox 
                    bg='gray.100'
                    margin='10px 0'
                    padding='20px'
                >
                {data.toggle ? 
                `Delvery $${(DELIVERY*price_array.reduce(reducer)).toFixed(2)}` : 
                `Delvery $${( DELIVERY*price_array.reduce(reducer) * data.currency ).toFixed(2)}`}
                </PseudoBox>

                <PseudoBox 
                    bg='gray.100'
                    margin='10px 0'
                    padding='20px'
                >
                {data.toggle ? 
                `Total $${( DELIVERY*price_array.reduce(reducer) + price_array.reduce(reducer) ).toFixed(2)}` : 
                `Total $${(( DELIVERY*price_array.reduce(reducer) + price_array.reduce(reducer) ) * data.currency ).toFixed(2)}`}
                </PseudoBox>
            </PseudoBox>

            <Form order={ data.order.filter(item=>item.units>0)} showButton={isOrder}/>
            </>
        }
    </>
)}

export default Checkout