import React from 'react'
import { useState } from 'react'
import { FormControl, FormLabel, Input, FormHelperText, FormErrorMessage, Button } from '@chakra-ui/react'

function ForgotPassword() {
    const [email, setEmail] = useState('')
    const isError = email === ""

    return (
        <div className='flex justify-center p-10'>
            <FormControl isInvalid={isError} className='flex flex-col max-w-md p-10 border-2'>
                <FormLabel>Verify our email address to reset password </FormLabel>
                <br />
                <FormLabel>Email</FormLabel>
                <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email address' />
                {!isError ? (
                    <FormHelperText>
                        Enter the email you'd like to receive the newsletter on.
                    </FormHelperText>
                ) : (
                    <FormErrorMessage>Email is required.</FormErrorMessage>
                )}
                <div className=' flex flex-row p-3 '>
                    <Button type='submit' colorScheme='twitter'>Confirm </Button>
                </div>
            </FormControl>
        </div>
    )
}

export default ForgotPassword