import React from 'react';
import { PseudoBox } from '@chakra-ui/core';


const Footer = (props) => {
    return(

        <PseudoBox 
        bg='gray.300'
        margin='15px 0'
        padding='25px'
        >
            Exchange rate Euros per USD dollar $ {props.rate.USD}
        </PseudoBox>
    )
}

export default Footer
