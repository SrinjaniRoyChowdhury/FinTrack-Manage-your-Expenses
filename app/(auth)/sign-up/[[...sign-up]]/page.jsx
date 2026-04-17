import { SignUp } from '@clerk/nextjs'
import Image from 'next/image'

export default function Page() {
  return (
    <div className="flex h-screen">
      {/* Left Pane */}
      <div className="hidden md:flex items-center justify-center flex-1 bg-white text-black">
        <div className="max-w-md text-center">
          <Image
            src="/authpic.svg"
            alt="Finance illustration"
            width={524}
            height={531}
            className="w-full"
            priority
          />
        </div>
      </div>

      {/* Right Pane */}
      <div className="w-full bg-gray-100 md:w-1/2 flex items-center justify-center flex-col">
        <div className="max-w-md w-full p-6 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Join FinTrack</h2>
          <SignUp routing="path" path="/sign-up" />
        </div>
      </div>
    </div>
  )
}