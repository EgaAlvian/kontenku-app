import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../reducers/usersSlice'

function Navbar() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const user = useSelector((state) => state.users.user)

    const handleLogout = () => {
        dispatch(setUser({
            id: null,
            fullName: '',
            biodata: '',
            username: '',
            email: '',
            verified: false
        }))
        localStorage.removeItem('access_token')

        navigate('/login')
    }

    return (
        <div>
            <div className='bg-[#1695ef] flex flex-row justify-between gap-12 p-5 text-white font-extrabold'>
                <div className='flex flex-auto text-xl'>
                    Kontenku
                </div>
                <div className='flex flex-row-reverse '>
                    {
                        user.id ? (
                            <>
                                <div className='mx-5'>
                                    <button className='hover:font-normal font-medium' onClick={handleLogout}>
                                        Log out
                                    </button>
                                </div>
                                <div className='mx-5'>
                                    <button className='hover:font-normal font-medium' onClick={() => navigate("/user-info")}>
                                        Profile
                                    </button>
                                </div>

                            </>
                        ) : (
                            <>
                                <div className='mx-5'>
                                    <button className='hover:font-normal font-medium' onClick={() => navigate("/register")}>
                                        Register
                                    </button>
                                </div>

                                <div>
                                    <button className='hover:font-normal font-medium ' onClick={() => navigate("/login")}>
                                        Login
                                    </button>
                                </div>
                            </>
                        )
                    }

                </div>

            </div >

        </div>
    )
}

export default Navbar