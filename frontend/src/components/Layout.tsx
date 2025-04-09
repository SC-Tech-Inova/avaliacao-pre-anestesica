import Head from 'next/head';
import { ReactNode } from 'react';
import Link from 'next/link';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  isHomePage?: boolean;
}

// This component will be used for all pages except the home page
const Layout = ({ children, title = 'Avaliação Pré Anestésica', isHomePage = false }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Sistema de Avaliação Pré Anestésica" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="header">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light">
            <Link href="/" legacyBehavior>
              <a className="navbar-brand">
                <img src="/images/logo.png" alt="Logo" />
              </a>
            </Link>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-toggle="collapse" 
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link href="/" legacyBehavior>
                    <a className="nav-link">Início</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/doctors" legacyBehavior>
                    <a className="nav-link">Médicos</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/contact" legacyBehavior>
                    <a className="nav-link">Contato</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/login" legacyBehavior>
                    <a className="btn btn-primary">Login</a>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p className="text-center">
            &copy; {new Date().getFullYear()} Avaliação Pré Anestésica. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Layout;
