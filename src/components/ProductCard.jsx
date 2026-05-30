import { useState } from "react"
import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import "../pages/ProductDetail.css" // Import shared styling for the premium Toast animations

export default function ProductCard({ product }) {
    const { addToCart, cartItems } = useCart();
    const producInCart = cartItems.find((item) => item.id === product.id);
    const quantityInCart = producInCart ? `(${producInCart.quantity})` : "";
    
    const [showToast, setShowToast] = useState(false);
    const [toastTimeoutId, setToastTimeoutId] = useState(null);

    const handleAddToCart = () => {
        addToCart(product.id);
        
        // Clear any active toast timeouts to reset animation duration
        if (toastTimeoutId) {
            clearTimeout(toastTimeoutId);
        }

        setShowToast(true);

        const timeoutId = setTimeout(() => {
            setShowToast(false);
        }, 3000);

        setToastTimeoutId(timeoutId);
    };

    return (
        <div className="product-card" >
            <img src={product.image} alt={product.name} className="product-card-image" />
            <div className="product-card-content">
                <h3 className="product-card-name">{product.name}</h3>
                <p className="product-card-price">${product.price}</p>
                <div className="product-card-actions">
                    <Link to={`/product/${product.id}`} className="btn btn-secondary" >View Detail</Link>
                    <button className="btn btn-primary" onClick={handleAddToCart}>
                        Add to Cart {quantityInCart}
                    </button>
                </div>
            </div>

            {/* Premium Card-Level Toast Overlay */}
            {showToast && (
                <div className="card-toast-overlay" id={`card-toast-${product.id}`}>
                    <div className="card-toast-icon">✓</div>
                    <h4 className="card-toast-title">Added to Cart!</h4>
                    <p className="card-toast-message">
                        {product.name} added to bag.
                    </p>
                    <button 
                        className="card-toast-close" 
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowToast(false);
                        }}
                    >
                        Keep Shopping
                    </button>
                </div>
            )}
        </div>
    )
}
