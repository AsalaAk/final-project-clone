import React from "react";
import "./Footer.css"; // Add styles separately
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-links">
                    <Link to="/">בית</Link>
                    <Link to="/about">אודות</Link>
                    <Link to="/contact">צור קשר</Link>
                </div>
                <div className="footer-contact">
                    <p>📧 אימייל: support@psychofind.com</p>
                    <p>📞 טלפון: 03-1234567</p>
                </div>
                <div className="footer-copy">
                    <p>© 2024 כל הזכויות שמורות | פסיכו-פיינד</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
