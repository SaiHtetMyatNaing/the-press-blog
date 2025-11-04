import { LoginForm } from '@/app/_components/logInForm'
import { getServerSession } from '@/app/_lib/get-session'
import { redirect } from 'next/navigation'

const page = async () => {
    const session = await getServerSession()
    const user = session?.user
  
    if(user){
      redirect('/profile')
    }
  return (
    <div className='min-h-screen'>

      <LoginForm/>
    </div>
  )
}

export default page