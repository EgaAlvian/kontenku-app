import React, { useEffect } from 'react'
import { useState } from 'react'
import { FormControl, FormLabel, Input, FormHelperText, FormErrorMessage, Button } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCurrentUser, updateUser } from '../reducers/usersSlice'
import { useNavigate } from 'react-router-dom'

function UserInfo() {
    const [userDetail, setUserDetail] = useState({
        id: '',
        fullName: '',
        biodata: '',
        email: '',
        username: ''
    })
    const [selectedFile, setSelectedFile] = useState(null)
    const isError = userDetail.email === ""

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector((state) => state.users.user)
    const accessToken = localStorage.getItem('access_token')

    useEffect(() => {
        dispatch(fetchCurrentUser(accessToken))

        setUserDetail({
            id: user.id,
            username: user.username,
            fullName: user.fullName,
            biodata: user.biodata,
            email: user.email
        })
    }, [])

    const handleUpdateUser = () => {
        const formData = new FormData()

        if (selectedFile) {
            formData.append('file', selectedFile, selectedFile.name)
        }
        formData.append('biodata', userDetail.biodata)
        formData.append('fullName', userDetail.fullName)
        formData.append('username', userDetail.username)

        dispatch(updateUser(accessToken, formData))
            .then(() => {
                alert('success')
                navigate('/')
            })
            .catch(err => {
                console.log(err.response.data)
                alert(err.response.data.error)
            })
    }

    return (
        <div className='flex justify-center p-10'>
            <FormControl isInvalid={isError} className='flex flex-col max-w-md p-10 border-2'>
                <FormLabel className='text-xl' color={'blue.400'}>User Detail</FormLabel>

                <FormLabel>Full Name</FormLabel>
                <Input type='text' value={userDetail.fullName} onChange={(e) => setUserDetail({ ...userDetail, fullName: e.target.value })} placeholder='Full Name' />
                {!isError ? (
                    <FormHelperText>
                        Enter the name you'd like to receive the newsletter on.
                    </FormHelperText>
                ) : (
                    <FormErrorMessage>Name is required.</FormErrorMessage>
                )}

                <FormLabel>Biodata</FormLabel>
                <Input type='text' value={userDetail.biodata} onChange={(e) => setUserDetail({ ...userDetail, biodata: e.target.value })} placeholder='Bio' />
                {!isError ? (
                    <FormHelperText>
                        Enter the name you'd like to receive the newsletter on.
                    </FormHelperText>
                ) : (
                    <FormErrorMessage>Name is required.</FormErrorMessage>
                )}

                <FormLabel>Username</FormLabel>
                <Input type='text' value={userDetail.username} onChange={(e) => setUserDetail({ ...userDetail, username: e.target.value })} placeholder='Username' />
                {!isError ? (
                    <FormHelperText>
                        Enter the name you'd like to receive the newsletter on.
                    </FormHelperText>
                ) : (
                    <FormErrorMessage>Name is required.</FormErrorMessage>
                )}

                <FormLabel>Email</FormLabel>
                <Input disabled type='email' value={userDetail.email} onChange={(e) => setUserDetail({ ...userDetail, email: e.target.value })} placeholder='Email address' />
                {!isError ? (
                    <FormHelperText>
                        Enter the email you'd like to receive the newsletter on.
                    </FormHelperText>
                ) : (
                    <FormErrorMessage>Email is required.</FormErrorMessage>
                )}

                <FormLabel>Profil Picture</FormLabel>
                <div className=' flex flex-row  '>
                    <Input
                        type='file'
                        colorScheme='twitter'
                        variant="outline"
                        size="xs"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                    />
                </div>
                <br />
                <div className=' flex flex-row p-3 '>
                    <Button type='submit' colorScheme='twitter' onClick={handleUpdateUser}>Save</Button>
                </div>

            </FormControl>
        </div>
    )
}

export default UserInfo


