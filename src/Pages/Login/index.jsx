import { Link, Navigate } from "react-router-dom";
import Layout from "../../Components/Layout";
import { useContext, useState, useRef } from "react";
import { ShoppingCartContext } from "../../Context";

function Login(){
    const context = useContext(ShoppingCartContext);
    const [view, setView] = useState("user-info");
    const form = useRef(null);
    const account = localStorage.getItem("account");
    const parsedAccount = JSON.parse(account);

    const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true;
    const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true;
    const hasUserAccount = !noAccountInLocalState || !noAccountInLocalStorage;

    const createAnAccount = () => {
        const formData = new FormData(form.current);
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password")
        }
        const stringifiedAccount = JSON.stringify(data);
        localStorage.setItem("account", stringifiedAccount);
        context.setAccount(data);

        handleLogIn();
    }

    const renderCreateUserInfo = () => {
        return (
            <SignupForm handleOnClick={createAnAccount}/>
        )
    }

    const renderView = () => view === "create-user-info" ? renderCreateUserInfo() : renderLogIn();

    const handleLogIn = () => {
        const stringifiedLogOut = JSON.stringify(false);
        localStorage.setItem("log-out", stringifiedLogOut);
        context.setLogOut(false)

        
        return<Navigate replace to={"/"}/>
    };

    const SignupForm = () =>{
        return (
            <form 
        ref={form}
        className="flex flex-col gap-4 w-80">
            <div
            className="flex flex-col gap-1">
                <label 
                htmlFor="name" className="font-light text-sm">
                    Your Name: 
                </label>
                <input
                type="text"
                id="name"
                name="name"
                defaultValue={parsedAccount?.name} 
                placeholder="Peter"
                className="rounded-lg border border-black placeholer:font-light
                placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
                />
            </div>
            <div className="flex flex-col gap-1">
            <label 
                htmlFor="email" className="font-light text-sm">
                    Your Email: 
                </label>
                <input
                type="text"
                id="email"
                name="email"
                defaultValue={parsedAccount?.email} 
                placeholder="Peter@example.com"
                className="rounded-lg border border-black placeholer:font-light
                placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
                />
            </div>
            <div className="flex flex-col gap-1">
                <label 
                htmlFor="password" className="font-light text-sm">
                    Your Password: 
                </label>
                <input
                type="text"
                id="password"
                name="password"
                defaultValue={parsedAccount?.password} 
                placeholder="********"
                className="rounded-lg border border-black placeholer:font-light
                placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
                />
            </div>
            <Link to="/">
                <button className="bg-gray-400 w-full rounded-lg py-3"
                onClick={() => createAnAccount()}>
                    Create
                </button>
            </Link>
        </form>
        )
    }
    
    const renderLogIn = () => {
        return (
            <div className="flex flex-col w-80">
            <p>
                <span className="font-light text-sm">Email</span>
                <span>{parsedAccount?.email}</span>
            </p>
            <p>
                <span className="font-light text-sm">Password</span>
                <span>{parsedAccount?.password}</span>
            </p>
            <Link to="/">
                <button 
                disabled={!hasUserAccount}
                onClick={() => handleLogIn()}
                className="rounded-lg bg-gray-300 py-3 px-4 w-full mt-4 mb-2 disabled:bg-gray-200">
                    Login
                </button>
            </Link>
            <div className="text-center">
                <a 
                className="font-light text-xs underline underline-offset-4"
                href="/"> Forgot my password</a>    
            </div>    
            <button 
            onClick={() => setView("create-user-info")}
            disabled={hasUserAccount}
            className="border border-black disabled:text-black/40 disabled:border-black/40 rounded-lg mt-6 py-3">
                SignUp
            </button>
          </div>
        )
    };

    return(
        <Layout>
            <h1 className="font-medium text-xl">
            Welcome
          </h1>
          {renderView()}
        </Layout>        
    )
}

export default Login;