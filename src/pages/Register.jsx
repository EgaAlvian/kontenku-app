import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormControl, FormLabel, Input, FormHelperText, FormErrorMessage, Button, Checkbox, CheckboxGroup, InputGroup, InputRightElement } from '@chakra-ui/react'
import { fetchCurrentUser, registerUser } from '../reducers/usersSlice'
import { useNavigate } from 'react-router-dom'

function Register() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setCOnfirmPassword] = useState('')
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    const isError = email === ""
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const accessToken = localStorage.getItem('access_token')

    useEffect(() => {
        dispatch(fetchCurrentUser(accessToken))
            .then(() => {
                navigate('/')
            })
            .catch(err => {
                console.log(err.response)
            })
    }, [])

    const handleSubmitRegister = (e) => {
        e.preventDefault()

        dispatch(registerUser({
            username, email, password, confirmPassword
        }))
            .then(_ => {
                navigate("/login")
                alert('success')
            })
            .catch(err => {
                console.log(err.response.data)
                alert(err.response.data.error)
            })

    }

    return (
        <div className='flex justify-center p-10'>
            <FormControl isInvalid={isError} className='flex flex-col max-w-md p-10 border-2' onSubmit={handleSubmitRegister}>
                <FormLabel>Username</FormLabel>
                <Input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Full Name' />
                {!isError ? (
                    <FormHelperText>
                        Enter the username you'd like to receive the newsletter on.
                    </FormHelperText>
                ) : (
                    <FormErrorMessage>Username is required.</FormErrorMessage>
                )}

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

                <FormLabel>Confirm Password</FormLabel>
                <InputGroup size='md'>
                    <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Confirm password'
                        onChange={(e) => setCOnfirmPassword(e.target.value)}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>

                <div className=' flex flex-row mt-6 '>
                    <Button type='submit' colorScheme='twitter' onClick={handleSubmitRegister}>Create Account </Button>
                </div>
            </FormControl>
        </div>
    )
}

export default Register