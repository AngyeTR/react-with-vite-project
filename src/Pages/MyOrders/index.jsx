import { useContext } from "react";
import { Link } from "react-router-dom";
import Layout from "../../Components/Layout";
import OrdersCard from "../../Components/OrdersCard";
import { ShoppingCartContext } from "../../Context";


function MyOrders(){
  const context = useContext(ShoppingCartContext);
    return (
      <Layout>
         <h1 className="font-medium text-xl">
            My Orders
          </h1>
        {
          context.order?.map((order, index)=> 
          (
           <Link key={index} to={`/my-orders/${index}`}>
            <OrdersCard 
            date={order.date}
            totalPrice={order.totalPrice}
            totalProducts={order.totalProducts}/>
           </Link>
          )
          )
        }
        
      </Layout>
    )
}

export default MyOrders;