import React from 'react'
import { AiFillInstagram, AiOutlineTwitter, AiFillFacebook} from 'react-icons/ai'
import { SiEbay } from 'react-icons/si'

const Footer = () => {
  return (
    <div className='footer-container'>
      <p>2022 JSM Headphones All rights reserverd</p>
      <p className='icons'>
        <AiFillInstagram/>
        <AiOutlineTwitter/>
        <AiFillFacebook/>
        <SiEbay/>
      </p>
    </div>
  )
}

export default Footer