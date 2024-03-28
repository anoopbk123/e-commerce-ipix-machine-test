import React from 'react'
import NavBar from './NavBar'

export default function Layout({title, children}) {
  return (
    <div>
      <NavBar/>
      <h1 className='h1 mt-5 text-center pt-3 py-2'>{title}</h1>
      <div className='m-2 p-2'>
        {children}
      </div>
    </div>
  )
}
