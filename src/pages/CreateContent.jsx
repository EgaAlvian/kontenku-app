import React, { useEffect, useState } from 'react'
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react'
import { createPost } from '../reducers/postsSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchCurrentUser } from '../reducers/usersSlice'

function CreateContent() {
    const [selectedFile, setSelectedFile] = useState(null)
    const [caption, setCaption] = useState(null)
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const accessToken = localStorage.getItem('access_token')

    useEffect(() => {
        dispatch(fetchCurrentUser(accessToken))
            .catch(err => {
                console.log(err.response)
                navigate('/login')
            })
    }, [])

    const handleCreatePost = () => {
        const formData = new FormData()

        if (!selectedFile) {
            alert('Image cannot be empty')
            return
        }

        formData.append('file', selectedFile, selectedFile.name)
        formData.append('caption', caption)

        dispatch(createPost(accessToken, formData))
            .then(_ => {
                navigate("/")
                alert("Success")
            })
            .catch(err => {
                console.log(err.response.data)
                alert(err.response.data.error)
            })
    }

    return (
        <div className='flex justify-center p-10'>
            <FormControl className='flex flex-col max-w-md p-10 border-2'>
                <FormLabel>Image</FormLabel>
                <div className=' flex flex-row '>
                    <Input
                        type='file'
                        colorScheme='twitter'
                        variant="outline"
                        size="xs"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                    />
                </div>
                <br />
                <FormLabel>Caption</FormLabel>
                <Input
                    type='text'
                    placeholder='Caption'
                    onChange={(e) => setCaption(e.target.value)}
                />
                <div className=' flex flex-row mt-5 '>
                    <Button type='submit' colorScheme='twitter' onClick={handleCreatePost}>Post</Button>
                </div>
            </FormControl>
        </div>
    )
}

export default CreateContent