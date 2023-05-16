import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody, Flex, Avatar, Box, Heading, Text, Image, Button, CardFooter, Input } from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updatePost } from '../reducers/postsSlice';
import { fetchCurrentUser } from '../reducers/usersSlice';


function EditContent() {
    const [postId, setPostId] = useState(null)
    const [data, setData] = useState({ caption: '' })

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const location = useLocation();

    let post;
    if (location.state) {
        post = location.state.post
    }

    const accessToken = localStorage.getItem('access_token')

    useEffect(() => {
        dispatch(fetchCurrentUser(accessToken))
            .catch(err => {
                console.log(err.response)
                navigate('/login')
            })

        setPostId(post?.id)
    }, [])

    const handleUpdatePost = () => {
        dispatch(updatePost(accessToken, postId, data))
            .then(_ => {
                navigate("/")
                alert("Success")
            }).catch(err => {
                console.log(err.response.data)
                alert(err.response.data.error)
            })
    }

    return (
        <div className='flex justify-center p-5 '>
            <div className='flex flex-col max-w-md p-4'>

                <Card maxW='md' className='flex flex-col max-w-md p-4'>
                    <CardHeader>
                        <Flex spacing='4'>
                            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                <Avatar name={post?.User?.fullName} src={process.env.REACT_APP_SERVER + '/uploads/' + post?.User?.profilePicture} />

                                <Box>
                                    <Heading size='sm'>{post?.User?.fullName}</Heading>
                                    <Text>{post?.User?.biodata}</Text>
                                </Box>
                            </Flex>
                        </Flex>
                    </CardHeader>

                    <Image
                        objectFit='cover'
                        src={process.env.REACT_APP_SERVER + '/uploads/' + post?.fileName}
                        alt='Image'
                    />

                    <CardBody>
                        <Input
                            type='text'
                            className='mt-2'
                            placeholder={post?.caption}
                            onChange={(e) => setData({ caption: e.target.value })}
                        />
                        <div className=' flex flex-row mt-5 '>
                            <Button
                                type='submit'
                                colorScheme='twitter'
                                onClick={handleUpdatePost}
                            >Submit </Button>
                        </div>
                    </CardBody>


                </Card>

            </div>
        </div>
    )
}

export default EditContent