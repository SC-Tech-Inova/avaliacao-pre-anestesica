import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <>
      <div className="footer_section">
        <div className="container">
          <div className="input_bt">
            <input type="text" className="mail_bt" placeholder="Digite seu Email" name="Enter your email" />
            <span className="subscribe_bt" id="basic-addon2"><a href="#">Inscrever-se</a></span>
          </div>
          <div className="footer_section_2">
            <div className="row">
              <div className="col-lg-3 col-sm-6">
                <h3 className="footer_taital">Endereço</h3>
                <div className="location_main">
                  <ul>
                    <li>
                      <a href="#">
                        <i className="fa fa-map-marker" aria-hidden="true"></i>
                        <span className="padding_15">Rua Ipiaú, 123</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-phone" aria-hidden="true"></i>
                        <span className="padding_15">+55 (73) 9 9999-9999</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-envelope" aria-hidden="true"></i>
                        <span className="padding_15">contato@anestesicos.com.br</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <h3 className="footer_taital">Links Úteis</h3>
                <div className="footer_menu">
                  <ul>
                    <li><Link href="/">Início</Link></li>
                    <li><Link href="/about">Sobre</Link></li>
                    <li><Link href="/doctors">Médicos</Link></li>
                    <li><Link href="/contact">Contato</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright_section">
        <div className="container">
          <p className="copyright_text">2024 Todos os Direitos Reservados.</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
