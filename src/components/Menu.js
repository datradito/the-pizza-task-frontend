import React, { useContext, useState } from 'react';
import { OrderContext } from '../App';
import Checkout from './Checkout';
import { Button, PseudoBox , Text, Spinner, List, Tooltip} from '@chakra-ui/core';

let neworder = []
const Menu = (props) => {

    //The default currency is the Euro. The data is stored in the DB in Euros.
    
    const state = useContext(OrderContext)
    const [currency, setCurrrency] = useState(true)
    
    const handleAdd = (e) => {
        e.preventDefault();
        console.log('ID: ', e.target.id)
        neworder = state.orderState.order
        let pizza_index = state.orderState.order.findIndex((pizza)=>(pizza._id===e.target.id))
        let pizza_units = state.orderState.order[pizza_index].units + 1
        neworder[pizza_index] = {...neworder[pizza_index], units: pizza_units}
        
        console.log('ADD',neworder)
        state.orderDispatch({ type:'ADD', order:neworder })
    }
    
    const handleSub = (e) => {
        e.preventDefault();
        neworder = state.orderState.order
        let pizza_index = state.orderState.order.findIndex((pizza)=>(pizza._id===e.target.id))
        if(neworder[pizza_index].units>0){
            let pizza_units = state.orderState.order[pizza_index].units - 1
            neworder[pizza_index] = {...neworder[pizza_index], units: pizza_units}
        }
        console.log('SUB',neworder)
        state.orderDispatch({ type:'SUB', order:neworder })

    }
    
    const handleReset = (e) => {
        e.preventDefault();
        neworder = state.orderState.order
        let pizza_index = state.orderState.order.findIndex((pizza)=>(pizza._id===e.target.id))
        neworder[pizza_index] = {...neworder[pizza_index], units: 0}
        console.log('RESET',neworder)
        state.orderDispatch({ type:'RESET', order:neworder })
    }

    const handleCurrency = (e) => {
        e.preventDefault();
        neworder = state.orderState.order
        neworder = neworder.map((pizza, index)=>({...neworder[index], price:pizza.price * props.rate.USD}))
        setCurrrency(!currency)
        console.log('TOGGLE CURRENCY',neworder)

    }

    return (
        <>
        {console.log('STATE:', state)}
        <PseudoBox
            width='65%'
            margin='0 auto'
            paddingTop='25px'
            display='block'
            scroll-behavior='smooth'
        >   
            <PseudoBox 
                bg='gray.300'
                margin='15px 0'
                padding='25px'
                textAlign='center'
                alignContent='space-between'
                fontWeight='extrabold'
                >
                Order MENU
            </PseudoBox>

            {   
                <List styleType=''>
                {
                    !!state.orderState.loading ? 
                        <Spinner
                            thickness="4px"
                            speed="0.65s"
                            emptyColor="gray.200"
                            color="blue.500"
                            size="xl"
                        />        
                    : state.orderState.order.map((item, index) =>

                    <PseudoBox 
                        bg='gray.100'
                        margin='5px 0'
                        padding='5px'
                        key={index}
                        alignContent='between'
                        flex>
                    <Text>{item.description}</Text>
                    {currency ? <Text>EU$ {item.price.toFixed(2)}</Text> : <Text>U$S {(item.price * props.rate.USD).toFixed(2)}</Text>}
                    <Text>cant: {item.units}</Text>
                    <PseudoBox 
                        bg='gray.100'
                        margin='5px 0'
                        padding='5px'
                        key={index}>
                        <Button 
                            variantColor='green'
                            id={item._id}
                            onClick={handleAdd}
                        >add</Button>
                        <Button 
                            onClick={handleSub}
                            variantColor='red'
                            id={item._id}
                        >sub
                        </Button>
                        <Button 
                            variantColor='blue'
                            id={item._id}
                            onClick={handleReset}
                        >
                        reset
                        </Button>                    
                    </PseudoBox>
                    </PseudoBox>
                    )
                }
            </List>
            }
            <Tooltip label="Toggle your currency..." placement="bottom">
                <Button 
                    bg='gray.100'
                    margin='10px 0'
                    padding='15px'
                    textAlign='center'
                    leftIcon='sun'
                    variantColor='teal' 
                    variant='outline'
                    onClick={handleCurrency}
                    >
                E$/U$S
            </Button>
            </Tooltip>
            <Checkout loading={state.orderState.loading} order={state.orderState.order} currency={props.rate.USD} toggle={currency} />
        </PseudoBox>
        </>
        )
}

export default Menu
