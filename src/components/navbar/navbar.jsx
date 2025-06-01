import React, { Fragment, useContext, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import MyContext from "../../context/data/MyContext";
import { BsFillCloudSunFill } from 'react-icons/bs'
import { FiSun } from 'react-icons/fi'
import { Link } from "react-router-dom";
import { RxCross2 } from 'react-icons/rx'
import { useSelector } from 'react-redux';

function navbar() {
  const [open, setOpen] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false);
  const [profileImg, setProfileImg] = useState(
    localStorage.getItem('profileImg') || "https://cdn-icons-png.flaticon.com/512/9131/9131478.png"
  );
  const [userName, setUserName] = useState(
    localStorage.getItem('userName') || "User"
  );
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState(localStorage.getItem('firstName') || "");
  const [lastName, setLastName] = useState(localStorage.getItem('lastName') || "");
  const [phone, setPhone] = useState(localStorage.getItem('phone') || "");

  const context= useContext(MyContext);
  const { mode, toggleMode } = context;
  const user= JSON.parse(localStorage.getItem('user')) ; 
  const logout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
  const cartItem = useSelector((state) => state.cart);

  // Handle profile image upload
  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (upload) {
        setProfileImg(upload.target.result);
        localStorage.setItem('profileImg', upload.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle name change
  const handleNameChange = (e) => {
    setUserName(e.target.value);
    localStorage.setItem('userName', e.target.value);
  };

  return (
    <div className="bg-white sticky top-0 z-50">
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl" style={{ backgroundColor: mode === 'dark' ? 'rgb(40, 44, 52)' : '', color: mode === 'dark' ? 'white' : '', }}>
                <div className="flex px-4 pb-2 pt-28">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <RxCross2 />
                  </button>
                </div>
                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  
                  <Link to={'/allproducts'} className="text-sm font-medium text-gray-900 " style={{ color: mode === 'dark' ? 'white' : '', }}>
                    All Products
                  </Link>
                  {user?<div className="flow-root">
                    <Link to={'/order'} style={{ color: mode === 'dark' ? 'white' : '', }} className="-m-2 block p-2 font-medium text-gray-900">
                      Order
                    </Link>
                  </div> : ""}  

                  {user?.user?.email === 'gopi1234@gmail.com' ? <div className="flow-root">
                    <Link to={'/dashboard'} className="-m-2 block p-2 font-medium text-gray-900" style={{ color: mode === 'dark' ? 'white' : '', }}>
                      admin
                    </Link>
                  </div> : ""}       
                    
                  {user ? <div className="flow-root">
                    <a onClick={logout} className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer" style={{ color: mode === 'dark' ? 'white' : '', }}>
                      Logout
                    </a>
                  </div> : ""}

                  {!user && (
                    <Link to="/login" className="text-sm font-medium text-gray-700" style={{ color: mode === 'dark' ? 'white' : '', }}>
                      Login
                    </Link>
                  )}
                  
                  <div className="flow-root">
                    <Link to={'/'} className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer">
                      <img
                        className="inline-block w-10 h-10 rounded-full"
                        src="https://cdn-icons-png.flaticon.com/512/9131/9131478.png"
                        alt="user" />                                        </Link>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6">
                  <a href="#" className="-m-2 flex items-center p-2">
                    <img
                      src="img/indiaflag.png"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-base font-medium text-gray-900" style={{ color: mode === 'dark' ? 'white' : '', }}>INDIA</span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
       <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-pink-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8" style={{ backgroundColor: mode === 'dark' ? 'rgb(62 64 66)' : '', color: mode === 'dark' ? 'white' : '', }}>
          Get free delivery on orders over ₹3,999
        </p>

        <nav aria-label="Top" className="bg-gray-100 px-4 sm:px-6 lg:px-8 shadow-xl " style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '', }}>
          <div className="">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)} style={{ backgroundColor: mode === 'dark' ? 'rgb(80 82 87)' : '', color: mode === 'dark' ? 'white' : '', }}
              >
                <span className="sr-only">Open menu</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>

              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to={'/'} className='flex'>
                  <div className="flex ">
                    <h1 className=' text-2xl font-bold text-black  px-2 py-1 rounded' style={{ color: mode === 'dark' ? 'white' : '', }}>Vedhtron</h1>
                  </div>
                </Link>
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">

                  <Link to={'/allproducts'} className="text-sm font-medium text-gray-700 " style={{ color: mode === 'dark' ? 'white' : '', }}>
                    All Products
                  </Link>
                  {user?<Link to={'/order'} className="text-sm font-medium text-gray-700 " style={{ color: mode === 'dark' ? 'white' : '', }}>
                    Order
                  </Link>:""}
                  {user?.user?.email === 'gopi1234@gmail.com'?
                   <Link to={'/dashboard'} className="text-sm font-medium text-gray-700 " style={{ color: mode === 'dark' ? 'white' : '', }}>
                    Admin
                  </Link> : ""
                  }

                  {user ? <a onClick={logout} className="text-sm font-medium text-gray-700 cursor-pointer  " style={{ color: mode === 'dark' ? 'white' : '', }}>
                    Logout
                  </a> : ""}
                  {!user && (
                    <Link to="/login" className="text-sm font-medium text-gray-700" style={{ color: mode === 'dark' ? 'white' : '', }}>
                      Login
                    </Link>
                  )}
                </div>

                <div className="hidden lg:ml-8 lg:flex">
                  <a href="#" className="flex items-center text-gray-700 ">
                    <img
                      src="https://ecommerce-sk.vercel.app/img/indiaflag.png"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-sm font-medium" style={{ color: mode === 'dark' ? 'white' : '', }}>INDIA</span>
                  </a>
                </div>
                <div className="hidden lg:ml-8 lg:flex">
                  <a
                    href="#"
                    className="flex items-center text-gray-700"
                    onClick={e => {
                      e.preventDefault();
                      setShowUserModal(true);
                    }}
                  >
                    <img
                      className="inline-block w-10 h-10 rounded-full"
                      src={profileImg}
                      alt="user"
                    />
                  </a>
                </div>

                {/* Search */}
                <div className="flex lg:ml-6">
                  <button className='' onClick={toggleMode}>
                    {/* <MdDarkMode size={35} style={{ color: mode === 'dark' ? 'white' : '' }} /> */}
                    {mode === 'light' ?
                      (<FiSun className='' size={30} />
                      ) : 'dark' ?
                        (<BsFillCloudSunFill size={30} />
                        ) : ''}
                  </button>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Link to={'/cart'} className="group -m-2 flex items-center p-2" style={{ color: mode === 'dark' ? 'white' : '', }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/ >
                    </svg>

                    <span className="ml-2 text-sm font-medium text-gray-700 group-" style={{ color: mode === 'dark' ? 'white' : '', }}>{cartItem.length}</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      {showUserModal && user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg p-6 min-w-[320px] shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => setShowUserModal(false)}
            >
              ✕
            </button>
            <div className="flex flex-col items-center">
              <label htmlFor="profileImgInput" className="cursor-pointer">
                <img
                  src={profileImg}
                  alt="Profile"
                  className="w-20 h-20 rounded-full mb-2 border-2 border-pink-600 object-cover"
                  title="Click to change profile image"
                />
                <input
                  id="profileImgInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImgChange}
                />
              </label>
              {editing ? (
                <>
                  <input
                    type="text"
                    value={userName}
                    onChange={handleNameChange}
                    className="border rounded px-2 py-1 mb-2 text-center"
                    placeholder="User Name"
                    autoFocus
                  />
                  <input
                    type="text"
                    value={firstName || ""}
                    onChange={e => {
                      setFirstName(e.target.value);
                      localStorage.setItem('firstName', e.target.value);
                    }}
                    className="border rounded px-2 py-1 mb-2 text-center"
                    placeholder="First Name"
                  />
                  <input
                    type="text"
                    value={lastName || ""}
                    onChange={e => {
                      setLastName(e.target.value);
                      localStorage.setItem('lastName', e.target.value);
                    }}
                    className="border rounded px-2 py-1 mb-2 text-center"
                    placeholder="Last Name"
                  />
                  <input
                    type="text"
                    value={phone || ""}
                    onChange={e => {
                      setPhone(e.target.value);
                      localStorage.setItem('phone', e.target.value);
                    }}
                    className="border rounded px-2 py-1 mb-2 text-center"
                    placeholder="Phone Number"
                  />
                  <button
                    className="mt-2 bg-pink-600 text-white px-4 py-1 rounded"
                    onClick={() => setEditing(false)}
                  >
                    Update
                  </button>
                </>
              ) : (
                <>
                  <h2
                    className="text-lg font-bold mb-1 cursor-pointer"
                    title="Click to edit name"
                    onClick={() => setEditing(true)}
                  >
                    {userName}
                  </h2>
                  <p className="mb-1">
                    <span className="font-semibold">First Name:</span> {firstName || "N/A"}
                  </p>
                  <p className="mb-1">
                    <span className="font-semibold">Last Name:</span> {lastName || "N/A"}
                  </p>
                  <p className="mb-1">
                    <span className="font-semibold">Phone:</span> {phone || "N/A"}
                  </p>
                  <p className="mb-2">
                    <span className="font-semibold">Email:</span> {user.user?.email || "N/A"}
                  </p>
                  <button
                    className="mt-2 bg-pink-600 text-white px-4 py-1 rounded"
                    onClick={() => setEditing(true)}
                  >
                    Edit
                  </button>
                </>
              )}
              
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default navbar
