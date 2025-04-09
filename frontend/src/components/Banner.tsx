import React from 'react';
import Link from 'next/link';

const Banner: React.FC = () => {
  return (
    <div className="banner_section layout_padding">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="banner_taital">Cuidamos de Você</h1>
            <p className="banner_text">Ao olhar para seu layout. O ponto de usar Lorem Ipsum é que ele tem uma distribuição de letras mais ou menos normal, ao contrário de </p>
            <div className="read_bt"><Link href="#">Leia Mais</Link></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
