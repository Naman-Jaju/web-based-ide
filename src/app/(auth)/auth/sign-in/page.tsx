import React from 'react'
import Image from 'next/image'
import SignInFormClient from '@/features/auth/components/signin-form-client'

const SignInPage: React.FC = () => {
  return (
    <>
      <Image src="/public/Logo.svg" alt="Logo" width={300} height={300} />
      <SignInFormClient />
    </>
  )
}

export default SignInPage