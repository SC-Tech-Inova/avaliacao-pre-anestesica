import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <div className="header_section" style={{ textAlign: 'center' }}>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link href="/" legacyBehavior>
            <a className="navbar-brand">
              <img src="/images/logo.png" alt="Logo" />
            </a>
          </Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-toggle="collapse" 
            data-target="#navbarSupportedContent" 
            aria-controls="navbarSupportedContent" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="custom_menu" style={{ textAlign: 'right' }}>
              <ul>
                <li className="active"><Link href="/">Início</Link></li>
                <li><Link href="/doctors">Médicos</Link></li>
                <li><Link href="/login" legacyBehavior><a className="btn btn-primary">Login</a></Link></li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="custom_bg"></div>
      </div>
    </div>
  );
};

export default Header;
