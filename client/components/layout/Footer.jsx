'use client';

import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'gallery', href: '/gallery' },
    { name: 'News', href: '/news' },
    { name: 'Contact', href: '/contact' }
  ];

  const socialLinks = [
    { 
      name: 'Facebook', 
      href: '#', 
      icon: '📘',
      class: 'facebook' 
    },
    { 
      name: 'YouTube', 
      href: '#', 
      icon: '📺',
      class: 'youtube' 
    },
    { 
      name: 'WhatsApp', 
      href: '#', 
      icon: '💬',
      class: 'whatsapp' 
    },
    { 
      name: 'Instagram', 
      href: '#', 
      icon: '📷',
      class: 'instagram' 
    }
  ];

  const contactInfo = [
    { icon: '📞', text: '+91 98765 43210' },
    { icon: '📧', text: 'info@kalupura.com' },
    { icon: '🏠', text: 'कलुपुरा गाँव, जिला - उदाहरण, राजस्थान' }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Main Footer Content */}
        <div className="footer-main">
          
          {/* Brand Section */}
          <div className="footer-brand">
            <h3 className="footer-logo">कलुपुरा</h3>
            <p className="footer-description">
              प्रकृति की गोद में बसा एक सुंदर और समृद्ध गाँव। 
              हमारा उद्देश्य ग्रामीण विकास और सामुदायिक समृद्धि को बढ़ावा देना है।
            </p>
            <div className="footer-made-with">
              <span>Made with ❤️ by </span>
              <span className="developer-name">Bhavy Sharma</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="links-list">
              {quickLinks.map((link, index) => (
                <li key={index}>
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
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`social-link ${social.class}`}
                  aria-label={social.name}
                >
                  <span className="social-icon">{social.icon}</span>
                </a>
              ))}
            </div>
            
            {/* Newsletter */}
            {/* <div className="newsletter">
              <p className="newsletter-text">नवीनतम अपडेट प्राप्त करें</p>
              <div className="newsletter-input">
                <input 
                  type="email" 
                  placeholder="आपका ईमेल" 
                  className="email-input"
                />
                <button className="subscribe-btn">सब्सक्राइब</button>
              </div>
            </div> */}
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {currentYear} कलुपुरा गाँव. सभी अधिकार सुरक्षित.
            </p>
            <div className="footer-bottom-links">
              <a href="/privacy" className="bottom-link">गोपनीयता नीति</a>
              <a href="/terms" className="bottom-link">सेवा की शर्तें</a>
              <a href="/sitemap" className="bottom-link">साइटमैप</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;