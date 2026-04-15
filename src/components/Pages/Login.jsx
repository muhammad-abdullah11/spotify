import React from 'react'
import { SignIn } from '@clerk/clerk-react'

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] px-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-[#1DB954] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-[#1db95433]">
            <svg
              viewBox="0 0 24 24"
              className="w-10 h-10 text-white fill-current"
            >
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.491 17.306c-.215.353-.675.463-1.025.249-2.859-1.747-6.458-2.141-10.697-1.173-.404.092-.814-.16-.906-.565-.092-.404.16-.814.565-.906 4.639-1.06 8.608-.611 11.814 1.347.35.213.461.673.249 1.025zM18.96 14.05c-.27.439-.846.582-1.285.312-3.272-2.012-8.259-2.593-12.128-1.417-.493.15-.1.846-.16.996-.653-.15-.493-.846-.312-1.336-.793-1.285-.312-.44.27-.583.846-.312 1.285.312zM19.105 10.65c-3.924-2.33-10.392-2.546-14.154-1.405-.602.183-1.242-.158-1.425-.76-.183-.603.158-1.242.76-1.425 4.306-1.307 11.45-1.054 15.968 1.626.541.32.716 1.02.396 1.561-.321.541-1.021.716-1.561.396z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400 text-center">Sign in to SonicStream to continue your musical journey.</p>
        </div>
        
        <div className="clerk-container flex justify-center">
          <SignIn 
            appearance={{
              elements: {
                formButtonPrimary: 'bg-[#1DB954] hover:bg-[#1ed760] transition-colors',
                card: 'bg-[#181818] border border-[#282828] shadow-2xl',
                headerTitle: 'text-white',
                headerSubtitle: 'text-gray-400',
                socialButtonsBlockButton: 'bg-[#282828] border-[#3e3e3e] hover:bg-[#323232] text-white',
                socialButtonsBlockButtonText: 'text-white font-medium',
                dividerLine: 'bg-[#282828]',
                dividerText: 'text-gray-500',
                formFieldLabel: 'text-gray-300',
                formFieldInput: 'bg-[#282828] border-[#3e3e3e] text-white focus:border-[#1DB954] focus:ring-1 focus:ring-[#1DB954]',
                footerActionText: 'text-gray-400',
                footerActionLink: 'text-[#1DB954] hover:text-[#1ed760]'
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Login
