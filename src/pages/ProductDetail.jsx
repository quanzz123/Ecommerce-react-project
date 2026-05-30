import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getProductById, getProducts } from "../data/products";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState("");
  const [isWishlistActive, setIsWishlistActive] = useState(false);
  const [selectedColor, setSelectedColor] = useState("Midnight Black");
  const [selectedSize, setSelectedSize] = useState("Standard");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("specs");
  const [showToast, setShowToast] = useState(false);
  const [toastTimeoutId, setToastTimeoutId] = useState(null);

  // List of elegant colors
  const colors = [
    { name: "Midnight Black", hex: "#18181b", class: "dark-color" },
    { name: "Space Gray", hex: "#71717a", class: "medium-color" },
    { name: "Chrome Silver", hex: "#e4e4e7", class: "light-color" },
    { name: "Rose Gold", hex: "#fecdd3", class: "light-color" },
  ];

  // List of mock variants
  const sizes = ["Standard", "Pro Edition", "Ultimate Custom"];

  useEffect(() => {
    // Scroll to the top of the page when the product ID changes
    window.scrollTo({ top: 0, behavior: "smooth" });

    const foundproduct = getProductById(id);
    if (!foundproduct) {
      navigate("/"); // Redirect to home if product not found
      return;
    }
    setProduct(foundproduct);
    setActiveImg(foundproduct.image);
    
    // Reset selections on product change
    setQuantity(1);
    setIsWishlistActive(false);
    setSelectedColor("Midnight Black");
    setSelectedSize("Standard");
  }, [id, navigate]);

  if (!product) {
    return (
      <div className="product-detail-container" style={{ textAlign: "center", padding: "5rem 0" }}>
        <h2>Loading product details...</h2>
      </div>
    );
  }

  // Related products (excluding the current one, limiting to 3)
  const relatedProducts = getProducts()
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    // Clear existing timeout if user clicks rapidly
    if (toastTimeoutId) {
      clearTimeout(toastTimeoutId);
    }
    
    setShowToast(true);
    
    const timeoutId = setTimeout(() => {
      setShowToast(false);
    }, 3000);
    
    setToastTimeoutId(timeoutId);
  };

  const incrementQty = () => setQuantity((prev) => Math.min(prev + 1, 99));
  const decrementQty = () => setQuantity((prev) => Math.max(prev - 1, 1));

  return (
    <div className="product-detail-container" id={`product-detail-page-${product.id}`}>
      
      {/* Back to Home Button */}
      <Link to="/" className="back-btn" id="back-to-home-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <span>Back to Shop</span>
      </Link>

      {/* Main Details Grid */}
      <main className="product-detail-grid">
        
        {/* Left Column: Image Gallery */}
        <section className="image-gallery">
          <div className="main-image-wrapper">
            <img 
              src={activeImg} 
              alt={product.name} 
              className="main-product-image"
              id="main-zoom-image"
            />
            {/* Wishlist toggle button */}
            <button 
              className={`wishlist-btn ${isWishlistActive ? "active" : ""}`}
              onClick={() => setIsWishlistActive(!isWishlistActive)}
              aria-label="Add to wishlist"
              id="btn-wishlist-toggle"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>

          {/* Interactive Thumbnails */}
          <div className="thumbnails-container">
            {/* Thumbnail 1: Normal Product Image */}
            <div 
              className={`thumbnail-item ${activeImg === product.image ? "active" : ""}`}
              onClick={() => setActiveImg(product.image)}
              id="thumb-image-0"
            >
              <img src={product.image} alt={`${product.name} Thumbnail 1`} />
            </div>

            {/* Thumbnail 2: Modified view using simple CSS filters to mock different color variants */}
            <div 
              className={`thumbnail-item ${activeImg === `${product.image}&hue=90` ? "active" : ""}`}
              onClick={() => setActiveImg(`${product.image}&hue=90`)}
              style={{ filter: "hue-rotate(90deg)" }}
              id="thumb-image-1"
            >
              <img src={product.image} alt={`${product.name} Thumbnail 2`} />
            </div>

            {/* Thumbnail 3: Vintage effect filter */}
            <div 
              className={`thumbnail-item ${activeImg === `${product.image}&sepia=1` ? "active" : ""}`}
              onClick={() => setActiveImg(`${product.image}&sepia=1`)}
              style={{ filter: "sepia(0.8) contrast(1.2)" }}
              id="thumb-image-2"
            >
              <img src={product.image} alt={`${product.name} Thumbnail 3`} />
            </div>

            {/* Thumbnail 4: High-contrast saturated view */}
            <div 
              className={`thumbnail-item ${activeImg === `${product.image}&saturate=2` ? "active" : ""}`}
              onClick={() => setActiveImg(`${product.image}&saturate=2`)}
              style={{ filter: "saturate(1.8) brightness(0.9)" }}
              id="thumb-image-3"
            >
              <img src={product.image} alt={`${product.name} Thumbnail 4`} />
            </div>
          </div>
        </section>

        {/* Right Column: Product Info Panel */}
        <section className="product-info-panel">
          <div className="badge-row">
            <span className="brand-label">Premium Electronics</span>
            <div className="stock-badge">
              <span className="stock-dot"></span>
              <span>In Stock</span>
            </div>
          </div>

          <h1 className="product-detail-name">{product.name}</h1>

          {/* Reviews Star Rating */}
          <div className="rating-container" id="product-rating-interactive">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
              ))}
            </div>
            <span className="rating-text">4.8</span>
            <span className="review-count">(124 customer reviews)</span>
          </div>

          {/* Price & Discounts Section */}
          <div className="price-section">
            <span className="price-main">${product.price}</span>
            <span className="price-original">${(product.price * 1.25).toFixed(2)}</span>
            <span className="discount-badge">Save 20%</span>
          </div>

          <p className="product-detail-description">{product.description}</p>

          {/* Marketing Promotions banner */}
          <div className="promos-list">
            <div className="promo-item">
              <span className="promo-icon">✓</span>
              <span>Free global shipping on orders over $50</span>
            </div>
            <div className="promo-item">
              <span className="promo-icon">✓</span>
              <span>12 months full warranty cover included</span>
            </div>
          </div>

          {/* Color Customizer */}
          <div className="customizer-item" id="color-custom-picker">
            <div className="customizer-label">
              Color: <span>{selectedColor}</span>
            </div>
            <div className="color-picker">
              {colors.map((c) => (
                <button
                  key={c.name}
                  className={`color-option ${c.class} ${selectedColor === c.name ? "active" : ""}`}
                  style={{ backgroundColor: c.hex }}
                  onClick={() => setSelectedColor(c.name)}
                  aria-label={`Select ${c.name} color`}
                  id={`color-opt-${c.name.toLowerCase().replace(" ", "-")}`}
                />
              ))}
            </div>
          </div>

          {/* Size / Variant Options */}
          <div className="customizer-item" id="size-custom-picker">
            <div className="customizer-label">
              Edition: <span>{selectedSize}</span>
            </div>
            <div className="variant-picker">
              {sizes.map((s) => (
                <button
                  key={s}
                  className={`variant-option ${selectedSize === s ? "active" : ""}`}
                  onClick={() => setSelectedSize(s)}
                  id={`size-opt-${s.toLowerCase().replace(" ", "-")}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity selector */}
          <div className="quantity-control-row">
            <span className="customizer-label">Quantity</span>
            <div className="qty-picker" id="quantity-adjuster">
              <button 
                className="qty-btn" 
                onClick={decrementQty}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
                id="btn-qty-minus"
              >
                −
              </button>
              <span className="qty-val" id="qty-display-value">{quantity}</span>
              <button 
                className="qty-btn" 
                onClick={incrementQty}
                disabled={quantity >= 99}
                aria-label="Increase quantity"
                id="btn-qty-plus"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Actions */}
          <div className="purchase-actions">
            <button 
              className="btn-add-cart" 
              onClick={handleAddToCart}
              id="btn-action-add-to-cart"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span>Add to Cart</span>
            </button>
            <button 
              className="btn-buy-now" 
              onClick={handleAddToCart}
              id="btn-action-buy-now"
            >
              Buy It Now
            </button>
          </div>

        </section>
      </main>

      {/* Tabs Layout */}
      <section className="tabs-section" id="product-tabs-section">
        <nav className="tabs-nav" aria-label="Product Information tabs">
          <button 
            className={`tab-trigger ${activeTab === "specs" ? "active" : ""}`}
            onClick={() => setActiveTab("specs")}
            id="tab-trigger-specs"
          >
            Specs & Details
          </button>
          <button 
            className={`tab-trigger ${activeTab === "shipping" ? "active" : ""}`}
            onClick={() => setActiveTab("shipping")}
            id="tab-trigger-shipping"
          >
            Shipping & Returns
          </button>
          <button 
            className={`tab-trigger ${activeTab === "reviews" ? "active" : ""}`}
            onClick={() => setActiveTab("reviews")}
            id="tab-trigger-reviews"
          >
            Reviews (124)
          </button>
        </nav>

        {/* Tab Content Panes */}
        <div className="tab-pane-content">
          {activeTab === "specs" && (
            <div className="spec-list" id="pane-specs">
              <div className="spec-item">
                <span className="spec-name">Material</span>
                <span className="spec-value">Aerospace Aluminum</span>
              </div>
              <div className="spec-item">
                <span className="spec-name">Connectivity</span>
                <span className="spec-value">Bluetooth 5.2 / USB-C</span>
              </div>
              <div className="spec-item">
                <span className="spec-name">Battery Life</span>
                <span className="spec-value">Up to 30 Hours Active</span>
              </div>
              <div className="spec-item">
                <span className="spec-name">Water Resistance</span>
                <span className="spec-value">IPX6 Splash Resistant</span>
              </div>
              <div className="spec-item">
                <span className="spec-name">Compatible with</span>
                <span className="spec-value">iOS, Android, macOS, Windows</span>
              </div>
              <div className="spec-item">
                <span className="spec-name">Box Contents</span>
                <span className="spec-value">Product, Charging cable, User manual</span>
              </div>
            </div>
          )}

          {activeTab === "shipping" && (
            <div className="shipping-info-box" id="pane-shipping">
              <div className="shipping-detail">
                <div className="shipping-icon">🚚</div>
                <div className="shipping-detail-text">
                  <h4>Global Express Shipping</h4>
                  <p>Free standard global shipping is automatically applied on orders above $50. Estimated delivery timeframe is 3 to 7 business days depending on region.</p>
                </div>
              </div>
              <div className="shipping-detail">
                <div className="shipping-icon">🔄</div>
                <div className="shipping-detail-text">
                  <h4>30-Day Hassle-Free Returns</h4>
                  <p>If you are not completely satisfied with your purchase, you may return the item within 30 days of receiving it for a full refund or exchange. Conditions apply.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="reviews-summary" id="pane-reviews">
              <div className="review-item">
                <div className="review-header">
                  <span className="review-author">Alexander V.</span>
                  <span className="review-date">May 28, 2026</span>
                </div>
                <div className="stars" style={{ marginBottom: "0.5rem" }}>
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: "14px", height: "14px" }}>
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                  ))}
                </div>
                <p className="review-comment">“Absolutely phenomenal quality! Exceeded my expectations. The material feels extremely premium and the response speed is lightning-fast. Highly recommend buying the Pro Edition!”</p>
              </div>
              
              <div className="review-item">
                <div className="review-header">
                  <span className="review-author">Sophia L.</span>
                  <span className="review-date">May 24, 2026</span>
                </div>
                <div className="stars" style={{ marginBottom: "0.5rem" }}>
                  {[...Array(4)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: "14px", height: "14px" }}>
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                  ))}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: "14px", height: "14px", color: "#d1d5db" }}>
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                </div>
                <p className="review-comment">“Very comfortable and functional. Design looks great on my desk, and battery life is top-notch. Took an extra day to arrive, but customer service was helpful.”</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Products Section */}
      <section className="related-products-section" id="product-related-carousel">
        <h3 className="related-title">You May Also Like</h3>
        <div className="related-grid">
          {relatedProducts.map((p) => (
            <Link 
              key={p.id} 
              to={`/product/${p.id}`} 
              className="related-card"
              id={`related-prod-card-${p.id}`}
            >
              <div className="related-image-box">
                <img src={p.image} alt={p.name} className="related-img" />
              </div>
              <div className="related-body">
                <h4 className="related-name">{p.name}</h4>
                <span className="related-price">${p.price}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Floating Success Toast Alert */}
      {showToast && (
        <div className="toast-notification" id="cart-success-toast">
          <div className="toast-icon">✓</div>
          <div className="toast-body">
            <div className="toast-title">Added to Cart!</div>
            <div className="toast-message">
              {quantity}x {product.name} ({selectedColor}, {selectedSize}) added to checkout bag.
            </div>
          </div>
          <button 
            className="toast-close-btn" 
            onClick={() => setShowToast(false)}
            aria-label="Close notification"
            id="btn-toast-close"
          >
            ×
          </button>
          <div className="toast-progress"></div>
        </div>
      )}

    </div>
  );
}