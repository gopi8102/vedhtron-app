function HeroSection() {
  const products = [
    {
      name: "Mobile",
      img: "/product-images/phone.jfif",
    },
    {
      name: "Refrigerator",
      img: "/product-images/refrigerator.jfif",
    },
    {
      name: "Laptop",
      img: "/product-images/laptop.jfif",
    },
    {
      name: "Headphone",
      img: "/product-images/headphone.jfif",
    },
    {
      name: "Fan",
      img: "/product-images/fan.jfif",
    },
    {
      name: "TV",
      img: "/product-images/tv.jfif",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center py-12 bg-gradient-to-br from-blue-100 to-purple-200">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-8 text-purple-700 drop-shadow-lg">
        Vedhtron
      </h1>
      <p className="text-lg md:text-2xl text-gray-700 mb-10 font-semibold">
        Experience the Next Generation of Electronics—Upgrade Your Lifestyle Today!
      </p>
      <div className="flex flex-wrap gap-8 justify-center items-center">
        {products.map((product) => (
          <div
            key={product.name}
            className="bg-white rounded-2xl shadow-xl flex flex-col items-center justify-center p-6 transform hover:-rotate-y-12 hover:scale-105 transition-all duration-500"
            style={{
              minWidth: 140,
              minHeight: 180,
              boxShadow: "0 8px 32px rgba(80,80,200,0.15)",
              perspective: "600px",
            }}
          >
            <img
              src={product.img}
              alt={product.name}
              className="w-24 h-24 object-contain mb-4"
              style={{ filter: "drop-shadow(0 4px 12px rgba(80,80,200,0.15))" }}
            />
            <span className="font-semibold text-lg text-gray-700">{product.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeroSection;

