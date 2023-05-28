import {useState, useContext } from "react"
import Layout from "../../Components/Layout"
import Card from "../../Components/Card"
import NotFound from "../../Pages/NotFound"
import ProductDetail from "../../Components/ProductDetail";
import { ShoppingCartContext } from "../../Context";

function Home() {

  const context = useContext(ShoppingCartContext);
  const renderView = () => {
    if(context.filteredItems?.length > 0){
      return (
        context.filteredItems?.map((item)=> 
        (
        <Card  key={item.id} data={item}/>
        )
        )
        
      )
    }
    else {
      return (
        <NotFound/>
      )
    }
  }
  
    return (
      <Layout>
        <h1 className="font-medium text-xl"> Exclusive Products </h1>
        <input 
        type="text" placeholder="Search"
        className="rounded border border-gray-400 w-80 p-2 m-4 focus:outline-none"
        onChange={(event)=> context.setSearchByTitle(event.target.value) }/>
      
      <div className="m-8 grid gap-4 grid-cols-1 w-full max-w-screen-lg md:grid-cols-3 lg:grid-cols-4">
      { renderView() }
      </div>
      <ProductDetail/>
      </Layout>
    )
  }
  
  export default Home