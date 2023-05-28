import { useContext } from "react";
import "./styles.css"
import { ShoppingCartContext } from "../../Context";
const ProductDetail = () => {

    const context = useContext(ShoppingCartContext);

    return (
        <aside 
        className={`${context.isDetailOpen ? "flex" : "hidden"} p-6 product-detail flex-col fixed bg-white right-0 border border-black rounded-lg`}>
            <div className="flex justify-between items-center">
                <h2 className="font-medium text-xl m-4">Detail 
                </h2>
                <div
                className="cursor-pointer"
                onClick={()=>{context.closeDetail()}}>
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                   </svg>
                </div>
            </div>

            <figure className="px-6">
                <img 
                src={context.product.images[0]} 
                alt={context.product.title}
                className="w-full rounded-lg"/>
                <p className="flex flex-col p-6">
                    <span className="font-medium text-2xl">$ {context.product.price}</span>
                    <span className="font-medium text-lg">{context.product.title}</span>
                    <span className="font-light text-md">{context.product.description}</span>
                </p>
            </figure>

        </aside>
    );
};

export default ProductDetail;