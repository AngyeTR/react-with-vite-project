import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import ProductDetail from "../ProductDetail";

const Card = (data) => {
    const context = useContext(ShoppingCartContext);

    const showProduct = (product) => {
        context.openDetail()
        context.setProduct(product)
    } 

    const addProduct = (event, productData) => {
        event.stopPropagation();
        context.setProductsInCart([...context.productsInCart, productData]);
        context.openCheckout();
        context.closeDetail();
    };

    const renderIcon = (id) => {
        const isAdded = context.productsInCart.filter(product => product.id === id).length > 0
        
        if (isAdded){
            return (
                <div 
                className="absolute top-1 right-1 flex justify-center items-center bg-white w-6 h-6 rounded-full font-bold p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                </div>
            );
        }
        
        return (
            <div 
            onClick={(event) => addProduct(event, data.data)}
            className="absolute top-1 right-1 flex justify-center items-center bg-white w-6 h-6 rounded-full font-bold p-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
            </div>
        );
    };

    return (
        <div 
        onClick={()=> showProduct(data.data)}
        className="bg-white cursor-pointer w-56 h-60">
            <figure className="relative mb-2 w-full h-4/5">
                <span className="absolute bottom-1 left-1 bg-white/60 rounded-lg text-black text-xs px-1 py-0.5">
                    {data.data.category.name}
                </span>
                <img 
                src={data.data.images[0]} 
                alt={data.data.title} 
                className="w-full h-full object-cover rounded-lg"/>

               {renderIcon(data.data.id)}
            </figure>
            <p className="flex justify-between items-center">
                <span className="text-sm font-light">{data.data.title} </span>
                <span className="text-lg font-medium">${data.data.price} </span>
            </p>
        </div>
    )
};

export default Card;