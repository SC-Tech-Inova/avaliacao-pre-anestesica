import React from 'react';

const Doctors: React.FC = () => {
  return (
    <div className="doctores_section" style={{ textAlign: 'center' }}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="doctores_taital">Nossos Médicos</h1>
          </div>
        </div>
        <div className="doctores_section_2">
          <div className="row">
            <div className="col-md-4">
              <div className="doctores_box">
                <div className="image_1">
                  <img src="/images/doctor1.jpg" alt="Dr. Bruno Torres" />
                </div>
                <h4 className="humour_text">Bruno Torres <br/><span className="mbbs_text">Médico Anestesiologista</span></h4>
                <h4 className="humour_text">CRM/BA 26610 | RQE 19407<br/><span className="mbbs_text"></span></h4>
                <div className="social_icon">
                  <ul>
                    <li><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                    <li><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                    <li><a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
                    <li><a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="doctores_box">
                <div className="image_1">
                  <img src="/images/doctor2.jpg" alt="Dra. Alessandra Fonseca" />
                </div>
                <h4 className="humour_text">Alessandra Fonseca <br/><span className="mbbs_text">Médica Anestesiologista</span></h4>
                <h4 className="humour_text">CRM/BA 26609 | RQE 24039<br/><span className="mbbs_text"></span></h4>
                <div className="social_icon">
                  <ul>
                    <li><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                    <li><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                    <li><a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
                    <li><a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctors;
