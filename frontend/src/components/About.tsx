import React from 'react';
import Link from 'next/link';

const About: React.FC = () => {
  return (
    <div className="about_section layout_padding" style={{ textAlign: 'center' }}>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h1 className="about_taital">Sobre o Hospital</h1>
            <p className="about_text">Tem uma distribuição de letras mais ou menos normal, ao contrário de usar 'Conteúdo aqui, conteúdo aqui', fazendo parecer inglês legível. Muitos pacotes de editoração eletrônica e editores de páginas da web têm uma distribuição de letras mais ou menos normal.</p>
            <div className="about_bt"><Link href="#">Leia Mais</Link></div>
          </div>
          <div className="col-md-6">
            <div className="about_img">
              <img src="/images/about-img.png" alt="About Hospital" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
