import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

const ProductList = () => {
  const [products,setProucts]=useState([]);
  useEffect(()=>{
    getProducts();
  },[])
  const getProducts=async ()=>{
    let result= await fetch('http://localhost:5000/products')
    result=await result.json();

    setProucts(result);
  }
  
  const deleteProduct=async(id)=>{
    console.warn(id)
    let result=await fetch(`http://localhost:5000/products/${id}`,{
      method:"Delete"

    })
    result=await result.json();
    if (result){
      getProducts()
      alert("Product deleted")
    }
  }
  const searchHandle=async(event)=>{
    let key=event.target.value;
    if (key){
      let result=await fetch(`http://localhost:5000/search/${key}`)
      result=await result.json();
      if(result){
        setProucts(result)
      }
    }
    else{
      getProducts()
    }
    

  }
  return (
    <div className='product-list'>
      <h3>ProductList</h3>
      <input type='' className='search-product-box' placeholder='Search Product' onChange={searchHandle}/>
      <ul>
    <li>S.NO.</li>
    <li>Name</li>
    <li>Price</li>
    <li>Category</li>
    <li>Operation</li>
  </ul>
  {
   products.length>0 ? products.map((item,index)=>
      <ul key={item._id}>
    <li>{index+1}</li>
    <li>{item.name}</li>
    <li>{item.price}</li>
    <li>{item.category}</li>
    <li><button onClick={()=>deleteProduct(item._id)}>Delete</button>
    <Link to={"/update/"+item._id}>Update</Link>
    </li> 
  </ul>
    )
    :<h1>No Result Found</h1>
  }
    </div>
  )
}

export default ProductList
