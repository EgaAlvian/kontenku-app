import React from 'react'
import { useState } from 'react'
import { FormControl, FormLabel, Input, FormHelperText, FormErrorMessage, Button, Checkbox, InputGroup, InputRightElement } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../reducers/usersSlice'
import { useDispatch } from 'react-redux'


function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    const isError = email === ''

    const dispatch = useDispatch()

    const handleSubmitLogin = (e) => {
        e.preventDefault()
        dispatch(loginUser({
            email, password
        })).then(_ => {
            navigate("/")
            alert("Login success")
        }).catch(err => {
            console.log(err.response.data)
            alert(err.response.data.error)
        })
    }

    return (
        <div className='flex justify-center p-10'>
            <FormControl isInvalid={isError} className='flex flex-col max-w-md p-10 border-2'>
                <FormLabel>Email</FormLabel>
                <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email address' />
                {!isError ? (
                    <FormHelperText>
                        Enter the email you'd like to receive the newsletter on.
                    </FormHelperText>
                ) : (
                    <FormErrorMessage>Email is required.</FormErrorMessage>
                )}

                <FormLabel>Password</FormLabel>
                <InputGroup size='md'>
                    <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Enter password'
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>

                </InputGroup>
                {!isError ? (
                    <FormHelperText>
                        Enter the password min 8 character.
                    </FormHelperText>
                ) : (
                    <FormErrorMessage>Password is required.</FormErrorMessage>
                )}
                <div className=' flex flex-row mt-2 justify-end '>
                    <Button colorScheme='twitter' variant='link' onClick={() => navigate("/forgot-password")}>
                        Forgot your password
                    </Button>
                </div>

                <div className=' flex flex-row mt-2 '>
                    <Button type='submit' colorScheme='twitter' onClick={handleSubmitLogin}>Login </Button>
                </div>
            </FormControl>
        </div>
    )
}

export default Login