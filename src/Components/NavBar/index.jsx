import NavItem from "../NavItem";
import { menu1, menu2 } from "../../Assests/Menus";
import { useContext } from "react";
import { ShoppingCartContext, initializeLocalStorage } from "../../Context";
import ShoppingCart from "../ShoppingCart";

const NavBar = () => {
    const activeStyle = "underline underline-offset-4";
    const context = useContext(ShoppingCartContext);
    
    const logOut = localStorage.getItem("log-out");
    const parsedLogOut = JSON.parse(logOut);
    const isUserLogOut = context.logOut || parsedLogOut;

    const account = localStorage.getItem("account");
    const parsedAccount= JSON.parse(account);
    const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true;
    const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true;
    const hasUserAccount = !noAccountInLocalState || !noAccountInLocalStorage;

    
    function handleCategoryClick(category) {
         context.setSearchByCategory(category)
    }

    const handleLogOut = () => {
        const stringifiedLogOut = JSON.stringify(true);
        localStorage.setItem("log-out", stringifiedLogOut);
        context.setLogOut(true);
    };

    const renderView = () => {
        if (hasUserAccount && !isUserLogOut) {
            return(
                <>
                <li>
                    <a href="https://github.com/AngyeTR" 
                    className="text-black/60"> {context.account?.email} </a>
                </li>
            { menu2.map( item => (
                    <NavItem 
                        key={item.text}
                        to={item.to}
                        activeStyle={activeStyle}
                        liStyle={item.className}
                        onClick={() => handleCategoryClick(item.to)}
                    >
                        {item.text}
                    </NavItem>  
            ))}  
              <NavItem 
                        key="logout"
                        to="login"
                        activeStyle={activeStyle}
                        liStyle= ""
                        onClick={() => handleLogOut()}
                    >
                        Logout
                </NavItem>  
                </>
            )
        }
        else {
            return (
                <NavItem 
                        key="login"
                        to="login"
                        activeStyle={activeStyle}
                        liStyle= ""
                    >
                        Login
                </NavItem>                 
            )
        }
    };
   
    return (
        <nav className="bg-white md:flex justify-between items-center fixed z-10 w-full py-3 md:py-4 px-1 md:px-8 text-xs md:text-sm font-light top-0">
            <ul className="flex items-center gap-3">
            <NavItem 
                        key="home"
                        to={`${isUserLogOut ? "login" : ""}`}
                        liStyle="font-semibold text-lg"
                    >
                        Shopi
                    </NavItem>  

            { menu1.map( item => (
                    <NavItem 
                        key={item.text}
                        to={item.to}
                        activeStyle={activeStyle}
                        liStyle={item.className}
                        onClick={() => handleCategoryClick(item.to)}
                    >
                        {item.text}
                    </NavItem>  
            ))}
            </ul> 
            <ul className="flex items-center gap-3">
                {renderView()}
                <li className="flex items-center">
                   <ShoppingCart/>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;