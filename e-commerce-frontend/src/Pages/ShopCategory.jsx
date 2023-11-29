import React, { useEffect, useState } from "react";
import "./CSS/ShopCategory.css";
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from "../Components/Item/Item";
import { Link } from "react-router-dom";

const ShopCategory = (props) => {
  const [allproducts, setAllProducts] = useState([]);
  const [sortingOrder, setSortingOrder] = useState("default"); // Default sorting order

  const fetchInfo = () => {
    fetch('http://localhost:4000/allproducts')
      .then((res) => res.json())
      .then((data) => setAllProducts(data))
  }

  useEffect(() => {
    fetchInfo();
  }, [])

  // Function to handle sorting order change
  const handleSortingChange = (event) => {
    setSortingOrder(event.target.value);
  };

  // Function to sort products by price
  const sortProducts = (products) => {
    if (sortingOrder === "lowToHigh") {
      return products.slice().sort((a, b) => a.new_price - b.new_price);
    } else if (sortingOrder === "highToLow") {
      return products.slice().sort((a, b) => b.new_price - a.new_price);
    } else {
      // Default order (no sorting)
      return products;
    }
  };

  return (
    <div className="shopcategory">
      <img src={props.banner} className="shopcategory-banner" alt="" />
      <div className="shopcategory-indexSort">
        <p><span>Showing 1 - 12</span> out of 54 Products</p>
        <div className="shopcategory-sort">
        
          <select onChange={handleSortingChange} value={sortingOrder}>
            <option value="default">DEFAULT</option>
            <option value="lowToHigh">A-Z: LOW TO HIGH</option>
            <option value="highToLow">Z-A: HIGH TO LOW</option>
          </select>
        </div>
      </div>
      <div className="shopcategory-products">
        {sortProducts(allproducts).map((item, i) => {
          if (props.category === item.category) {
            return <Item id={item.id} key={i} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />;
          } else {
            return null;
          }
        })}
      </div>
      <div className="shopcategory-loadmore">
        <Link to='/' style={{ textDecoration: 'none' }}>Explore More</Link>
      </div>
    </div>
  );
};

export default ShopCategory;
