import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  MapPin,
  BookOpen,
  ClipboardList,
  AtSign,
} from "lucide-react";
import { Instagram, Whatsapp, Home3, Call} from "iconsax-reactjs";
import "./App.css";
import products from "./data/product.json";

const ProductCard = ({ product, quantity, onUpdateQuantity }: { product: any, quantity: number, onUpdateQuantity: (qty: number) => void }) => {
  return (
    <div className="product-card glass">
      <div className="product-img-wrapper">
        <img
          src={product.image}
          alt={product.name}
          className="product-img"
        />
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <div className="product-meta">
          <span className="price">{product.price}</span>
        </div>
        <div className="quantity-selector" style={{ marginTop: 'auto' }}>
          <button onClick={() => onUpdateQuantity(Math.max(0, quantity - 1))} className="qty-btn">-</button>
          <span className="qty-display">{quantity}</span>
          <button onClick={() => onUpdateQuantity(quantity + 1)} className="qty-btn">+</button>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [cart, setCart] = useState<{ [productId: number]: number }>({});

  const whatsappUrl =
    "https://wa.me/601139795752?text=Hi%20Frhzainal%20Bakery,%20I%20would%20like%20to%20place%20an%20order!";

  const updateCart = (productId: number, quantity: number) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (quantity <= 0) {
        delete newCart[productId];
      } else {
        newCart[productId] = quantity;
      }
      return newCart;
    });
  };

  const getCombinedWhatsappUrl = () => {
    const selectedItems = products.filter((p) => cart[p.id]);
    if (selectedItems.length === 0) return whatsappUrl;

    let text = "Hi Frhzainal Bakery, I would like to place an order for:\n\n";
    let total = 0;

    selectedItems.forEach((p) => {
      const qty = cart[p.id];
      text += `- ${qty}x ${p.name}\n`;
      
      const priceMatch = p.price.match(/RM\s*([0-9.]+)/);
      if (priceMatch) {
        const priceVal = parseFloat(priceMatch[1]);
        if (!isNaN(priceVal)) {
          total += priceVal * qty;
        }
      }
    });

    text += `\nTotal Estimated Price: RM ${total.toFixed(2)}`;
    return `https://wa.me/601139795752?text=${encodeURIComponent(text)}`;
  };

  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  const renderContent = () => {
    switch (activeTab) {
      case "pricelist":
        return (
          <motion.div
            key="pricelist"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="tab-content"
          >
            <div className="section-header">
              <h2 className="section-title">Our Menu</h2>
            </div>
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  quantity={cart[product.id] || 0}
                  onUpdateQuantity={(qty) => updateCart(product.id, qty)}
                />
              ))}
            </div>
          </motion.div>
        );
      case "notes":
        return (
          <motion.div
            key="notes"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="tab-content"
          >
            <div className="section-header">
              <h2 className="section-title">Sweet Notes</h2>
            </div>
            <div className="glass notes-card">
              <h3>🍰 Terms & Conditions</h3>
              <div className="note-item" style={{ marginTop: '0.5rem', paddingTop: '0.5rem' }}>
                <ul style={{ paddingLeft: '1.2rem', margin: 0, lineHeight: '1.6' }}>
                  <li>Pre-order required (2–5 days in advance)</li>
                  <li>Limited slots available — first come, first served</li>
                </ul>
              </div>

              <h3 style={{ marginTop: '1.5rem' }}>💳 Payment</h3>
              <div className="note-item" style={{ marginTop: '0.5rem', paddingTop: '0.5rem' }}>
                <ul style={{ paddingLeft: '1.2rem', margin: 0, lineHeight: '1.6' }}>
                  <li>Deposit required to secure order (non-refundable)</li>
                  <li>Full payment before pickup/delivery</li>
                </ul>
              </div>

              <h3 style={{ marginTop: '1.5rem' }}>🎂 Custom Orders</h3>
              <div className="note-item" style={{ marginTop: '0.5rem', paddingTop: '0.5rem' }}>
                <ul style={{ paddingLeft: '1.2rem', margin: 0, lineHeight: '1.6' }}>
                  <li>Fully handcrafted with care</li>
                  <li>Final design may vary slightly (artisanal finish)</li>
                  <li>Last-minute changes may incur additional charges</li>
                </ul>
              </div>

              <h3 style={{ marginTop: '1.5rem' }}>🚚 Collection</h3>
              <div className="note-item" style={{ marginTop: '0.5rem', paddingTop: '0.5rem' }}>
                <ul style={{ paddingLeft: '1.2rem', margin: 0, lineHeight: '1.6' }}>
                  <li>Self-pickup (By appointment only)</li>
                  <li>Delivery can be arranged upon request (Lalamove or Grab)</li>
                  <li>Please arrive on time as scheduled.</li>
                </ul>
              </div>

              <h3 style={{ marginTop: '1.5rem' }}>⚠️ Note</h3>
              <div className="note-item" style={{ marginTop: '0.5rem', paddingTop: '0.5rem' }}>
                <ul style={{ paddingLeft: '1.2rem', margin: 0, lineHeight: '1.6' }}>
                  <li>Kindly inform us of any allergies</li>
                  <li>No last-minute cancellations</li>
                </ul>
              </div>
            </div>
          </motion.div>
        );
      case "contact":
        return (
          <motion.div
            key="contact"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="tab-content"
          >
            <div className="section-header">
              <h2 className="section-title">Contact Us</h2>
            </div>
            <div className="contact-grid">
              <a
                href="https://instagram.com/frhzainalll"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card glass"
              >
                <Instagram size={32} />
                <span>Instagram</span>
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card glass"
              >
                <Whatsapp size={32} />
                <span>WhatsApp</span>
              </a>
              <a
                href="https://www.tiktok.com/@frhhzainall"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card glass"
              >
                <div className="contact-icon-img-wrapper">
                  <img src="/tiktok.png" alt="TikTok" className="contact-icon-img" />
                </div>
                <span>TikTok</span>
              </a>
              <a
                href="https://www.threads.net/@frhzainalll"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card glass"
              >
                <AtSign size={32} />
                <span>Threads</span>
              </a>
            </div>
          </motion.div>
        );
      case "address":
        return (
          <motion.div
            key="address"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="tab-content"
          >
            <div className="section-header">
              <h2 className="section-title">Our Address</h2>
            </div>
            <div className="glass address-card">
              <div className="address-icon"><MapPin size={48} /></div>
              <h3>Visit Us</h3>
              <p>Kompleks Kediaman Kakitangan Awam (CIQ),<br />Tg Kupang, 81560 Gelang Patah,<br />Johor, Malaysia.</p>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="btn-primary-lg" style={{ marginTop: '1.5rem' }}>
                Open in Google Maps
              </a>
            </div>
          </motion.div>
        );
      default:
        return (
          <motion.div
            key="home"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="home-launch-container"
          >
            <div className="launch-header">
              <img src="/sticker.png" alt="Logo" className="launch-logo" />
              <span className="bakery-chip">Bakery</span>
              <div className="description-glass-card glass">
                <p className="launch-description">
                  Handcrafted with love, baked for your soul.
                </p>  
              </div>
            </div>
            
            <div className="launch-grid">
              <button onClick={() => setActiveTab("pricelist")} className="launch-card">
                <div className="launch-icon"><ClipboardList size={40} /></div>
                <span>Pricelist</span>
              </button>
              <button onClick={() => setActiveTab("notes")} className="launch-card">
                <div className="launch-icon"><BookOpen size={40} /></div>
                <span>Notes</span>
              </button>
              <button onClick={() => setActiveTab("address")} className="launch-card">
                <div className="launch-icon"><MapPin size={40} /></div>
                <span>Address</span>
              </button>
              <button onClick={() => setActiveTab("contact")} className="launch-card">
                <div className="launch-icon"><MessageCircle size={40} /></div>
                <span>Contact</span>
              </button>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="app no-scroll">
      <nav className="glass sticky-nav">
        <div className="container nav-content">
          <div
            className="logo-container"
            onClick={() => setActiveTab("home")}
            style={{ cursor: "pointer" }}
          >
            <img src="/sticker.png" alt="Logo" className="nav-logo" />
          </div>
          <a
            href={totalItems > 0 ? getCombinedWhatsappUrl() : whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-order-nav"
          >
            <MessageCircle size={18} />
            <span>{totalItems > 0 ? `Checkout (${totalItems})` : "Order Now"}</span>
          </a>
        </div>
      </nav>

      <section className="main-viewport">
        <div className="hero-overlay-bg">
          <img
            src="/image2.jpeg"
            alt="Bakery Background"
            className="hero-bg-img"
          />
          <div className="hero-overlay"></div>
        </div>

        <div className="container content-area">
          <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
        </div>

        {/* Persistent Quick Actions at Bottom - Only on sub-pages */}
        {activeTab !== "home" && (
          <div className="container persistent-nav">
            <div className="quick-actions-grid">
              <button
                onClick={() => setActiveTab("pricelist")}
                className={`action-card-mini glass ${activeTab === "pricelist" ? "active" : ""}`}
              >
                <div className="action-icon-mini purple">
                  <ClipboardList size={20} />
                </div>
                <span>Pricelist</span>
              </button>
              <button
                onClick={() => setActiveTab("notes")}
                className={`action-card-mini glass ${activeTab === "notes" ? "active" : ""}`}
              >
                <div className="action-icon-mini nude">
                  <BookOpen size={20} />
                </div>
                <span>Notes</span>
              </button>
              <button
                onClick={() => setActiveTab("home")}
                className={`action-card-mini glass ${activeTab === "home" ? "active" : ""}`}
              >
                <div className="action-icon-mini pink">
                  <Home3 size={20} />
                </div>
                <span>Home</span>
              </button>
              <button
                onClick={() => setActiveTab("address")}
                className={`action-card-mini glass ${activeTab === "address" ? "active" : ""}`}
              >
                <div className="action-icon-mini nude">
                  <MapPin size={20} />
                </div>
                <span>Address</span>
              </button>
              <button
                onClick={() => setActiveTab("contact")}
                className={`action-card-mini glass ${activeTab === "contact" ? "active" : ""}`}
              >
                <div className="action-icon-mini pink">
                  <Call size={20} />
                </div>
                <span>Contact</span>
              </button>
            </div>
          </div>
        )}
      </section>

      <footer className="mini-footer glass">
        <p>&copy; 2024 Frhzainal Bakery</p>
      </footer>
    </div>
  );
};

export default App;
