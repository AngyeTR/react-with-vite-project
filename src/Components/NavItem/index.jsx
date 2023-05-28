import { NavLink } from "react-router-dom";

const NavItem = ({ to, children, activeStyle, liStyle, onClick }) => {
    return (
        <li
        key={children}
        className= {liStyle}>
            <NavLink
            to={`/${to}`}
            onClick={onClick}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        {children}
      </NavLink>
        </li>
      
    );
  };

  export default NavItem;