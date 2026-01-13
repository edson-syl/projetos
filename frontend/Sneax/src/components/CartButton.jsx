import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import "./CartButton.css";

function CartButton() {
  return (
    <div className="cart-button">
      <Link to="/carrinho">
        <FaShoppingCart size={30} color="white" />
      </Link>
    </div>
  );
}

export default CartButton;
