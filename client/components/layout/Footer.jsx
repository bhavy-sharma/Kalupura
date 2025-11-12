'use client';

import './Footer.css';
import { 
  FaFacebookF, 
  FaYoutube, 
  FaWhatsapp, 
  FaInstagram 
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  const socialLinks = [
    { name: 'Facebook',    href: 'https://facebook.com/yourpage',    icon: <FaFacebookF />, class: 'facebook' },
    { name: 'YouTube',     href: 'https://youtube.com/yourchannel', icon: <FaYoutube />,   class: 'youtube' },
    { name: 'WhatsApp',    href: 'https://wa.me/919876543210',      icon: <FaWhatsapp />,  class: 'whatsapp' },
    { name: 'Instagram',   href: 'https://instagram.com/yourhandle',icon: <FaInstagram />,class: 'instagram' }
  ];

  const contactInfo = [
    { icon: '📞', text: '+91 98765 43210' },
    { icon: '📧', text: 'info@kalupura.com' },
    { icon: '🏠', text: `कलूपुरा, जिला - गौतम बुद्ध नगर, राज्य - उत्तर प्रदेश, पिन कोड - 203203` }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Main Footer Content */}
        <div className="footer-main">
          
          {/* Brand Section */}
          <div className="footer-brand">
            <h3 className="footer-logo">कलूपुरा</h3>
            <p className="footer-description">
              प्रकृति की गोद में बसा एक सुंदर और समृद्ध गाँव। 
              हमारा उद्देश्य ग्रामीण विकास और सामुदायिक समृद्धि को बढ़ावा देना है।
            </p>
            <div className="footer-made-with">
              <span>Made with ❤️ by </span>
              <span className="developer-name">Navokta Team</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="links-list">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="footer-link">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-contact">
            <h4 className="footer-heading">Contact us</h4>
            <div className="contact-list">
              {contactInfo.map((contact, index) => (
                <div key={index} className="contact-item">
                  <span className="contact-icon">{contact.icon}</span>
                  <span className="contact-text">{contact.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="footer-social">
            <h4 className="footer-heading">Follow us</h4>
            <div className="social-links">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`social-link ${social.class}`}
                  aria-label={`Visit our ${social.name} page`}
                >
                  <span className="social-icon">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {currentYear} कलूपुरा गाँव. सभी अधिकार सुरक्षित.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;