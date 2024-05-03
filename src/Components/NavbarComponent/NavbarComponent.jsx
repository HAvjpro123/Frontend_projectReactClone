import React from 'react'

const NavbarComponent = () => {
    const renderContent =  (type, options) => {
        switch (type) {
            case 'text':
                return options.map((option) => {
                    return <div  key={option}><p className='px-4 border-l-4 border-gray-100'>{option}</p></div> 
                })
            default: 
                return {}
        }
    }

  return (
    <div>
        <p className='px-4 border-l-4 border-green-700 text-2xl font-medium'>Navbar</p>
        {renderContent('text', ['ban', 'ghe', 'giuong'])}
    </div>
  )
}

export default NavbarComponent