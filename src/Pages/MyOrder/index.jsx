import { useContext } from "react";
import { Link } from "react-router-dom";
import Layout from "../../Components/Layout";
import { ShoppingCartContext } from "../../Context";
import OrderCard from "../../Components/OrderCard";

function MyOrder(){
  const context = useContext(ShoppingCartContext);
  const path = window.location.pathname.split("/");
  let index= path[path.length -1];

  if (index === "last") {
    index = context.order?.length -1
  }

    return (
         <Layout>
           <div className="flex relative justify-center w-80 items-center p-4">
          <Link to="/my-orders"
          className="absolute left-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </Link>
          <h1 className="font-medium text-xl">
            My Order
          </h1>
        </div>
    

           <div className="flex flex-col w-80 overflow-y-scroll">
           {
                context.order?.[index]?.products?.map(product => {
                    return (
                        <OrderCard 
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    imageUrl={product.images}
                    />
                    )
                })
            }
          </div>

         </Layout>
    )
}

export default MyOrder;