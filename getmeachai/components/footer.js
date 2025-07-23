import React from 'react'

const footer = () => {
const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-gray-800 text-white flex justify-center items-center px-4 h-10'>
        <p className='text-center'> copyright &copy; {currentYear} Get me a Chai - Fund your projects with Chai</p>
    </footer>
  )
}

export default footer
