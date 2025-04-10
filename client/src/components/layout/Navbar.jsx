import React, { useState, useEffect, useRef } from 'react'
import Logo from '../../assets/logo.svg'
import defaultUser from '../../assets/user.png'
import { IoMenu } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import { IoSearch } from 'react-icons/io5';
import { useRecoilState } from 'recoil';
import { isMobileMenuOpenState } from '../../state/atom';

const Navbar = () => {
    // Use Recoil for mobile menu state
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useRecoilState(isMobileMenuOpenState);
    
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const profileRef = useRef(null)

    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen)
    }

    // Close profile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <nav className="bg-white  border-b border-gray-200 px-4 py-2.5 fixed left-0 right-0 top-0 z-50">
            <div className="flex gap-14 items-center justify-between">
                <div className="flex items-center gap-4">
                    {/* Hamburger Menu Button */}
                    <button
                        className="lg:hidden text-neutral4 text-3xl"
                        onClick={toggleMenu}>
                            {
                                isMobileMenuOpen ? <RxCross2 /> : <IoMenu />
                            }
                     
                    </button>
                    <img
                        src={Logo}
                        alt="Halal India"
                        className="h-12"
                    />
                    <h1 className="text-custom-tertiary font-semibold text-2xl">Halal India </h1>
                </div>

                <div className="flex lg:flex-grow items-center justify-between">
                    <div className="relative h-10 text-neutral4">
                       <IoSearch className='w-5 h-5 max-md:w-8 max-md:h-8 max-md:top-1 absolute max-lg:relative left-3 max-lg:left-0 max-lg:mr-5 top-2.5'/>
                        <input
                            type="text"
                            placeholder="Search for services"
                            className="max-lg:hidden w-[300px] bg-neutral2 px-4 pl-10 h-10 py-2 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-custom-primary"
                        />
                    </div>

                    <div
                        className="flex items-center gap-6 relative"
                        ref={profileRef}>
                        <a
                            href="/about-us"
                            className="text-gray-700 hover:text-green-600 max-md:hidden ">
                            About us
                        </a>
                        <a
                            href="/help"
                            className="text-gray-700 hover:text-green-600 max-md:hidden ">
                            Help
                        </a>
                        <div
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={toggleProfile}>
                            <div className="flex flex-col items-end max-md:hidden">
                                <p className="text-sm font-medium">Atif khan</p>
                                <p className="text-xs text-gray-500">18 April 2022, 11:34 am</p>
                            </div>
                            <img
                                src={defaultUser}
                                alt="User"
                                className="h-10 w-10 rounded-full object-cover"
                            />
                        </div>

                        {/* Profile Dropdown Menu */}
                        <div
                            className={`fixed md:absolute top-[70px] md:top-full right-[10px] h-auto w-[280px] md:w-[280px] bg-white shadow-lg border-l border border-gray-200 transition-transform duration-300 transform ${isProfileOpen ? 'translate-x-0' : 'translate-x-[120%]'} md:mt-2`}>
                            <div className="p-4">
                                <div className="flex items-center gap-3 p-2 border-b border-gray-200 pb-4">
                                    <img
                                        src={defaultUser}
                                        alt="Profile"
                                        className="h-12 w-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <h3 className="font-medium">Atif khan</h3>
                                        <p className="text-xs text-gray-500">18 April 2022, 11:34 am</p>
                                    </div>
                                </div>

                                <div className="py-2 font-medium text-neutral4">
                                    <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors">About Us</button>
                                    <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors">Help Center</button>
                                    {/* <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg text-red-600 transition-colors">
                                        Sign Out
                                    </button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar

