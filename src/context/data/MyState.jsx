import { useEffect , useState} from "react";
import MyContext from "./MyContext"
import { addDoc, Timestamp,collection,onSnapshot,orderBy ,query,getDocs} from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import { toast } from "react-toastify";
import {deleteDoc, doc, setDoc} from 'firebase/firestore';


function MyState(props) {
   const [mode,setMode] = useState('light');
   const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark');
            document.body.style.backgroundColor = '#042743';
        } else {
            setMode('light');
            document.body.style.backgroundColor = 'white';
        }
    }
    const [loading , setLoading] = useState();
    const[products,setProducts] = useState({
        title: '',
        price: '',
        imageUrl: '',
        category: '',
        description: '',
        time:Timestamp.now(),
         date: new Date().toLocaleString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }
     )
    });
    const addProduct=async()=>{
        if (products.title == null || products.price == null || products.imageUrl == null || products.category == null || products.description == null) {
      return toast.error('Please fill all fields')
    }
    
    setLoading(true)
    try {
        const productRef = collection(fireDB, "products")
      await addDoc(productRef, products)
      toast.success("Product Add successfully")
      setTimeout(() => {
        window.location.href = '/dashboard'
        }, 800);
      getProductData()
      closeModal()
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
    setProducts("");
    }
     const [product, setProduct] = useState([]);
     const [filteredProducts, setFilteredProducts] = useState(product);

  // ****** get product
  const getProductData = async () => {
    setLoading(true)
    try {
      const q = query(
        collection(fireDB, "products"),
        orderBy("time"),
        // limit(5)
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productsArray)
        setFilteredProducts(productsArray); // Reset when product changes
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getProductData();
  }, []);

  const editHandle =(item) => {
    setProducts(item)
  }
   const updateProduct = async (item) => {
    setLoading(true)
    try {
      await setDoc(doc(fireDB, "products", products.id), products);
      toast.success("Product Updated successfully")
      getProductData();
      setLoading(false)
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 800);
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
    setProducts("")
  }

  const deleteProduct = async (item) => {

    try {
      setLoading(true);
      console.log("deletinf item ;",item)
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success('Product Deleted successfully')
     
       await getProductData()
       setLoading(false)
    } catch (error) {
       toast.error('Product Deleted Falied')
      setLoading(false);
      console.log(error);
    }
  }
  const [order, setOrder] = useState([]);

  const getOrderData = async () => {
    setLoading(true)
    try {
      const result = await getDocs(collection(fireDB, "orders"))
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false)
      });
      setOrder(ordersArray);
      console.log(ordersArray)
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
    const [user, setUser] = useState([]);

  const getUserData = async () => {
    setLoading(true)
    try {
      const result = await getDocs(collection(fireDB, "users"))
      const usersArray = [];
      result.forEach((doc) => {
        usersArray.push(doc.data());
        setLoading(false)
      });
      setUser(usersArray);
      console.log(usersArray)
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }


  useEffect(() => {
    getProductData();
    getOrderData();
    getUserData();

  }, []);
   const [searchkey, setSearchkey] = useState('')
   const [filterType, setFilterType] = useState('')
   const [filterPrice, setFilterPrice] = useState('')

    return (
        <MyContext.Provider value={{mode, toggleMode,loading,setLoading,products,setProducts,
            addProduct,product,editHandle,searchkey,setSearchkey,filterType,setFilterType,filterPrice,setFilterPrice,
           updateProduct,deleteProduct,order,setOrder,user,setUser,filteredProducts,setFilteredProducts
        }}>  
            {props.children}
        </MyContext.Provider>
    )
}

export default MyState
