import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { toast } from 'react-toastify';
import { db } from '../../firebase/FirebaseConfig'; 
import { collection, addDoc } from 'firebase/firestore';

export default function Modal({ name, address, pincode, phoneNumber, setName, setAddress, setPincode, setPhoneNumber, buyNow }) {
    let [isOpen, setIsOpen] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState("online"); // Add payment method state

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const handlePlaceOrder = async () => {
      try {
        // Store order details and payment method in one document
        const orderRef = await addDoc(collection(db, "orders"), {
          name,
          address,
          pincode,
          phoneNumber,
          paymentMethod,
          createdAt: new Date()
        });

        if (paymentMethod === "cod") {
          toast.success("Order placed with Cash on Delivery!");
          closeModal();
        } else {
          buyNow("online", orderRef.id);
          closeModal();
        }
      } catch (error) {
        toast.error("Failed to place order. Please try again.");
      }
    };

    return (
        <>
            <div className="text-center rounded-lg text-white font-bold">
                <button
                    type="button"
                    onClick={openModal}
                    className="w-full bg-violet-600 py-2 text-center rounded-lg text-white font-bold"
                >
                    Buy Now
                </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    {/* Add pt-16 or pt-[navbar-height] to push below navbar */}
                    <div className="fixed inset-0 overflow-y-auto flex items-start justify-center pt-24">
                        <div className="flex w-full min-h-screen items-start justify-center p-2 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                  className="w-full max-w-md transform overflow-hidden rounded-3xl bg-white dark:bg-gray-900 p-8 text-left align-middle shadow-2xl transition-all"
                                >
                                  <section>
                                    <div className="flex flex-col items-center py-2">
                                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                                        Complete Your Order
                                      </h3>
                                      <form className="space-y-5 w-full" autoComplete="off">
                                        <div>
                                          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Payment Method</label>
                                          <div className="flex gap-4">
                                            <label className="flex items-center">
                                              <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="online"
                                                checked={paymentMethod === "online"}
                                                onChange={() => setPaymentMethod("online")}
                                                className="accent-pink-600 mr-2"
                                              />
                                              Online Payment
                                            </label>
                                            <label className="flex items-center">
                                              <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="cod"
                                                checked={paymentMethod === "cod"}
                                                onChange={() => setPaymentMethod("cod")}
                                                className="accent-pink-600 mr-2"
                                              />
                                              Cash on Delivery
                                            </label>
                                          </div>
                                        </div>
                                        <div>
                                          <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Full Name</label>
                                          <input value={name} onChange={(e)=> setName(e.target.value)} type="text" name="name" id="name" className="border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2 bg-gray-100 dark:bg-gray-800" required />
                                        </div>
                                        <div>
                                          <label htmlFor="address" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Address</label>
                                          <input value={address} onChange={(e)=> setAddress(e.target.value)} type="text" name="address" id="address" className="border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2 bg-gray-100 dark:bg-gray-800" required />
                                        </div>
                                        <div className="flex gap-3">
                                          <div className="flex-1">
                                            <label htmlFor="pincode" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Pincode</label>
                                            <input value={pincode} onChange={(e) => setPincode(e.target.value)} type="text" name="pincode" id="pincode" className="border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2 bg-gray-100 dark:bg-gray-800" required />
                                          </div>
                                          <div className="flex-1">
                                            <label htmlFor="mobileNumber" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Mobile Number</label>
                                            <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="text" name="mobileNumber" id="mobileNumber" className="border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2 bg-gray-100 dark:bg-gray-800" required />
                                          </div>
                                        </div>
                                      </form>
                                      <button
                                        onClick={handlePlaceOrder}
                                        type="button"
                                        className="w-full mt-6 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold py-3 rounded-xl shadow-lg transition"
                                      >
                                        Place Order
                                      </button>
                                    </div>
                                  </section>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

