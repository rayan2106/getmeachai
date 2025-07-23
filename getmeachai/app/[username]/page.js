
import React from 'react'
import PaymentPage from '@/components/paymentPage'
import { notFound } from 'next/navigation'
import dbConnect from '@/db/connectDB'
import User from '@/models/User'

async function Username({ params }) {
  const checkuser = async () => {
    await dbConnect()
    let u = await User.findOne({ username: params.username })
    if (!u) {
      return notFound()
    }
  }
  await checkuser()
  return (
    <PaymentPage username={params.username} />
  )
}

export default Username

export async function generateMetadata({ params }) {
  return {
    title: `Support ${params.username} - Get Me A Chai`,
  }
}
