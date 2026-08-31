import React from 'react'

const navbar = () => {
  return (
<>
  <nav className="text-white navbar flex justify-around bg-blue-950 py-1.5">
    <div className="logo">TaskFlow

         </div>
        <div className="elem flex ">
            <ul className='flex gap-5'>
                <li className='cursor-pointer hover:font-bold duration-50'>Home</li>
                <li className='cursor-pointer hover:font-bold duration-50'>My Task</li>
            </ul>
        </div>
   
  </nav>
     </>
  )
}

export default navbar
