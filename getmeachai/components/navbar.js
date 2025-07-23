"use client"
import React from 'react'
import { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link';
import Github from 'next-auth/providers/github'

const navbar = () => {
    const { data: session } = useSession();
    const [showdropdown, setshowdropdown] = useState(false)

    return (
        <nav className='bg-gray-800 text-white flex justify-between items-center px-4 h-14'>

            <Link className='logo font-bold text-lg flex justify-center items-center' href={'/'}>
                <img src="tea.gif" alt="" width={44} />
                <span>GetMeAChai!</span>
            </Link>

            <div className='relative'>
                {session && <>
                    <button id="multiLevelDropdownButton" onClick={() => { setshowdropdown(!showdropdown) }} onBlur={() => { setTimeout(() => {
                        setshowdropdown(false)
                    }, 250); }} data-dropdown-toggle="multi-dropdown" className="text-white mx-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Welcome {session.user.email}<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                    </button>

                    <div id="multi-dropdown" className={`z-10 ${showdropdown ? "" : "hidden"} absolute left-[125px] bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700`}>
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="multiLevelDropdownButton">
                            <li>
                                <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                            </li>
                            <li>
                                <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
                            </li>
                            <li>
                                <Link href="#" onClick={() => { signOut() }} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
                            </li>
                        </ul>
                    </div>
                </>
                }

                {session && <button className="p-[3px] relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                    <div className="px-8 py-1  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent" onClick={() => signOut()}>
                        logout
                    </div>
                </button>}


                {!session && <Link href={"/login"}>
                    <button className="p-[3px] relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                        <div className="px-8 py-1  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                            Login
                        </div>
                    </button>
                </Link>}
            </div>
        </nav >
    )
}

export default navbar
