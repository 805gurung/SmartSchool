import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { LiaCalendarDaySolid } from "react-icons/lia";
import { FiFileText, FiBookOpen } from "react-icons/fi";
import { BsQuestionCircle } from "react-icons/bs";
import { MdOutlineLocalPhone } from "react-icons/md";
import { CiGlobe, CiLocationOn } from "react-icons/ci";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoIosMenu, IoMdClose } from "react-icons/io";


const HomePage = () => {
  const handleToggle = () => {
    const options = document.querySelector('.options')
    options.classList.toggle('top-[9%]')
  }

  return (
    
    
    <>
    
      <nav className="navbar bg-orange-300 lg:bg-orange-500 flex items-center justify-between w-full h-20  px-16 text-orange-900 lg:text-white text-2xl">
        <div>
          <Link to='/'><img src='/Logo.svg' alt='logo' width={'90px'} /></Link>
        </div>
        <div className='options lg:static absolute bg-orange-300 lg:bg-orange-500 h-fit left-0 top-[-100%] sm:w-full lg:w-fit flex p-9 pl-20 ' >
          <ul className='flex flex-col lg:flex-row lg:items-center lg:gap-20 gap-8 '>
            <li> <Link to='#' className="py-2 hover:text-black" >About Us</Link></li>
            <li><Link to='#' className="py-2 hover:text-black">Contact Us</Link></li>
            <li><Link to='#' className="py-2 hover:text-black">Our Offers</Link></li>
          </ul>
        </div>
        <div className='flex items-center gap-5'>
          <Link to={'/login'}><button className="bg-orange-200 py-2 px-8 text-orange-900 hover:bg-orange-700 hover:text-white rounded-2xl ">Login</button></Link>
          <IoIosMenu name='menu' className='text-6xl cursor-pointer lg:hidden' onClick={handleToggle} />
        </div>
      </nav>

      <div className="hero bg-orange-500 flex items-center justify-between p-14 px-36 flex-wrap ">
        <div className="details text-white font-normal text-4xl md:text-5xl leading-snug">
          <h2>Welcome to SmartSchool:</h2>
          <h3>Simplifying School</h3>
          <h3>Management</h3><br />
          <p className="text-3xl md:text-4xl font-light">"Stay connected with your school community.</p>
          <p className="text-3xl md:text-4xl font-light">Access study materials, notices, and more in one place."</p>
        </div>
        <div className="hero-image"><img src='/heroIMG.svg' /></div>
      </div>

      <div className="offers">
        <h2 className="text-center text-orange-500 text-4xl py-16">What We Offer</h2>
        <div className="offers grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-9 mx-6 md:mx-16 lg:mx-24 xl:mx-80 mb-14">
          <div className="bg-orange-500 py-16 px-8 text-white hover:scale-105 cursor-pointer ">
            <div className="flex items-center mb-4 flex-wrap">
              <LiaCalendarDaySolid className="text-6xl" />
              <h3 className="text-3xl mx-2">Event Management</h3>
            </div>
            <p className="text-xl font-light"> Schedule and organize events with ease, ensuring smooth coordination and participation.</p>
          </div>

          <div className="bg-orange-500 py-16 px-8 text-white hover:scale-105 cursor-pointer ">
            <div className="flex items-center mb-4 flex-wrap">
              <FiFileText className="text-5xl" />
              <h3 className="text-3xl mx-2">Notice Management</h3>
            </div>
            <p className="text-xl font-light">Effortlessly create, edit, and broadcast important notices to keep everyone updated.</p>
          </div>

          <div className="bg-orange-500 py-16 px-8 text-white hover:scale-105 cursor-pointer ">
            <div className="flex items-center mb-4 flex-wrap">
              <FiBookOpen className="text-5xl" />
              <h3 className="text-3xl mx-2">Study Material Access</h3>
            </div>
            <p className="text-xl font-light">Easily access or provide study materials to students and teachers.</p>
          </div>

          <div className="bg-orange-500 py-16 px-8 text-white hover:scale-105 cursor-pointer ">
            <div className="flex items-center mb-4 flex-wrap">
              <BsQuestionCircle className="text-5xl" />
              <h3 className="text-3xl mx-2">Quiz Creation</h3>
            </div>
            <p className="text-xl font-light">Easily design and distribute quizzes to assess and enhance learning.</p>
          </div>
        </div>
      </div>

      <div className="footer  bg-orange-200 text-orange-900 text-2xl px-4 md:px-16 lg:px-24 xl:px-32 py-10 flex flex-col md:flex-row gap-8 md:gap-16 lg:gap-24 leading-10 ">
        <div>
          <p className='hover:underline cursor-pointer'>About</p><br />
          <p>
            Our Story<br />
            Benefits<br />
            Team<br />
            Careers<br />
          </p>
        </div>

        <div>
          <p className='hover:underline cursor-pointer'>Legal</p><br />
          <p>
            Terms & Conditions<br />
            Privacy Policy<br />
            Terms of use<br />
          </p>
        </div>

        <div>
          <p className='hover:underline cursor-pointer'>Contact</p><br />
          <a href='tel:9824325777'  className="flex items-center gap-2 hover:underline"><MdOutlineLocalPhone />9824325777</a>
          <a href='http://localhost:5173/' target='_blank' className="flex items-center gap-2 hover:underline cursor-pointer"><CiGlobe />www.infosmartschool.com.np</a>
          <a href='https://maps.app.goo.gl/ghqYkqmwqvys2Khx9' target='_blank' className="flex items-center gap-2 hover:underline cursor-pointer"><CiLocationOn />Satdobato, Lalitpur</a>
        </div>

        <div>
          <p>Follow Us</p>
          <p className="flex gap-4 text-2xl cursor-pointer ">
            <FaFacebook />
            <FaInstagram />
            <FaXTwitter />
          </p>
        </div>
      </div>

    </>

  )
}


export default HomePage


