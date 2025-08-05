// src/components/Navbar.tsx
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../hooks/useToast';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setUserDropdownOpen(false);
  }, [location]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      showToast('Sesión cerrada correctamente', 'success');
      navigate('/');
    } catch (error) {
      showToast('Error al cerrar sesión', 'error');
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const NavLink = ({ to, children, className = "" }: { to: string; children: React.ReactNode; className?: string }) => (
    <Link
      to={to}
      className={`nav-link ${isActive(to) ? 'active' : ''} ${className}`}
      onClick={() => setIsOpen(false)}
    >
      {children}
    </Link>
  );

  return (
    <>
    <style>{`
        /* NAVBAR PRINCIPAL */
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          background: rgba(255,255,255,0.96);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid #E9D5FF;
          box-shadow: 0 2px 12px rgba(139,92,246,0.07);
          transition: background 0.3s, box-shadow 0.3s;
        }
        .navbar.scrolled {
          background: rgba(255,255,255,0.99);
          box-shadow: 0 6px 24px rgba(139,92,246,0.18);
          border-bottom-color: #C4B5FD;
        }

        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 80px;
        }

        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          text-decoration: none;
          color: #7C3AED;
          font-weight: 800;
          font-size: 1.5rem;
          letter-spacing: 1px;
          transition: color 0.2s, transform 0.2s;
        }
        .navbar-logo:hover {
          color: #5B21B6;
          transform: scale(1.07);
        }
        .logo-icon {
          width: 36px; height: 36px;
          background: linear-gradient(135deg, #A78BFA, #7C3AED);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          color: #fff;
          font-weight: bold;
          font-size: 1.3rem;
          box-shadow: 0 2px 8px rgba(139,92,246,0.13);
        }

        .navbar-center {
          display: flex;
          align-items: center;
          gap: 1.2rem;
          flex: 1;
          justify-content: center;
          max-width: 800px;
          margin: 0 2rem;
        }

        .navbar-menu {
          display: flex;
          align-items: center;
          gap: 1rem;
          list-style: none;
          margin: 0; padding: 0;
        }

        .nav-link {
          color: #6B7280;
          text-decoration: none;
          font-weight: 500;
          font-size: 1rem;
          padding: 0.5rem 1rem;
          border-radius: 10px;
          transition: color 0.2s, background 0.2s, transform 0.2s;
          position: relative;
          white-space: nowrap;
        }
        .nav-link:hover, .nav-link:focus {
          color: #7C3AED;
          background: rgba(139,92,246,0.10);
          transform: translateY(-2px) scale(1.03);
          outline: none;
        }
        .nav-link.active {
          color: #7C3AED;
          background: rgba(139,92,246,0.18);
          font-weight: 700;
        }
        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 6px; left: 50%;
          transform: translateX(-50%);
          width: 22px; height: 2.5px;
          background: linear-gradient(90deg, #A78BFA, #7C3AED);
          border-radius: 2px;
        }

        /* SEARCH */
        .search-container {
          position: relative;
          flex: 1;
          max-width: 320px;
          margin-left: 1rem;
        }
        .search-form {
          width: 100%;
        }
        .search-input {
          width: 100%;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          border: 1px solid #E5E7EB;
          font-size: 1rem;
          background: #F9FAFB;
          transition: border 0.2s, box-shadow 0.2s;
        }
        .search-input:focus, .search-input.focused {
          border-color: #A78BFA;
          box-shadow: 0 0 0 2px #E9D5FF;
          outline: none;
        }

        /* DROPDOWN EMPRESAS */
        .dropdown-container {
          position: relative;
          display: inline-block;
        }
        .dropdown-trigger {
          cursor: pointer;
        }
        .dropdown-menu-empresas {
          position: absolute;
          top: 100%; left: 0;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(139,92,246,0.13);
          min-width: 210px;
          z-index: 100;
          padding: 0.5rem 0;
          opacity: 0; visibility: hidden;
          transform: translateY(12px);
          transition: opacity 0.3s, transform 0.3s;
        }
        .dropdown-container:hover .dropdown-menu-empresas,
        .dropdown-container:focus-within .dropdown-menu-empresas {
          opacity: 1; visibility: visible;
          transform: translateY(0);
        }
        .dropdown-item-empresas {
          padding: 0.8rem 1.5rem;
          display: block;
          color: #4B5563;
          text-decoration: none;
          font-size: 0.97rem;
          transition: background 0.2s, color 0.2s, padding-left 0.2s;
        }
        .dropdown-item-empresas:hover, .dropdown-item-empresas:focus {
          background: rgba(139,92,246,0.10);
          color: #7C3AED;
          padding-left: 1.8rem;
          outline: none;
        }

        /* AUTENTICACIÓN */
        .navbar-auth {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .auth-button {
          padding: 0.65rem 1.3rem;
          border-radius: 10px;
          font-weight: 600;
          font-size: 1rem;
          text-decoration: none;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #A78BFA, #7C3AED);
          color: #fff;
          box-shadow: 0 2px 8px rgba(139,92,246,0.09);
          transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
          white-space: nowrap;
        }
        .auth-button.login {
          background: linear-gradient(135deg, #A78BFA, #7C3AED);
        }
        .auth-button.register {
          background: linear-gradient(135deg, #7C3AED, #A78BFA);
          font-weight: 700;
          padding: 0.65rem 1.6rem;
        }
        .auth-button:hover, .auth-button:focus {
          background: linear-gradient(135deg, #7C3AED, #5B21B6);
          box-shadow: 0 8px 24px rgba(139,92,246,0.18);
          transform: translateY(-2px) scale(1.04);
          outline: none;
        }

        /* USER MENU */
        .user-menu {
          position: relative;
        }
        .user-avatar {
          width: 38px; height: 38px;
          background: linear-gradient(135deg, #A78BFA, #7C3AED);
          border-radius: 50%;
          color: #fff;
          font-weight: 700;
          font-size: 1.2rem;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          position: relative;
          box-shadow: 0 2px 8px rgba(139,92,246,0.13);
          border: 2px solid #E9D5FF;
          transition: box-shadow 0.2s;
        }
        .user-avatar.online::after {
          content: '';
          position: absolute;
          bottom: 4px; right: 4px;
          width: 8px; height: 8px;
          background: #34D399;
          border-radius: 50%;
          border: 2px solid #fff;
        }
        .notification-badge {
          background: #F59E42;
          color: #fff;
          font-size: 0.8rem;
          border-radius: 8px;
          padding: 0 6px;
          margin-left: 6px;
          font-weight: 700;
          vertical-align: middle;
        }
        .user-dropdown {
          position: absolute;
          top: 110%; right: 0;
          background: #fff;
          border-radius: 14px;
          box-shadow: 0 12px 32px rgba(139,92,246,0.15);
          min-width: 220px;
          z-index: 200;
          padding: 1rem 0.5rem;
          animation: fadeIn 0.25s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .dropdown-header {
          padding: 0.5rem 1rem;
          border-bottom: 1px solid #F3F4F6;
          margin-bottom: 0.5rem;
        }
        .dropdown-header h4 {
          margin: 0; font-size: 1.1rem; color: #7C3AED;
        }
        .dropdown-header p {
          margin: 0; font-size: 0.95rem; color: #6B7280;
        }
        .dropdown-menu {
          list-style: none;
          margin: 0; padding: 0;
        }
        .dropdown-item {
          padding: 0.7rem 1rem;
          display: flex; align-items: center;
          gap: 0.7rem;
          color: #4B5563;
          font-size: 0.98rem;
          cursor: pointer;
          border-radius: 8px;
          transition: background 0.2s, color 0.2s;
        }
        .dropdown-item:hover, .dropdown-item:focus {
          background: rgba(139,92,246,0.09);
          color: #7C3AED;
          outline: none;
        }
        .dropdown-item.danger {
          color: #DC2626;
        }
        .dropdown-divider {
          border: none;
          border-top: 1px solid #F3F4F6;
          margin: 0.5rem 0;
        }

        /* MOBILE */
        .mobile-menu-button {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          margin-left: 1rem;
        }
        .hamburger-line {
          width: 28px; height: 3px;
          background: #7C3AED;
          border-radius: 2px;
          transition: all 0.3s;
        }
        .mobile-menu-button.open .hamburger-line:nth-child(1) {
          transform: translateY(8px) rotate(45deg);
        }
        .mobile-menu-button.open .hamburger-line:nth-child(2) {
          opacity: 0;
        }
        .mobile-menu-button.open .hamburger-line:nth-child(3) {
          transform: translateY(-8px) rotate(-45deg);
        }

        @media (max-width: 900px) {
          .navbar-container {
            padding: 0 0.7rem;
          }
          .navbar-center {
            gap: 0.7rem;
            margin: 0 0.5rem;
          }
        }
        @media (max-width: 768px) {
          .navbar-container {
            flex-wrap: wrap;
            height: auto;
          }
          .navbar-center {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
            max-width: 100%;
            margin: 0;
            width: 100%;
            background: rgba(255,255,255,0.98);
            box-shadow: 0 2px 12px rgba(139,92,246,0.08);
            border-radius: 12px;
            padding: 1rem 0.5rem;
            position: absolute;
            top: 80px; left: 0; right: 0;
            z-index: 999;
            display: none;
          }
          .navbar-center.open {
            display: flex;
          }
          .navbar-menu {
            flex-direction: column;
            width: 100%;
            gap: 0.5rem;
          }
          .search-container {
            width: 100%;
            margin-left: 0;
            margin-top: 0.5rem;
          }
          .navbar-auth {
            flex-direction: column;
            width: 100%;
            gap: 0.7rem;
            margin-top: 0.5rem;
          }
          .auth-button {
            width: 100%;
            justify-content: center;
            padding: 1rem;
          }
          .mobile-menu-button {
            display: flex;
          }
        }
      `}</style>

      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <div className="logo-icon">
              &lt;/&gt;
            </div>
            <span>SHINESCRIPT</span>
          </Link>

          <div className={`navbar-center ${isOpen ? 'open' : ''}`}>
            <ul className="navbar-menu">
              <li>
                <NavLink to="/bootcamps">Bootcamps</NavLink>
              </li>
              <li>
                <NavLink to="/aic">AIC</NavLink>
              </li>
              
              {/* Menú desplegable para Empresas */}
              <li className="dropdown-container">
                <NavLink to="/empresas" className="dropdown-trigger">
                  Para Empresas
                </NavLink>
                <div className="dropdown-menu-empresas">
                  <Link to="/empresas#contratacion" className="dropdown-item-empresas">
                    Contratación
                  </Link>
                  <Link to="/empresas#capacitacion" className="dropdown-item-empresas">
                    Capacitación
                  </Link>
                  <Link to="/empresas#soluciones" className="dropdown-item-empresas">
                    Soluciones TI
                  </Link>
                </div>
              </li>
              
              <li>
                <NavLink to="/blog">Blog</NavLink>
              </li>
              <li>
                <NavLink to="/carreras">Carreras</NavLink>
              </li>
            </ul>

            {!user && (
              <div className="navbar-auth">
                <Link to="/login" className="auth-button login">
                  <span>👤</span>
                  Iniciar Sesión
                </Link>
              </div>
            )}
          </div>

          <div className="navbar-auth">
            {user ? (
              <div className="user-menu">
                <div 
                  className="user-avatar online"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  title="Mi cuenta"
                >
                  {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
                  <span className="notification-badge">3</span>
                </div>

                {userDropdownOpen && (
                  <div className="user-dropdown">
                    <div className="dropdown-header">
                      <h4>{user.displayName || 'Usuario'}</h4>
                      <p>{user.email}</p>
                    </div>
                    <ul className="dropdown-menu">
                      <li 
                        className="dropdown-item"
                        onClick={() => {
                          navigate('/dashboard');
                          setUserDropdownOpen(false);
                        }}
                      >
                        <span>📚</span>
                        Mis Cursos
                      </li>
                      <li className="dropdown-item">
                        <span>👤</span>
                        Mi Perfil
                      </li>
                      <li className="dropdown-item">
                        <span>📊</span>
                        Mi Progreso
                      </li>
                      <li className="dropdown-item">
                        <span>❤️</span>
                        Favoritos
                        <span className="notification-badge" style={{position: 'static', marginLeft: 'auto'}}>5</span>
                      </li>
                      <li className="dropdown-item">
                        <span>🔔</span>
                        Notificaciones
                      </li>
                      <li className="dropdown-item">
                        <span>⚙️</span>
                        Configuración
                      </li>
                      <hr className="dropdown-divider" />
                      <li className="dropdown-item">
                        <span>💡</span>
                        Ayuda y Soporte
                      </li>
                      <li 
                        className="dropdown-item danger"
                        onClick={handleLogout}
                      >
                        <span>🚪</span>
                        Cerrar Sesión
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/register" className="auth-button register">
                Comenzar Ahora
              </Link>
            )}
          </div>

          <button 
            className={`mobile-menu-button ${isOpen ? 'open' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </nav>
    </>
  );
};