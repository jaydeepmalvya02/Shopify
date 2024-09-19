import React from 'react'
import {Link,useNavigate} from 'react-router-dom';


const Nav = () => {
  const auth=localStorage.getItem('user');
  const navigate=useNavigate();
  const logout=()=>{
    localStorage.clear();
    navigate('/signup')
  }
  return (
    <div>
      <img id='logo' alt='logo' src='https://download.logo.wine/logo/Shopify/Shopify-Logo.wine.png'/>
      {
        auth ?
      
      <ul className="nav-ul">
      <li><Link to="/">Products</Link></li>
      <li><Link to="/add">Add Products</Link> </li>
      <li><Link to="/update/:id">Update Products</Link> </li>
      <li><Link onClick={logout} to="/signup">logout ({JSON.parse(auth).name})</Link></li>
      </ul>
        :
        <ul className="nav-ul nav-right">
        <li><Link to="/signup">Sign Up</Link></li>
        <li><Link to="/login">Login</Link> </li>
        </ul>

      }
      {/* <li><Link to="/logout">logout</Link> </li> */}
      
      
      
    </div>
)
}


export default Nav
