import React from 'react';

const Navbar = ()=>{
    return(
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                <div className="flex-shrink-0">
                </div>
                <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                    <div className="bg-current px-3 py-2 rounded-md text-sm font-medium" aria-current="page"><p className='text-slate-400'> MAAROUF HAMZA </p></div>
                    </div>
                </div>
                </div>
                
                <div className="-mr-2 flex md:hidden">
                <button type="button" className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>

                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>

                    <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                </div>
            </div>
            </div>
        </nav>
    );
} 

export default Navbar;