import Head from 'next/head';
import Link from 'next/link';

export default function DoctorsPage() {
  return (
    <>
      <Head>
        <title>Médicos - Avaliação Pré Anestésica</title>
        <meta name="description" content="Médicos especialistas em anestesia" />
      </Head>

      {/* Header section */}
      <div className="header_section" style={{ textAlign: 'center' }}>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link href="/home">
              <a className="navbar-brand"><img src="/images/logo.png" alt="Logo" /></a>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <div className="custom_menu" style={{ textAlign: 'right' }}>
                <ul>
                  <li><Link href="/home"><a>Início</a></Link></li>
                  <li className="active"><Link href="/doctors"><a>Médicos</a></Link></li>
                  <li><Link href="/contact"><a>Contato</a></Link></li>
                  <li><Link href="/login"><a className="btn btn-primary">Login</a></Link></li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Doctors section */}
      <div className="doctores_section" style={{ textAlign: 'center', padding: '80px 0' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="doctores_taital">Nossa Equipe de Anestesiologistas</h1>
              <p className="doctor_text">Conheça nossos especialistas em anestesiologia, profissionais altamente qualificados para cuidar da sua segurança e bem-estar.</p>
            </div>
          </div>
          <div className="doctores_section_2">
            <div className="row">
              <div className="col-md-4">
                <div className="doctores_box">
                  <div className="image_1"><img src="/images/doctor1.jpg" alt="Dr. Bruno Torres" /></div>
                  <h4 className="humour_text">Bruno Torres <br /><span className="mbbs_text">Médico Anestesiologista</span></h4>
                  <h4 className="humour_text">CRM/BA 26610 | RQE 19407<br /><span className="mbbs_text"></span></h4>
                  <p className="doctor_details">Especialista em anestesia para cirurgias cardíacas e torácicas, com vasta experiência em procedimentos de alta complexidade.</p>
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
                  <div className="image_1"><img src="/images/doctor2.jpg" alt="Dra. Alessandra Fonseca" /></div>
                  <h4 className="humour_text">Alessandra Fonseca <br /><span className="mbbs_text">Médica Anestesiologista</span></h4>
                  <h4 className="humour_text">CRM/BA 26609 | RQE 24039<br /><span className="mbbs_text"></span></h4>
                  <p className="doctor_details">Especialista em anestesiologia pediátrica e obstétrica, com formação complementar em tratamento da dor.</p>
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

      {/* Footer section */}
      <div className="footer_section">
        <div className="container">
          <div className="footer_section_2">
            <div className="row">
              <div className="col-lg-3 col-sm-6">
                <h3 className="footer_taital">Endereço</h3>
                <div className="location_main">
                  <ul>
                    <li>
                      <a href="#"><i className="fa fa-map-marker" aria-hidden="true"></i>
                      <span className="padding_15">Fazendo isso o primeiro verdadeiro</span></a>
                    </li>
                    <li>
                      <a href="#"><i className="fa fa-phone" aria-hidden="true"></i>
                      <span className="padding_15">Ligue: +01 1234567890</span></a>
                    </li>
                    <li>
                      <a href="#"><i className="fa fa-envelope" aria-hidden="true"></i>
                      <span className="padding_15">Email: demo@gmail.com</span></a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <h3 className="footer_taital">Link Útil</h3>
                <div className="footer_menu">
                  <ul>
                    <li><Link href="/home"><a>Início</a></Link></li>
                    <li className="active"><Link href="/doctors"><a>Médicos</a></Link></li>
                    <li><Link href="/contact"><a>Contato</a></Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright section */}
      <div className="copyright_section">
        <div className="container">
          <p className="copyright_text">2024 Todos os Direitos Reservados. Design por <a href="https://html.design">Free Html Templates</a> Distribuição por <a href="https://themewagon.com">ThemWagons</a></p>
        </div>
      </div>
    </>
  );
}
