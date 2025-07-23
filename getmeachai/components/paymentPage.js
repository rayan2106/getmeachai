"use client"
import React, { use, useEffect, useState } from 'react'
import Script from 'next/script'
import { initiate, fetchpayments, fetchuser } from '@/actions/useractions'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify'
import { useRouter } from 'next/navigation'

const paymentPage = ({ username }) => {
    const [paymentForm, setpaymentForm] = useState({ name: "", message: "", amount: "" });
    const [currentUser, setcurrentUser] = useState({})
    const [Payments, setPayments] = useState([])
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const router = useRouter();


    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        if (searchParams.get("paymentdone") == "true") {
            toast('payment successful', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            router.push(`/${username}`);
        }
    }, [])


        const handlechange = (e) => {
            setpaymentForm({
                ...paymentForm,
                [e.target.name]: e.target.value
            })
        }

        const getData = async () => {
            let u = await fetchuser(username);
            setcurrentUser(u);
            let dbpayments = await fetchpayments(username);
            setPayments(dbpayments);
        }

        const pay = async (amount) => {
            let a = await initiate(amount, username, paymentForm)
            let orderId = a.id;
            var options = {
                "key": currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
                "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": "INR",
                "name": "get me a chai", //your business name
                "description": "Test Transaction",
                "image": "https://example.com/your_logo",
                "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                "callback_url": `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/razorpay`, //This is the URL to which the customer will be redirected after successful payment
                "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                    "name": "Gaurav Kumar", //your customer's name
                    "email": "gaurav.kumar@example.com",
                    "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
                },
                "notes": {
                    "address": "Razorpay Corporate Office"
                },
                "theme": {
                    "color": "#3399cc"
                }
            };
            var rzp1 = new Razorpay(options);
            rzp1.open();
        }

        return (
            <>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Bounce}
                />

                <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />

                <div className='cover w-full relative flex justify-center mt-10'>
                    <img className='object-cover w-[90%] h-[75vh]' src={currentUser.coverpic} alt="" />
                    <div className='absolute -bottom-20 right-[47%] border-white border-2 rounded-full h-100'>
                        <img className="w-24 h-24 rounded-full object-cover" src={currentUser.profilepic} alt="" />

                    </div>
                </div>


                <div className='info flex justify-center items-center my-24 flex-col gap-2 w-full'>
                    <div className='font-bold text-lg'>
                        @{username}
                    </div>
                    <div className='text-slate-400'>
                       lets help {username} to get a chai
                    </div>
                    <div className='text-slate-400'>
                        {Payments.length} payments . {currentUser.name}  has raised ₹{Payments.reduce((acc, curr) => acc + curr.amount, 0)} so far
                    </div>

                    <div className='payment flex gap-3 w-[90%] mt-11'>
                        <div className='supporters w-1/2 bg-slate-900 rounded-lg text-white p-10' >
                            <h2 className='text-2xl font-bold my-5'>supporters</h2>
                            <ul className="mx-5 text-lg">
                                {Payments.length == 0 && <li className='text-slate-400'>No payments yet</li>}
                                {Payments.map((p, i) => (
                                    <li key={i} className='flex items-center my-2'><img className='mx-3' width={35} src="profile.gif" alt="" /><span>{p.name} donated <span className='font-bold'>₹{p.amount} </span> with message "{p.message}"</span></li>
                                ))}
                            </ul>
                        </div>
                        <div className='makepayment w-1/2 bg-slate-900 rounded-lg text-white p-10'>
                            <h2 className='text-2xl font-bold my-5'>Make a payment</h2>
                            <div className='flex flex-col gap-2'>
                                <div>
                                    <input onChange={handlechange} name='name' value={paymentForm.name} className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Name' type="text" />
                                </div>
                                <input onChange={handlechange} name="message" value={paymentForm.message} className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Message' type="text" />
                                <input onChange={handlechange} name="amount" value={paymentForm.amount} className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Amount' type="text" />
                                <button onClick={() => { pay(Number.parseInt(paymentForm.amount) * 100) }} type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:bg-slate-400" disabled={paymentForm.name?.length < 3 || paymentForm.message?.length < 4 || paymentForm.amount?.length < 1}>Pay</button>
                            </div>
                            <div className='flex gap-2 mt-5'>
                                <button onClick={() => { pay(1000) }} className='p-3 rounded-lg bg-slate-800'>pay 10₹</button>
                                <button onClick={() => { pay(2000) }} className='p-3 rounded-lg bg-slate-800'>pay 20₹</button>
                                <button onClick={() => { pay(3000) }} className='p-3 rounded-lg bg-slate-800'>pay 30₹</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>

        )
    }
export default paymentPage;

export const metadata = {
    title: "Payment - Get Me A Chai",
  }
