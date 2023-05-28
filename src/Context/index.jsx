import { createContext, useState, useEffect, } from "react";

export const ShoppingCartContext = createContext();

export const initializeLocalStorage = () => {
    const accountInLocalStorage = localStorage.getItem("account");
    const logOutInLocalStorage = localStorage.getItem("log-out");
    let parsedAccount;
    let parsedLogOut;

    if (!accountInLocalStorage) {
        localStorage.setItem("account", JSON.stringify({}))
        parsedAccount = {};
    }
    else {
        parsedAccount = JSON.parse(accountInLocalStorage)
    }

    if (!logOutInLocalStorage) {
        localStorage.setItem("log-out", JSON.stringify(false));
        parsedLogOut = false;
    }
    else {
        parsedLogOut = JSON.parse(logOutInLocalStorage);
    }
}


export const ShoppingCartProvider = ({ children }) => {
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [order, setOrder] = useState([]);
    const [productsInCart, setProductsInCart] = useState([]);
    const [items, setItems] = useState(null);
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchByTitle, setSearchByTitle] = useState(null);
    const [searchByCategory, setSearchByCategory] = useState(null);
    const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    images: [],
});

    const [account, setAccount] = useState({});
    const [logOut, setLogOut] = useState(false);

    useEffect(() => {
        fetch("https://api.escuelajs.co/api/v1/products")
        .then(response => response.json())
        .then(data => setItems(data))
    }, []);

    const filteredItemsByTitle = (items, searchByTitle) => {    
        return items?.filter(item => item.title?.toLowerCase().includes(searchByTitle?.toLowerCase()))
    }

    const filteredItemsByCategory = (items, searchByCategory) => {    
        return items?.filter(item => item.category?.name?.toLowerCase().includes(searchByCategory?.toLowerCase()))
    }

    const filterBy = (searchType) => {
        if(searchType === "BY_TITLE"){
            return filteredItemsByTitle(items, searchByTitle)
        }
        if(searchType === "BY_CATEGORY"){
            return filteredItemsByCategory(items, searchByCategory)
        }
        if(searchType === "BY_CATEGORY_AND_BY_TITLE"){
            return filteredItemsByCategory(items, searchByCategory).filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
        }
        if(searchType == null){
            return items
        }
    }
    
    useEffect(()=> {
        if(searchByCategory && searchByTitle) setFilteredItems(filterBy("BY_CATEGORY_AND_BY_TITLE"))
        if(searchByTitle && !searchByCategory) setFilteredItems(filterBy("BY_TITLE"))
        if(searchByCategory && !searchByTitle) setFilteredItems(filterBy("BY_CATEGORY"))
        if(!searchByCategory && !searchByTitle) setFilteredItems(filterBy(null))
        
    }, [items, searchByTitle, searchByCategory])

    
    const openDetail = () =>{
        setIsDetailOpen(true);
    };
    const closeDetail = () =>{
        setIsDetailOpen(false);
    };

    const openCheckout = () =>{
        setIsCheckoutOpen(true);
    };
    const closeCheckout = () =>{
        setIsCheckoutOpen(false);
    };

    return (
        <ShoppingCartContext.Provider value={{  
            isDetailOpen,
            openDetail,
            closeDetail,
            isCheckoutOpen,
            openCheckout,
            closeCheckout,
            product,
            setProduct,
            productsInCart,
            setProductsInCart, 
            order, 
            setOrder, 
            items, 
            setItems, 
            searchByTitle, 
            setSearchByTitle,
            searchByCategory,
            setSearchByCategory,
            filteredItems, 
            setFilteredItems,
            account, 
            setAccount,
            logOut,
            setLogOut}}>
            {children}    
        </ShoppingCartContext.Provider>
    )
}

