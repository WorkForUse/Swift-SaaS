import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";

const CartPage = () => {
  // Theme colors matching Navbar
  const lightBlue = "#3ABEF9";
  const darkBlue = "#07477D";

  // Hardcoded cart items (textbooks)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Advanced Mathematics Textbook",
      price: 49.99,
      qty: 2,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmgUO_p-wcofAwijjTMxsw2xtLfG_u7rBk3g&s",
    },
    {
      id: 2,
      name: "Physics Fundamentals",
      price: 59.99,
      qty: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTccW0Cnh5VB6KO0nTOuadhxdsf24r1GwX3mA&s",
    },
    {
      id: 3,
      name: "Organic Chemistry Guide",
      price: 39.99,
      qty: 3,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcMFaD-lrvruVs_dKUXWVtFCpDzvFlDYcYFQ&s",
    },
    {
      id: 4,
      name: "Biology Essentials",
      price: 29.99,
      qty: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3e0-RTY3VhlQ_R1HAh_EbnrAJ_LHwVVCsow&s",
    },
  ]);

  const updateQty = (id, delta) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item.id === id
            ? { ...item, qty: Math.max(0, item.qty + delta) }
            : item,
        )
        .filter((item) => item.qty > 0),
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const isEmpty = cartItems.length === 0;

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-50">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-4">
            Your Cart
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Review your selected textbooks and proceed to checkout securely.
          </p>
        </div>

        {isEmpty ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <ShoppingBag className="w-24 h-24 text-gray-300 mb-6" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Your cart is empty
            </h2>
            <p className="text-lg text-gray-500 mb-8 max-w-md">
              No textbooks in cart yet. Explore our collection to start
              shopping!
            </p>
            <a
              href="/shop"
              className={`bg-[${lightBlue}] hover:bg-[${darkBlue}] text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1`}
            >
              Continue Shopping
            </a>
          </div>
        ) : (
          /* Cart Content - Desktop: Items left, Summary right; Mobile: Stacked */
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 p-6"
                >
                  <div className="flex items-center gap-4">
                    {/* Image */}
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-xl shadow-md"
                      />
                      <button
                        onClick={() => removeItem(item.id)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full text-sm hover:bg-red-600 transition"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-gray-900 mb-1 leading-tight">
                        {item.name}
                      </h3>
                      <p className="text-2xl font-black text-gray-900">
                        ${item.price.toFixed(2)}
                      </p>

                      {/* Qty Controls */}
                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center bg-gray-100 rounded-lg p-1">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded transition"
                            disabled={item.qty <= 1}
                          >
                            <Minus size={18} />
                          </button>
                          <span className="w-12 text-center font-bold text-lg px-3">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded transition"
                          >
                            <Plus size={18} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">
                        ${(item.price * item.qty).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sticky top-8 h-fit">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-700">
                      Subtotal (
                      {cartItems.reduce((sum, item) => sum + item.qty, 0)}{" "}
                      items):
                    </span>
                    <span className="font-bold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-700">Tax (10%):</span>
                    <span className="font-bold">${tax.toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-gray-200 my-2"></div>
                  <div className="flex justify-between text-2xl font-black text-gray-900">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() =>
                    alert(
                      `Proceeding to checkout with $${total.toFixed(2)} total!`,
                    )
                  }
                  style={{
                    backgroundImage: `linear-gradient(to right, ${darkBlue}, ${lightBlue})`,
                  }}
                  className="w-full cursor-pointer text-white py-4 px-6 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 mb-4"
                >
                  Proceed to Checkout →
                </button>

                <a
                  href="/shop"
                  style={{ backgroundColor: lightBlue }}
                  // 'block', 'w-full' aur 'text-center' add kiya gaya hai
                  className="block w-full text-center text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = darkBlue)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = lightBlue)
                  }
                >
                  Continue Shopping
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
