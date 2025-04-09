import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

// Login page uses global.css only
const LoginPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for authentication logic
    try {
      // Mock successful login
      if (username && password) {
        // Set login status in session/localStorage
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('username', username);
        
        // Redirect to pre-anesthetic form
        router.push('/new-patient-form');
      } else {
        setError('Por favor, preencha todos os campos.');
      }
    } catch (error) {
      setError('Erro ao fazer login. Tente novamente.');
    }
  };

  return (
    <>
      <Head>
        <title>Login - Avaliação Pré Anestésica</title>
        <meta name="description" content="Login para o Sistema de Avaliação Pré Anestésica" />
      </Head>
      
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
                  <li><Link href="/doctors"><a>Médicos</a></Link></li>
                  <li><Link href="/contact"><a>Contato</a></Link></li>
                  <li className="active"><Link href="/login"><a className="btn btn-primary">Login</a></Link></li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
      
      <div className="auth-container">
        <div className="auth-form">
          <div className="text-center mb-4">
            <Link href="/home">
              <a>
                <img src="/images/logo.png" alt="Logo" style={{ maxWidth: '200px', margin: '0 auto 20px' }} />
              </a>
            </Link>
            <h1 className="h3">Login</h1>
          </div>
          
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Usuário</label>
              <input
                type="text"
                id="username"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block">
                Entrar
              </button>
            </div>
          </form>
          
          <div className="text-center mt-3">
            <Link href="/home">
              <a>Voltar para a página inicial</a>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Footer section */}
      <div className="copyright_section">
        <div className="container">
          <p className="copyright_text">2024 Todos os Direitos Reservados. Design por <a href="https://html.design">Free Html Templates</a> Distribuição por <a href="https://themewagon.com">ThemWagons</a></p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;