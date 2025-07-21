import "./NavBar.css"
import { Link } from "react-router-dom"

export const NavBar = () => {
    return (<ul className="navbar">
      <li className="navbar-item">
        <Link to="/home">Home</Link>
      </li>
      <li className="navbar-item">
        <Link to="/AniDex_Database">AniDex</Link> 
      </li>
      <li className="navbar-item">
        <Link to="/Collection">Collection</Link> 
      </li>
      <li className="navbar-item">
        <Link to="/Log_New_Animal">Log</Link> 
      </li>
    </ul>)
}