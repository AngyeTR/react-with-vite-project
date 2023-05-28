import { useRoutes, BrowserRouter, Navigate } from "react-router-dom"
import { ShoppingCartContext, ShoppingCartProvider, initializeLocalStorage } from "../../Context"
import Home from "../Home"
import Login from"../Login"
import MyAccount from "../MyAccount"
import MyOrder from "../MyOrder"
import MyOrders from "../MyOrders"
import NotFound from "../NotFound"
import NavBar from "../../Components/NavBar"
import './App.css'
import CheckoutSideMenu from "../../Components/CheckoutSideMenu"
import { useContext } from "react"


const AppRoutes = () => {
const context = useContext(ShoppingCartContext);
const account = localStorage.getItem("account");
const parsedAccount = JSON.parse(account);
const logOut = localStorage.getItem("log-out");
const parsedLogOut = JSON.parse(logOut);

const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true;
const noAccountInLocalState = Object.keys(context.account).length === 0;
const hasUserAccount = !noAccountInLocalState || !noAccountInLocalStorage;
const isUserLogOut = context.logOut || parsedLogOut;

  let routes = useRoutes([
    { path:"/", element: hasUserAccount && !isUserLogOut ? <Home/> : <Navigate  replace to={"/login"}/>}, 
    { path:"/clothes", element: hasUserAccount && !isUserLogOut ? <Home/> : <Navigate  replace to={"/login"}/>}, 
    { path:"/electronics", element: hasUserAccount && !isUserLogOut ? <Home/> : <Navigate  replace to={"/login"}/>}, 
    { path:"/furnitures", element: hasUserAccount && !isUserLogOut ? <Home/> : <Navigate  replace to={"/login"}/>}, 
    { path:"/toys", element: hasUserAccount && !isUserLogOut ? <Home/> : <Navigate  replace to={"/login"}/>}, 
    { path:"/others", element: hasUserAccount && !isUserLogOut ? <Home/> : <Navigate  replace to={"/login"}/>}, 
    { path:"/login", element: <Login/> },
    { path:"/my-account", element: <MyAccount/> },
    { path:"/my-order", element: <MyOrder/> },
    { path:"/my-orders", element: <MyOrders/> },
    { path:"/my-orders/last", element: <MyOrder/> },
    { path:"/my-orders/:id", element: <MyOrder/> },
    { path:"/*", element: <NotFound/> }
  ])

  return routes;

}

const  App = () => {
  initializeLocalStorage()

  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <NavBar/>
        <AppRoutes/>
        <CheckoutSideMenu/>
      </BrowserRouter>
    </ShoppingCartProvider>
  )
}

export default App
