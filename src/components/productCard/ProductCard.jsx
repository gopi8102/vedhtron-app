import React, { useContext, useEffect } from "react";
import MyContext from "../../context/data/MyContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/CartSlice";
import { toast } from "react-toastify";

function ProductCard() {
  const context = useContext(MyContext);
  const {
    mode,
    product,
    searchkey,
    setSearchkey,
    filterType,
    setFilterType,
    filterPrice,
    setFilterPrice,
  } = context;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  console.log(cartItems);

  const addCart = (product) => {
    dispatch(addToCart(product));
    toast.success("add to cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Helper function to group products by category
  const groupByCategory = (products) => {
    return products.reduce((acc, product) => {
      const category = product.category || "Uncategorized";
      if (!acc[category]) acc[category] = [];
      acc[category].push(product);
      return acc;
    }, {});
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-8 md:py-16 mx-auto">
        <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
          <h1
            className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
            style={{ color: mode === "dark" ? "white" : "" }}
          >
            Our Latest Collection
          </h1>
          <div className="h-1 w-20 bg-pink-600 rounded"></div>
        </div>

        {Object.entries(
          groupByCategory(
            product
              .filter((obj) => obj.title.toLowerCase().includes(searchkey))
              .filter((obj) => obj.category.toLowerCase().includes(filterType))
              .filter((obj) => obj.price.includes(filterPrice))
          )
        ).map(([category, items]) => (
          <div key={category} className="mb-12">
            <h2
              className="text-xl font-bold mb-6"
              style={{ color: mode === "dark" ? "white" : "" }}
            >
              {category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {items.map((item, index) => {
                const { title, price, description, imageUrl, id } = item;
                return (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col overflow-hidden group"
                  >
                    <div
                      onClick={() =>
                        (window.location.href = `/productinfo/${id}`)
                      }
                      className="cursor-pointer relative"
                    >
                      <img
                        className="rounded-t-3xl w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        src={imageUrl}
                        alt={title}
                      />
                      <span className="absolute top-3 right-3 bg-pink-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
                        {item.category}
                      </span>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h2 className="text-xs font-semibold text-gray-400 mb-1 uppercase tracking-widest">
                        Vedhtron
                      </h2>
                      <h1 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {title}
                      </h1>
                      <p className="text-gray-700 dark:text-gray-200 mb-4 flex-1">
                        {description?.slice(0, 60)}...
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-xl font-bold text-pink-600">
                          ₹
                          {parseFloat(
                            item.price.toString().replace(/,/g, "")
                          ).toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                        <button
                          type="button"
                          onClick={() => addCart(item)}
                          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold px-4 py-2 rounded-lg shadow transition"
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductCard;
