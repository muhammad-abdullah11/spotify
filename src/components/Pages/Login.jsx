import React from 'react'
import { FaSpotify, FaFacebook, FaApple } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

const Login = () => {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center pt-16 px-4 font-sans">
            <div className="mb-10">
                <FaSpotify className="text-5xl" />
            </div>

            <h1 className="text-4xl leading-tight font-black mb-12 text-center tracking-tighter">
                Welcome<br />back
            </h1>

            <div className="w-full max-w-xs">
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Email</label>
                    <input
                        type="email"
                        className="w-full bg-black border border-gray-500 focus:border-white focus:ring-1 focus:ring-white outline-none rounded-sm px-3 py-3 text-sm transition-all"
                    />
                </div>

                <button className="w-full bg-white hover:bg-gray-200 hover:scale-102 active:scale-100 text-black font-bold py-3 rounded-full mt-4 mb-6 transition-all duration-200">
                    Continue
                </button>

                <div className="text-center mb-6">
                    <span className="text-gray-500 text-sm font-bold">or</span>
                </div>

                <div className="space-y-2">
                    <button className="w-full border border-gray-500 hover:border-white flex items-center px-4 py-[11px] rounded-full transition-all group">
                        <FcGoogle className="text-2xl" />
                        <span className="flex-grow text-center text-sm font-bold mr-6">Continue with Google</span>
                    </button>

                    <button className="w-full border border-gray-500 hover:border-white flex items-center px-4 py-[11px] rounded-full transition-all group">
                        <FaFacebook className="text-2xl text-blue-600" />
                        <span className="flex-grow text-center text-sm font-bold mr-6">Continue with Facebook</span>
                    </button>

                    <button className="w-full border border-gray-500 hover:border-white flex items-center px-4 py-[11px] rounded-full transition-all group">
                        <FaApple className="text-2xl" />
                        <span className="flex-grow text-center text-sm font-bold mr-6">Continue with Apple</span>
                    </button>
                </div>

                <div className="mt-16 text-center">
                    <span className="text-gray-500 text-sm font-semibold">Don't have an account?</span>
                    <div className="mt-3">
                        <a href="#" className="text-white hover:text-[#1ed760] text-sm font-bold underline decoration-1 underline-offset-2">Sign up</a>
                    </div>
                </div>
            </div>

            <div className="mt-auto pb-10 pt-20 max-w-xs text-center">
                <p className="text-xs text-gray-500 leading-tight">
                    This site is protected by reCAPTCHA and the Google <a href="#" className="underline">Privacy Policy</a> and <a href="#" className="underline">Terms of Service</a> apply.
                </p>
            </div>
        </div>
    )
}

export default Login
