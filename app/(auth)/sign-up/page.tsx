import { SignUpForm } from '@/app/_components/signUpForm'
import { getServerSession } from '@/app/_lib/get-session'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {
  const session = await getServerSession()
  const user = session?.user

  if(user){
    redirect('/profile')
  }
  return (
    <div className='min-h-screen'>
      <SignUpForm/>

    </div>
  )
}

export default page