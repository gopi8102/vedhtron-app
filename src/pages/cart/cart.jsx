import { useContext, useEffect, useState } from "react";
import MyContext from "../../context/data/MyContext";
import Layout from "../../components/layout/layout";
import Model from "../../components/model/Model";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "../../redux/CartSlice";
import { toast } from "react-toastify";
import { db } from '../../firebase/FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from "firebase/functions";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const functions = getFunctions();

function Cart() {
  const context = useContext(MyContext);
  const { mode } = context;
  const cartItem = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [totalAmount, setTotalAmount] = useState(0);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selected, setSelected] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [giftWrap, setGiftWrap] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItem));
  }, [cartItem]);

  useEffect(() => {
    let temp = 0;
    cartItem.forEach((cartItem) => {
      temp = temp + parseFloat(cartItem.price);
    });
    setTotalAmount(temp);
  }, [cartItem]);

  // Coupon logic
  useEffect(() => {
    if (coupon === "VEDH10") setDiscount(Math.floor(totalAmount * 0.1));
    else setDiscount(0);
  }, [coupon, totalAmount]);

  const shipping = cartItem.length > 0 ? (totalAmount > 3999 ? 0 : 100) : 0;
  const giftWrapCharge = giftWrap ? 49 : 0;
  const grandTotal = (cartItem.length > 0 ? shipping + totalAmount - discount + giftWrapCharge : 0);

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Product removed from cart successfully");
  };

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const buyNow = async () => {
    if (name === "" || address === "" || pincode === "" || phoneNumber === "") {
      return toast.error("All fields are required", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };
    var options = {
      key: "rzp_test_3vluS9wlf2xmn3",
      key_secret: "q46A4yIHJ5AvkClXZzwWddMA",
      amount: parseInt(grandTotal * 100),
      currency: "INR",
      order_receipt: "order_rcptid_" + name,
      name: "Vedhtron",
      description: "Order Payment",
      handler: async function (response) {
        toast.success("Payment Successful");
        const paymentId = response.razorpay_payment_id;
        const orderInfo = {
          cartItem,
          addressInfo,
          date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
          email: JSON.parse(localStorage.getItem("user")).user.email,
          userid: JSON.parse(localStorage.getItem("user")).user.uid,
          paymentId,
          coupon,
          discount,
          giftWrap,
        };
        try {
          const orderRef = collection(db, "orders");
          await addDoc(orderRef, orderInfo);
        } catch (error) {
          toast.error("Failed to save order");
          console.log(error);
        }
      },
      theme: {
        color: "#ff5722",
      },
    };

    var pay = new window.Razorpay(options);
    pay.open();
  };

  const validateCoupon = async (code) => {
    const validate = httpsCallable(functions, "validateCoupon");
    const result = await validate({ code });
    return result.data;
  };

  const handleApplyCoupon = async () => {
    const result = await validateCoupon(coupon);
    if (result.valid) {
      // Set discount based on result.coupon
      if (result.coupon.type === "percent")
        setDiscount(Math.floor(totalAmount * result.coupon.value));
      else setDiscount(result.coupon.value);
      toast.success("Coupon Applied!");
    } else {
      setDiscount(0);
      toast.error(result.message);
    }
  };

  return (
    <Layout>
      <div
        className="min-h-screen bg-gradient-to-br from-gray-100 to-pink-50 dark:from-gray-900 dark:to-gray-800 pt-10 pb-32"
      >
        <h1 className="mb-10 text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 drop-shadow-lg">
          <span className="inline-flex items-center gap-2">
            <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 007.5 19h9a2 2 0 001.85-1.3L17 13M7 13V6h13" /></svg>
            Your Cart
          </span>
        </h1>
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row gap-10 px-4">
          {/* Cart Items */}
          <div className="flex-1 space-y-8">
            {cartItem.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-96 bg-white/70 dark:bg-gray-800/70 rounded-3xl shadow-inner">
                <img
                  src="/product-images/empty-cart.png"
                  alt="Empty Cart"
                  className="w-40 h-40 mb-6 opacity-80"
                />
                <p className="text-xl font-semibold text-gray-500 dark:text-gray-300">
                  Your cart is empty. <a href="/" className="text-pink-600 underline">Shop now</a>
                </p>
              </div>
            ) : (
              cartItem.map((item, index) => (
                <div
                  key={item.id || index}
                  className={`flex flex-col sm:flex-row items-center bg-white/90 dark:bg-gray-800/90 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6 gap-6 group border-2 ${
                    selected.includes(item.id)
                      ? "border-pink-600"
                      : "border-transparent"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(item.id)}
                    onChange={() => toggleSelect(item.id)}
                    className="accent-pink-600 w-5 h-5 mr-2"
                    title="Select for bulk actions"
                  />
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-32 h-32 object-cover rounded-2xl shadow group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="flex-1 w-full">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                          {item.title}
                        </h2>
                        <p className="text-xs text-gray-400 mb-1 uppercase tracking-widest">
                          {item.category}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-pink-600">
                            ₹{item.price}
                          </span>
                          <span className="text-xs text-gray-400 line-through">
                            ₹{parseInt(item.price) + 200}
                          </span>
                          <span className="text-xs text-green-600 font-semibold">
                            {Math.floor((200 / (parseInt(item.price) + 200)) * 100)}% OFF
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 mt-4 sm:mt-0">
                        <button
                          onClick={() => deleteCart(item)}
                          className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow transition"
                          title="Remove"
                          aria-label="Remove from cart"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-4">
                      <span className="text-xs text-gray-500">Delivery by</span>
                      <span className="text-xs font-semibold text-green-600">
                        {new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                      </span>
                      <span className="text-xs text-gray-400">(Free returns)</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {/* Order Summary */}
          <div className="w-full md:w-1/3 bg-white/90 dark:bg-gray-900/90 rounded-3xl shadow-2xl p-8 flex flex-col justify-between sticky top-24 h-fit">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">
                Order Summary
              </h2>
              <div className="flex justify-between mb-3">
                <span className="text-gray-700 dark:text-gray-200">Subtotal</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  ₹{totalAmount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              {cartItem.length > 0 && (
                <div className="flex justify-between mb-3">
                  <span className="text-gray-700 dark:text-gray-200">Shipping</span>
                  <span className={`font-semibold ${shipping === 0 ? "text-green-600" : "text-gray-900 dark:text-white"}`}>
                    {shipping === 0 ? "Free" : `₹${shipping}`}
                  </span>
                </div>
              )}
              <div className="flex justify-between mb-3">
                <span className="text-gray-700 dark:text-gray-200">Gift Wrap</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  <input
                    type="checkbox"
                    checked={giftWrap}
                    onChange={() => setGiftWrap((v) => !v)}
                    className="accent-pink-600 mr-1"
                  />
                  {giftWrap ? `₹${giftWrapCharge}` : "No"}
                </span>
              </div>
              <div className="flex justify-between mb-3">
                <span className="text-gray-700 dark:text-gray-200">Discount</span>
                <span className="font-semibold text-green-600">-₹{discount}</span>
              </div>
              <div className="flex items-center gap-2 mb-5">
                <input
                  type="text"
                  placeholder="Apply Coupon"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                  className="border border-gray-300 dark:border-gray-700 rounded-lg px-2 py-1 w-2/3 focus:ring-pink-500 focus:border-pink-500 bg-gray-100 dark:bg-gray-800 text-sm"
                />
                <button
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold px-3 py-1 rounded-lg shadow transition text-sm"
                  onClick={handleApplyCoupon}
                >
                  Apply
                </button>
              </div>
              <hr className="my-5 border-pink-200 dark:border-pink-800" />
              <div className="flex justify-between mb-8">
                <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                <span className="text-lg font-bold text-pink-600">
                  ₹{grandTotal.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
            <Model
              name={name}
              address={address}
              pincode={pincode}
              phoneNumber={phoneNumber}
              setName={setName}
              setAddress={setAddress}
              setPincode={setPincode}
              setPhoneNumber={setPhoneNumber}
              buyNow={buyNow}
            />
            <div className="mt-6 flex flex-col gap-2">
              
              <button
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg transition"
                onClick={() => navigate("/")}
              >
                Continue Shopping
              </button>
            </div>
            <div className="mt-8 text-xs text-gray-400 text-center">
              <span className="inline-flex items-center gap-1">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" /></svg>
                100% Secure Payments
              </span>
              <span className="mx-2">|</span>
              <span className="inline-flex items-center gap-1">
                <svg className="w-4 h-4 text-pink-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                Easy Returns
              </span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
