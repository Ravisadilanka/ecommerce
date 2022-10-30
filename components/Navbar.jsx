import React, { useState } from 'react'
import Link from 'next/link'
import { AiOutlineShopping} from 'react-icons/ai'
import { BsToggleOn,BsFillSunFill,BsFillMoonFill,BsToggleOff } from 'react-icons/bs'
import { Cart } from './'
import { useStateContext } from '../context/StateContext'
import useLocalStorage from 'use-local-storage'


const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  const [show,setShow] = useState(false);  
  
  return (
    
    <div className='navbar-container'>
      <p className='logo' >
        <Link href="/"> JSM Headphones </Link>
      </p>
      <ul className='list'>
        <li><Link href="/products"> Products </Link></li>
        <li><Link href="/contact"> Contact </Link></li>
        <li><Link href="/about"> About </Link></li>
        <li><button type='button' className='cart-icon' onClick={() => setShowCart(true)}>
              <AiOutlineShopping/>
              <span className='cart-item-qty'>
                {totalQuantities}
              </span>
            </button>
          {showCart && <Cart/>}
        </li>
      </ul>
    </div>
  )
}





export default Navbar