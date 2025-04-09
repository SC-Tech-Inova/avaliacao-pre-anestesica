import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="contact_section layout_padding" style={{ textAlign: 'center' }}>
      <div className="container-fluid">
        <div className="contact_section_2">
          <div className="row">
            <div className="col-md-6">
              <h1 className="contact_taital">Entre em Contato</h1>
              <form action="">
                <div className="mail_section">
                  <input type="text" className="mail_text" placeholder="Nome" name="Name" />
                  <input type="text" className="mail_text" placeholder="Número de Telefone" name="Phone Number" /> 
                  <input type="text" className="mail_text" placeholder="Email" name="Email" />
                  <textarea className="massage-bt" placeholder="Mensagem" rows={5} name="Massage"></textarea>
                  <div className="send_bt"><a href="#">Enviar</a></div>
                </div>
              </form>
            </div>
            <div className="col-md-6 padding_left_15">
              <div className="map_main">
                <div className="map_responsive">
                  <iframe 
                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA68uFdJ0nUOP5c0sckUpCe4LMrlK_bdoo&q=Ipiau,Bahia" 
                    width="600" 
                    height="600" 
                    frameBorder="0" 
                    style={{ border: 0, width: '100%' }} 
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
