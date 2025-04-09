import React from 'react';
import Link from 'next/link';

const Treatment: React.FC = () => {
  return (
    <div className="treatment_section layout_padding" style={{ textAlign: 'center' }}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="treatment_taital">Tratamento Hospitalar</h1>
          </div>
        </div>
        <div className="treatment_section_2">
          <div className="row">
            <div className="col-lg-3 col-sm-6">
              <h1 className="number_text">01</h1>
              <h2 className="care_text">Cuidados Nephrologist</h2>
              <p className="treatment_text">Alteração em alguma forma, por humor injetado, ou palavras aleatórias que não parecem nem um pouco e garantem que não há nada</p>
              <div className="readmore_bt active"><Link href="#">Leia Mais</Link></div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <h1 className="number_text">02</h1>
              <h2 className="care_text">Cuidados Oculares</h2>
              <p className="treatment_text_1">Alteração em alguma forma, por humor injetado, ou palavras aleatórias que não parecem nem um pouco</p>
              <div className="readmore_bt"><Link href="#">Leia Mais</Link></div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <h1 className="number_text">03</h1>
              <h2 className="care_text">Clínica Pediátrica</h2>
              <p className="treatment_text_1">Alteração em alguma forma, por humor injetado, ou palavras aleatórias que não parecem nem um pouco</p>
              <div className="readmore_bt"><Link href="#">Leia Mais</Link></div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <h1 className="number_text">04</h1>
              <h2 className="care_text">Cuidados Pré-natais</h2>
              <p className="treatment_text_1">Alteração em alguma forma, por humor injetado, ou palavras aleatórias que não parecem nem um pouco</p>
              <div className="readmore_bt"><Link href="#">Leia Mais</Link></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Treatment;
