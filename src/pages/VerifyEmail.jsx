import React, { useEffect } from 'react'
import { Button, Text } from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { verifyEmail } from '../reducers/usersSlice'
import { useDispatch } from 'react-redux'


function VerifyEmail() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { token } = useParams()

    useEffect(() => {
        dispatch(verifyEmail(token))
    }, [])

    return (
        <div className='max-w-xs flex flex-col m-5 justify-end '>

            <Text className='mb-4'>You are verified!</Text>
            <Button width={140} type='submit' colorScheme='twitter' onClick={() => navigate("/")}>Go to home</Button>
        </div>
    )
}

export default VerifyEmail