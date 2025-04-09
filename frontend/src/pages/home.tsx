import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';

export default function HomePage() {
  // Load external scripts that might be needed from original template
  useEffect(() => {
    // You might need to add script loading logic here if required
  }, []);

  return (
    <>
      <Head>
        <title>Avaliação Pré Anestésica</title>
        <meta name="description" content="Sistema de Avaliação Pré Anestésica" />
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
                  <li className="active"><Link href="/home"><a>Início</a></Link></li>
                  <li><Link href="/doctors"><a>Médicos</a></Link></li>
                  <li><Link href="/contact"><a>Contato</a></Link></li>
                  <li><Link href="/login"><a className="btn btn-primary">Login</a></Link></li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="custom_bg"></div>
        </div>
        
        {/* Banner section */}
        <div className="banner_section layout_padding">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="banner_taital">Cuidamos de Você</h1>
                <p className="banner_text">Ao olhar para seu layout. O ponto de usar Lorem Ipsum é que ele tem uma distribuição de letras mais ou menos normal, ao contrário de</p>
                <div className="read_bt"><Link href="#"><a>Leia Mais</a></Link></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About section */}
      <div className="about_section layout_padding" style={{ textAlign: 'center' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1 className="about_taital">Sobre o Hospital</h1>
              <p className="about_text">Tem uma distribuição de letras mais ou menos normal, ao contrário de usar 'Conteúdo aqui, conteúdo aqui', fazendo parecer inglês legível. Muitos pacotes de editoração eletrônica e editores de páginas da web têm uma distribuição de letras mais ou menos normal.</p>
              <div className="about_bt"><Link href="#"><a>Leia Mais</a></Link></div>
            </div>
            <div className="col-md-6">
              <div className="about_img"><img src="/images/about-img.png" alt="About Hospital" /></div>
            </div>
          </div>
        </div>
      </div>

      {/* Treatment section */}
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
                <div className="readmore_bt active"><Link href="#"><a>Leia Mais</a></Link></div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <h1 className="number_text">02</h1>
                <h2 className="care_text">Cuidados Oculares</h2>
                <p className="treatment_text_1">Alteração em alguma forma, por humor injetado, ou palavras aleatórias que não parecem nem um pouco</p>
                <div className="readmore_bt"><Link href="#"><a>Leia Mais</a></Link></div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <h1 className="number_text">03</h1>
                <h2 className="care_text">Clínica Pediátrica</h2>
                <p className="treatment_text_1">Alteração em alguma forma, por humor injetado, ou palavras aleatórias que não parecem nem um pouco</p>
                <div className="readmore_bt"><Link href="#"><a>Leia Mais</a></Link></div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <h1 className="number_text">04</h1>
                <h2 className="care_text">Cuidados Pré-natais</h2>
                <p className="treatment_text_1">Alteração em alguma forma, por humor injetado, ou palavras aleatórias que não parecem nem um pouco</p>
                <div className="readmore_bt"><Link href="#"><a>Leia Mais</a></Link></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Doctors section */}
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
                  <div className="image_1"><img src="/images/doctor1.jpg" alt="Dr. Bruno Torres" /></div>
                  <h4 className="humour_text">Bruno Torres <br /><span className="mbbs_text">Médico Anestesiologista</span></h4>
                  <h4 className="humour_text">CRM/BA 26610 | RQE 19407<br /><span className="mbbs_text"></span></h4>
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

      {/* Contact section */}
      <div className="contact_section layout_padding" style={{ textAlign: 'center' }}>
        <div className="container-fluid">
          <div className="contact_section_2">
            <div className="row">
              <div className="col-md-6">
                <h1 className="contact_taital">Entre em Contato</h1>
                <form>
                  <div className="mail_section_1">
                    <input type="text" className="mail_text" placeholder="Nome" name="Name" />
                    <input type="text" className="mail_text" placeholder="Número de Telefone" name="Phone Number" /> 
                    <input type="text" className="mail_text" placeholder="Email" name="Email" />
                    <textarea className="massage-bt" placeholder="Mensagem" rows={5} id="comment" name="Massage"></textarea>
                    <div className="send_bt"><a href="#">Enviar</a></div>
                  </div>
                </form>
              </div>
              <div className="col-md-6 padding_left_15">
                <div className="map_main">
                  <div className="map-responsive">
                    <iframe 
                      src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA68uFdJ0nUOP5c0sckUpCe4LMrlK_bdoo&q=Ipiau,Bahia" 
                      width="600" 
                      height="600" 
                      frameBorder="0" 
                      style={{ border: 0, width: '100%' }} 
                      allowFullScreen>
                    </iframe>
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
                <div className="footer_social_icon">
                  <ul>
                    <li><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                    <li><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                    <li><a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
                    <li><a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <h3 className="footer_taital">Link Útil</h3>
                <div className="footer_menu">
                  <ul>
                    <li className="active"><Link href="/home"><a>Início</a></Link></li>
                    <li><Link href="/doctors"><a>Médicos</a></Link></li>
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
