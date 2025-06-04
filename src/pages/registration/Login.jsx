import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import MyContext from '../../context/data/MyContext'
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth'; 
import { auth, fireDB } from '../../firebase/FirebaseConfig';
import Loader from '../../components/loader/Loader';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';

function Login() {
    const [identifier, setIdentifier] = useState(''); // can be email or phone
    const [password, setPassword] = useState('');
    const context = useContext(MyContext)
    const { loading, setLoading } = context
    const navigate = useNavigate();

    const login = async () => {
        setLoading(true);
        let emailToLogin = identifier;

        // If input is not an email, treat as phone number and look up email
        if (!identifier.includes('@')) {
            try {
                const q = query(
                    collection(fireDB, "users"),
                    where("phoneNumber", "==", identifier)
                );
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    emailToLogin = querySnapshot.docs[0].data().email;
                } else {
                    toast.error('No user found with this phone number');
                    setLoading(false);
                    return;
                }
            } catch (error) {
                toast.error('Error looking up phone number');
                setLoading(false);
                return;
            }
        }

        try {
            const result = await signInWithEmailAndPassword(auth, emailToLogin, password)
            localStorage.setItem('user', JSON.stringify(result));
            
            const userQuery = query(
                collection(fireDB, "users"),
                where("uid", "==", result.user.uid)
            );
            const userSnapshot = await getDocs(userQuery);
            if (!userSnapshot.empty) {
                const userData = userSnapshot.docs[0].data();
                localStorage.setItem("userDetails", JSON.stringify(userData));
            }

            toast.success('Login Successfully', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            window.location.href = '/'
            setLoading(false);
        } catch (error) {
            toast.error('Signin Failed', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setLoading(false);
        }
    }

    return (
        <div className=' flex justify-center items-center h-screen'>
            {loading && <Loader />}
            <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                <div className="">
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Login</h1>
                </div>
                <div>
                    <input
                        type="text"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        name='identifier'
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Email or Phone Number'
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Password'
                    />
                </div>
                <div className=' flex justify-center mb-3'>
                    <button
                        onClick={login}
                        className=' bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg'>
                        Login
                    </button>
                </div>
                <div>
                    <h2 className='text-white'>Don't have an account <Link className=' text-yellow-500 font-bold' to={'/signup'}>Signup</Link></h2>
                </div>
            </div>
        </div>
    )
}

export default Login