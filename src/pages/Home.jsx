import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardBody, Flex, Avatar, Box, Heading, Text, Image, Button, CardFooter, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { deletePost, fetchPosts, setPosts } from '../reducers/postsSlice'
import { requestVerifyEmail, fetchCurrentUser } from '../reducers/usersSlice'


function Home() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const posts = useSelector((state) => state.posts.posts)
    const user = useSelector((state) => state.users.user)

    const accessToken = localStorage.getItem('access_token')

    useEffect(() => {
        dispatch(fetchCurrentUser(accessToken))
            .catch(err => {
                console.log(err.response)
                navigate('/login')
            })

        dispatch(fetchPosts(accessToken))
            .catch(err => {
                console.log(err.response)
            })
    }, [])

    const handleVerifyEmail = () => {
        dispatch(requestVerifyEmail(accessToken))
            .then(() => {
                alert('please check your email')
            })
            .catch(err => {
                console.log(err?.response?.data)
                alert(err?.response?.data?.error)
            })
    }

    const handleDeletePost = (postId) => {
        dispatch(deletePost(accessToken, postId))
            .then(() => {
                alert('delete success')
                const newPosts = posts.filter(post => post.id !== postId)
                dispatch(setPosts(newPosts))
            })
            .catch(err => {
                console.log(err?.response?.data)
                alert(err?.response?.data?.error)
            })
    }

    return (
        <div className='p-5'>
            {
                !user.verified ? (<>
                    <Text color='red'>
                        You're not verified, please verify your email!
                    </Text>
                    <Button onClick={handleVerifyEmail}>Verify email</Button>
                </>
                ) : <></>
            }

            <div className='max-w-xs flex flex-col mt-5 justify-end '>
                {
                    !user.fullName ? (
                        <>
                            <Text color='red.400'>You are not eligible to create a content. Please update your profile first!</Text>
                            <Button isDisabled type='button' colorScheme='twitter' onClick={() => navigate("/create-content")}>Create Content </Button>
                        </>
                    ) : (
                        <Button type='button' colorScheme='twitter' onClick={() => navigate("/create-content")}>Create Content </Button>
                    )
                }

            </div>

            <div className='flex justify-center p-5 '>
                <div className='flex flex-col max-w-md p-4'>

                    {
                        posts.map((post, i) => {
                            return (
                                <Card key={i} maxW='md' className='flex flex-col max-w-md p-4'>
                                    <CardHeader>
                                        <Flex spacing='4'>
                                            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                                <Avatar name={post.User.fullName} src={process.env.REACT_APP_SERVER + '/uploads/' + post.User.profilePicture} />

                                                <Box>
                                                    <Heading size='sm'>{post.User.fullName}</Heading>
                                                    <Text>{post.User.username}</Text>
                                                </Box>
                                            </Flex>
                                            <Menu>
                                                {post.User.id === user.id ? ({ isOpen }) => (
                                                    <>
                                                        <MenuButton isActive={isOpen} as={Button} variant="ghost">
                                                            {isOpen ? '...' : '...'}
                                                        </MenuButton>
                                                        <MenuList>
                                                            <MenuItem onClick={() => navigate("/edit-content", { state: { post } })}>Edit</MenuItem >
                                                            <MenuItem onClick={() => handleDeletePost(post.id)}>Delete</MenuItem>
                                                        </MenuList>
                                                    </>
                                                ) : <></>}
                                            </Menu>
                                        </Flex>
                                    </CardHeader>

                                    <Image
                                        objectFit='cover'
                                        src={process.env.REACT_APP_SERVER + '/uploads/' + post.fileName}
                                        alt='Image'
                                    />

                                    <CardBody>
                                        <Text>{post.caption ? post.caption : ''}</Text>
                                    </CardBody>

                                    <CardFooter
                                        justify='space-between'
                                        flexWrap='wrap'
                                        sx={{
                                            '& > button': {
                                                minW: '136px',
                                            },
                                        }}
                                    >
                                        <Button flex='1' variant='ghost'
                                        // leftIcon={<BiLike />}
                                        >
                                            Like
                                        </Button>
                                        <Button flex='1' variant='ghost'
                                        // leftIcon={<BiChat />}
                                        >
                                            Comment
                                        </Button>
                                    </CardFooter>
                                </Card>
                            )
                        })
                    }

                </div>
            </div>
        </div>

    )
}

export default Home