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

const App = () => {
  const [activeTab, setActiveTab] = useState("home");
  const whatsappUrl =
    "https://wa.me/601139795752?text=Hi%20FRH%20Bakery,%20I%20would%20like%20to%20place%20an%20order!";

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
                <div key={product.id} className="product-card glass">
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
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary-full"
                    >
                      Order
                    </a>
                  </div>
                </div>
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
              <h3>Our Promise</h3>
              <p>
                We believe every cake tells a story. Our bakery uses only 100%
                natural ingredients, zero preservatives, and a whole lot of
                love.
              </p>
              <div className="note-item">
                <strong>Pre-order:</strong> Please order at least 2 days in
                advance.
              </div>
              <div className="note-item">
                <strong>Delivery:</strong> We deliver within Klang Valley area.
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
              <p>Blok H-3-1, Kompleks Kediaman Kakitangan Awam (CIQ),<br />Tg Kupang, 81560 Gelang Patah,<br />Johor, Malaysia.</p>
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
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-order-nav"
          >
            <MessageCircle size={18} />
            <span>Order Now</span>
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
