import "./NavBar.css"
import { Link } from "react-router-dom"
// Creating and exporting the navbar component and linking it to the
//main pages of the app which are:
//homepage, AniDex page, collection page, and log new animal page.
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