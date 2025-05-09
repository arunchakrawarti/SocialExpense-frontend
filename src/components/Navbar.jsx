import React from 'react'

const Navbar = () => {
  return (
    <div>
       <nav className='bg-blue-800 w-full h-20'>
       <ul className="nav">
  <li className="nav-item">
    <a className="nav-link active" aria-current="page" href="#">Login</a>
  </li>
 
  <li className="nav-item">
    <a className="nav-link disabled" aria-disabled="true">Register</a>
  </li>
</ul>

       </nav>
    </div>
  )
}

export default Navbar
