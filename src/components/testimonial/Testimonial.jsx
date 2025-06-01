import React, { useContext } from 'react'
import myContext from '../../context/data/MyContext'

function Testimonial() {
    const context = useContext(myContext)
    const { mode } = context
    return (
        <div>
            <section className="text-gray-600 body-font mb-10">
                <div className="container px-5 py-10 mx-auto">
                    <h1 className=' text-center text-3xl font-bold text-black' style={{color: mode === 'dark' ? 'white' : ''}}>Testimonial</h1>
                    <h2 className=' text-center text-2xl font-semibold mb-10' style={{color: mode === 'dark' ? 'white' : ''}}>What our <span className=' text-pink-500'>customers</span> are saying</h2>
                    <div className="flex flex-wrap -m-4">
                        <div className="lg:w-1/3 flex-1 flex flex-col mb-6 p-4">
                            <div className="h-full text-center flex flex-col items-center justify-between">
                                <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src="/product-images/user2.jfif" />
                                <p style={{color: mode === 'dark' ? 'white' : ''}} className="leading-relaxed flex-1">
                                    I had an excellent experience shopping on this electronic website. The product selection is vast, prices are competitive, and delivery was quick. Customer service was responsive and helpful. Everything I ordered arrived in perfect condition. Highly recommend this site for anyone looking for reliable and affordable electronic gadgets and accessories.
                                </p>
                                <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
                                <h2 style={{color: mode === 'dark' ? '#ff4162' : ''}} className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">Nand Kishor</h2>
                                <p style={{color: mode === 'dark' ? 'white' : ''}} className="text-gray-500"></p>
                            </div>
                        </div>
                        <div className="lg:w-1/3 flex-1 flex flex-col mb-6 p-4">
                            <div className="h-full text-center flex flex-col items-center justify-between">
                                <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src="https://cdn-icons-png.flaticon.com/128/2763/2763444.png" />
                                <p style={{color: mode === 'dark' ? 'white' : ''}} className="leading-relaxed flex-1">
                                    This electronic website offers a seamless shopping experience with a wide range of quality products at great prices. The site is easy to navigate, and checkout is hassle-free. Fast delivery and excellent customer support make it stand out. I’m very satisfied and will definitely return for future electronic purchases.
                                </p>
                                <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
                                <h2 style={{color: mode === 'dark' ? '#ff4162' : ''}} className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">Prithvi</h2>
                                <p style={{color: mode === 'dark' ? 'white' : ''}} className="text-gray-500"></p>
                            </div>
                        </div>
                        <div className="lg:w-1/3 flex-1 flex flex-col mb-6 p-4">
                            <div className="h-full text-center flex flex-col items-center justify-between">
                                <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src="product-images/user1.jfif" />
                                <p style={{color: mode === 'dark' ? 'white' : ''}} className="leading-relaxed flex-1">
                                    Shopping on this electronic website was a pleasure. The variety of products is impressive, and everything is clearly listed with detailed descriptions. Prices are reasonable, and delivery was prompt. Customer service quickly answered my questions. I’m very happy with my purchase and will confidently shop here again for future electronics.
                                </p>
                                <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
                                <h2 style={{color: mode === 'dark' ? '#ff4162' : ''}} className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">Bikram</h2>
                                <p style={{color: mode === 'dark' ? 'white' : ''}} className="text-gray-500"></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Testimonial