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
  const [searchTerm, setSearchTerm] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();

  // Detectar scroll para cambiar estilo del navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar dropdowns al cambiar de ruta
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/dashboard?search=${encodeURIComponent(searchTerm)}`);
    }
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
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(139, 92, 246, 0.1);
        }
        
        .navbar.scrolled {
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 4px 20px rgba(139, 92, 246, 0.15);
          border-bottom-color: rgba(139, 92, 246, 0.2);
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
          text-decoration: none;
          color: #6B46C1;
          font-weight: 700;
          font-size: 1.4rem;
          transition: all 0.3s ease;
          gap: 0.5rem;
        }
        
        .navbar-logo:hover {
          transform: scale(1.05);
          color: #553C9A;
        }
        
        .logo-icon {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #8B5CF6, #6B46C1);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 1.2rem;
        }
        
        .navbar-center {
          display: flex;
          align-items: center;
          gap: 3rem;
          flex: 1;
          justify-content: center;
          max-width: 800px;
          margin: 0 2rem;
        }
        
        .navbar-menu {
          display: flex;
          align-items: center;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        
        .nav-link {
          color: #6B7280;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          padding: 0.75rem 1rem;
          border-radius: 10px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          white-space: nowrap;
        }
        
        .nav-link:hover {
          color: #6B46C1;
          background: rgba(139, 92, 246, 0.08);
          transform: translateY(-1px);
        }
        
        .nav-link.active {
          color: #6B46C1;
          background: rgba(139, 92, 246, 0.12);
          font-weight: 600;
        }
        
        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 6px;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 2px;
          background: linear-gradient(90deg, #8B5CF6, #6B46C1);
          border-radius: 1px;
        }
        
        .search-container {
          position: relative;
          flex: 1;
          max-width: 320px;
        }
        
        .search-form {
          position: relative;
          width: 100%;
        }
        
        .search-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.5rem;
          border: 2px solid #E5E7EB;
          border-radius: 25px;
          font-size: 0.9rem;
          background: #F9FAFB;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          outline: none;
        }
        
        .search-input:focus,
        .search-input.focused {
          border-color: #8B5CF6;
          background: white;
          box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.1);
          transform: scale(1.02);
        }
        
        .search-input::placeholder {
          color: #9CA3AF;
          font-style: italic;
        }
        
        .search-icon {
          position: absolute;
          left: 0.875rem;
          top: 50%;
          transform: translateY(-50%);
          color: #9CA3AF;
          transition: color 0.3s ease;
          font-size: 1rem;
        }
        
        .search-input:focus + .search-icon,
        .search-input.focused + .search-icon {
          color: #8B5CF6;
        }
        
        .navbar-auth {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .auth-button {
          padding: 0.625rem 1.25rem;
          border-radius: 10px;
          font-weight: 500;
          font-size: 0.9rem;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          white-space: nowrap;
        }
        
        .auth-button.login {
          color: #6B46C1;
          background: transparent;
          border: 2px solid #6B46C1;
        }
        
        .auth-button.login:hover {
          background: #6B46C1;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(107, 70, 193, 0.25);
        }
        
        .auth-button.register {
          background: linear-gradient(135deg, #8B5CF6, #6B46C1);
          color: white;
          border: 2px solid transparent;
        }
        
        .auth-button.register:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(139, 92, 246, 0.3);
          background: linear-gradient(135deg, #7C3AED, #553C9A);
        }
        
        .user-menu {
          position: relative;
        }
        
        .user-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, #8B5CF6, #6B46C1);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 3px solid transparent;
          position: relative;
        }
        
        .user-avatar:hover {
          transform: scale(1.1);
          border-color: rgba(139, 92, 246, 0.3);
        }
        
        .user-avatar.online::after {
          content: '';
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 12px;
          height: 12px;
          background: #10B981;
          border: 2px solid white;
          border-radius: 50%;
        }
        
        .user-dropdown {
          position: absolute;
          top: 55px;
          right: 0;
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 40px rgba(139, 92, 246, 0.15);
          min-width: 240px;
          overflow: hidden;
          z-index: 1001;
          animation: dropdownSlide 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(139, 92, 246, 0.1);
        }
        
        @keyframes dropdownSlide {
          from {
            opacity: 0;
            transform: translateY(-15px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .dropdown-header {
          padding: 1.25rem;
          background: linear-gradient(135deg, #F3F4F6, #E5E7EB);
          border-bottom: 1px solid rgba(139, 92, 246, 0.1);
        }
        
        .dropdown-header h4 {
          margin: 0 0 0.25rem 0;
          font-size: 1rem;
          font-weight: 600;
          color: #1F2937;
        }
        
        .dropdown-header p {
          margin: 0;
          font-size: 0.85rem;
          color: #6B7280;
        }
        
        .dropdown-menu {
          list-style: none;
          margin: 0;
          padding: 0.5rem 0;
        }
        
        .dropdown-item {
          padding: 0.875rem 1.25rem;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #374151;
          font-size: 0.9rem;
          font-weight: 500;
        }
        
        .dropdown-item:hover {
          background: rgba(139, 92, 246, 0.08);
          color: #6B46C1;
          transform: translateX(4px);
        }
        
        .dropdown-item.danger {
          color: #EF4444;
        }
        
        .dropdown-item.danger:hover {
          background: rgba(239, 68, 68, 0.08);
          color: #DC2626;
        }
        
        .dropdown-divider {
          margin: 0.5rem 0;
          border: none;
          border-top: 1px solid rgba(139, 92, 246, 0.1);
        }
        
        .mobile-menu-button {
          display: none;
          flex-direction: column;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          gap: 4px;
          border-radius: 8px;
          transition: background-color 0.3s ease;
        }
        
        .mobile-menu-button:hover {
          background: rgba(139, 92, 246, 0.08);
        }
        
        .hamburger-line {
          width: 24px;
          height: 3px;
          background: #6B46C1;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 2px;
        }
        
        .mobile-menu-button.open .hamburger-line:nth-child(1) {
          transform: rotate(45deg) translate(7px, 7px);
        }
        
        .mobile-menu-button.open .hamburger-line:nth-child(2) {
          opacity: 0;
          transform: translateX(-20px);
        }
        
        .mobile-menu-button.open .hamburger-line:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -7px);
        }
        
        .notification-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: #EF4444;
          color: white;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          font-size: 0.7rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        @media (max-width: 1024px) {
          .navbar-center {
            gap: 1.5rem;
            margin: 0 1rem;
          }
          
          .search-container {
            max-width: 280px;
          }
          
          .navbar-menu {
            gap: 1rem;
          }
        }
        
        @media (max-width: 768px) {
          .mobile-menu-button {
            display: flex;
          }
          
          .navbar-center {
            position: fixed;
            top: 80px;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 2rem;
            gap: 2rem;
            box-shadow: 0 4px 20px rgba(139, 92, 246, 0.15);
            transform: translateY(-100vh);
            opacity: 0;
            visibility: hidden;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 999;
          }
          
          .navbar-center.open {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
          }
          
          .navbar-menu {
            flex-direction: column;
            width: 100%;
            gap: 0.5rem;
          }
          
          .nav-link {
            width: 100%;
            text-align: center;
            padding: 1rem;
            border-radius: 12px;
          }
          
          .search-container {
            max-width: 100%;
            order: -1;
          }
          
          .navbar-auth {
            flex-direction: column;
            width: 100%;
            gap: 0.75rem;
          }
          
          .auth-button {
            width: 100%;
            justify-content: center;
            padding: 1rem;
          }
          
          .user-dropdown {
            position: fixed;
            top: 80px;
            left: 1rem;
            right: 1rem;
            width: auto;
          }
        }
        
        /* Offset para contenido principal */
        .navbar-offset {
          padding-top: 80px;
        }
      `}</style>

      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <div className="logo-icon">
              &lt;/&gt;
            </div>
            <span>SHINESCRIPT</span>
          </Link>

          {/* Menú central con navegación y búsqueda */}
          <div className={`navbar-center ${isOpen ? 'open' : ''}`}>
            {/* Menu de navegación */}
            <ul className="navbar-menu">
              <li>
                <NavLink to="/">Bootcamps</NavLink>
              </li>
              <li>
                <NavLink to="#aic">AIC</NavLink>
              </li>
              <li>
                <NavLink to="#empresas">Empresas</NavLink>
              </li>
              <li>
                <NavLink to="#blog">Blog</NavLink>
              </li>
              <li>
                <NavLink to="#ppd">PPD</NavLink>
              </li>
            </ul>

            {/* Barra de búsqueda */}
            <div className="search-container">
              <form onSubmit={handleSearch} className="search-form">
                <input
                  type="text"
                  placeholder="Buscar bootcamps..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className={`search-input ${searchFocused ? 'focused' : ''}`}
                />
                <span className="search-icon">🔍</span>
              </form>
            </div>

            {/* Botones de auth en móvil */}
            {!user && (
              <div className="navbar-auth">
                <Link to="/login" className="auth-button login">
                  <span>👤</span>
                  Iniciar Sesión
                </Link>
                <Link to="/register" className="auth-button register">
                  <span>✨</span>
                  Registrarse
                </Link>
              </div>
            )}
          </div>

          {/* Botones de autenticación / Usuario */}
          <div className="navbar-auth">
            {user ? (
              <div className="user-menu">
                <div 
                  className="user-avatar online"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  title="Mi cuenta"
                >
                  {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
                  {/* Notification badge ejemplo */}
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
              <>
                <Link to="/login" className="auth-button login">
                  Sign In
                </Link>
                <Link to="/register" className="auth-button register">
                  <span>✨</span>
                  Comenzar
                </Link>
              </>
            )}
          </div>

          {/* Botón menú móvil */}
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