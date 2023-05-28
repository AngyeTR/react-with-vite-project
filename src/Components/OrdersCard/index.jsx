
const OrdersCard = props => {
    const { date, totalPrice, totalProducts} = props;
    
    return (
        <div className=" flex justify-between items-center m-2 border rounded-lg p-6">
            <div  >
                <p className="flex justify-between items-center">
                    <span className="text-md font-medium pl-2">{date}</span>
                    <span className="text-md font-medium pl-8">{totalProducts} Article(s)</span>
                    <span className="text-xs font-light pl-8">Total: </span>
                    <span className="text-md font-medium pl-2">${totalPrice}</span>
                    
                </p>
            </div>
            <div className="px-8">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </div>
        </div>
        
    )

};

export default OrdersCard;