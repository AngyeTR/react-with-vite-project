import { useContext } from "react";
import { Link } from "react-router-dom";
import "./styles.css"
import { ShoppingCartContext } from "../../Context";
import OrderCard from "../OrderCard";
import  {totalPrice}  from "../../Assests/Utils/index"


const CheckoutSideMenu = () => {
    const context = useContext(ShoppingCartContext);
    const handleDelete = (id) => {
        const filteredProducts = context.productsInCart.filter(product => product.id != id)
        context.setProductsInCart(filteredProducts);
    };

    const handleCheckout = () => {
        let date = new Date();
    console.log(date);
        const orderToAdd = {
            date: date.toLocaleDateString(),
            products: context.productsInCart,
            totalProducts: context.productsInCart.length,
            totalPrice: totalPrice(context.productsInCart)
        }

        context.setOrder([...context.order, orderToAdd])
        context.setProductsInCart([]);
        context.setSearchByTitle(null);
        context.closeCheckout();
    };


    return (
        <aside 
        className={`${context.isCheckoutOpen ? "flex" : "hidden"} checkout-side-menu flex-col fixed bg-white right-0 border border-black rounded-lg`}>
            <div className="flex justify-between items-center px-6 py-2">
                <h2 className="font-medium text-xl m-4">My Order 
                </h2>
                <div
                className="cursor-pointer"
                onClick={()=>{context.closeCheckout()}}>
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                   </svg>
                </div>
            </div>
          <div className="px-8 overflow-y-scroll">
          {
                context.productsInCart.map((product) => {
                    return (
                        <OrderCard 
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    imageUrl={product.images}
                    handleDelete={handleDelete}/>
                    )
                })
            }
          </div>

          <div className="fixed justify-between items-center bottom-0 px-6 py-4 total-price bg-white" >
            <p className="flex justify-between items-center">
                <span className="font-light text-lg">  Total:  </span>
                <span className="text-2xl font-medium">${totalPrice(context.productsInCart)} </span>
            </p>
            <Link to="/my-orders/last">
                <button 
                className="rounded-lg bg-gray-300 py-2 px-4 w-full"
                onClick={()=>handleCheckout()}>Checkout</button>
            </Link>
            
          </div>
        </aside>
    );
};

export default CheckoutSideMenu;