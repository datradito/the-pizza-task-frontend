import React from 'react';
import { Button, Tooltip } from '@chakra-ui/core';


const Header = () => {

    return (
        <Tooltip label="Toggle your currency..." placement="bottom">
            <Button 
                bg='gray.100'
                margin='15px 0'
                padding='25px'
                textAlign='center'
                leftIcon='sun'
                variantColor='teal' 
                variant='outline'
                >
                E$/U$S
            </Button>
        </Tooltip>
    )
}

export default Header