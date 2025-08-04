// src/components/Footer.tsx
import { Link } from 'react-router-dom';
import { SlSocialLinkedin, SlSocialInstagram, SlSocialYoutube } from "react-icons/sl";
import { PiDiscordLogo } from "react-icons/pi";
import { SlSocialTwitter } from "react-icons/sl";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <style>{`
        .footer {
          background: linear-gradient(135deg, #1F2937 0%, #111827 100%);
          color: #F9FAFB;
          padding: 4rem 0 2rem;
          margin-top: auto;
        }
        
        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        
        .footer-content {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
          gap: 3rem;
          margin-bottom: 3rem;
        }
        
        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          color: #F9FAFB;
          font-weight: 700;
          font-size: 1.5rem;
          transition: all 0.3s ease;
        }
        
        .footer-logo:hover {
          color: #A78BFA;
          transform: translateY(-2px);
        }
        
        .footer-logo-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #8B5CF6, #6B46C1);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 1.2rem;
        }
        
        .footer-description {
          color: #D1D5DB;
          line-height: 1.7;
          font-size: 0.95rem;
          max-width: 300px;
        }
        
        .footer-social {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }
        
        .social-link {
          width: 44px;
          height: 44px;
          background: rgba(139, 92, 246, 0.1);
          border: 2px solid rgba(139, 92, 246, 0.2);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #A78BFA;
          text-decoration: none;
          font-size: 1.2rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .social-link:hover {
          background: rgba(139, 92, 246, 0.2);
          border-color: #8B5CF6;
          color: #8B5CF6;
          transform: translateY(-3px);
        }
        
        .footer-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .footer-section h3 {
          color: #F9FAFB;
          font-weight: 600;
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
          position: relative;
        }
        
        .footer-section h3::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 30px;
          height: 2px;
          background: linear-gradient(90deg, #8B5CF6, #6B46C1);
          border-radius: 1px;
        }
        
        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        
        .footer-link {
          color: #D1D5DB;
          text-decoration: none;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          padding: 0.25rem 0;
          position: relative;
        }
        
        .footer-link:hover {
          color: #A78BFA;
          transform: translateX(4px);
        }
        
        .footer-link::before {
          content: '';
          position: absolute;
          left: -12px;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 1px;
          background: #8B5CF6;
          transition: width 0.3s ease;
        }
        
        .footer-link:hover::before {
          width: 8px;
        }
        
        .newsletter-section {
          background: rgba(139, 92, 246, 0.05);
          border: 1px solid rgba(139, 92, 246, 0.1);
          border-radius: 16px;
          padding: 2rem;
          margin-bottom: 2rem;
        }
        
        .newsletter-title {
          color: #F9FAFB;
          font-weight: 600;
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
        }
        
        .newsletter-description {
          color: #D1D5DB;
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }
        
        .newsletter-form {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        
        .newsletter-input {
          flex: 1;
          min-width: 200px;
          padding: 0.875rem 1rem;
          border: 2px solid rgba(139, 92, 246, 0.2);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.05);
          color: #F9FAFB;
          font-size: 0.9rem;
          outline: none;
          transition: all 0.3s ease;
        }
        
        .newsletter-input:focus {
          border-color: #8B5CF6;
          background: rgba(255, 255, 255, 0.1);
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
        }
        
        .newsletter-input::placeholder {
          color: #9CA3AF;
        }
        
        .newsletter-button {
          padding: 0.875rem 1.5rem;
          background: linear-gradient(135deg, #8B5CF6, #6B46C1);
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          white-space: nowrap;
        }
        
        .newsletter-button:hover {
          background: linear-gradient(135deg, #7C3AED, #553C9A);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(139, 92, 246, 0.3);
        }
        
        .footer-bottom {
          border-top: 1px solid rgba(139, 92, 246, 0.2);
          padding-top: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }
        
        .footer-copyright {
          color: #9CA3AF;
          font-size: 0.9rem;
        }
        
        .footer-legal {
          display: flex;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        
        .footer-legal a {
          color: #9CA3AF;
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.3s ease;
        }
        
        .footer-legal a:hover {
          color: #A78BFA;
        }
        
        .stats-section {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          margin-bottom: 3rem;
          padding: 2rem;
          background: rgba(139, 92, 246, 0.05);
          border-radius: 16px;
          border: 1px solid rgba(139, 92, 246, 0.1);
        }
        
        .stat-item {
          text-align: center;
        }
        
        .stat-number {
          display: block;
          font-size: 2rem;
          font-weight: 700;
          color: #A78BFA;
          margin-bottom: 0.5rem;
        }
        
        .stat-label {
          color: #D1D5DB;
          font-size: 0.9rem;
          font-weight: 500;
        }
        
        @media (max-width: 1024px) {
          .footer-content {
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
          }
          
          .footer-brand {
            grid-column: 1 / -1;
            margin-bottom: 1rem;
          }
          
          .stats-section {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }
        
        @media (max-width: 768px) {
          .footer {
            padding: 3rem 0 1.5rem;
          }
          
          .footer-content {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }
          
          .footer-brand {
            grid-column: 1 / -1;
            text-align: center;
          }
          
          .footer-description {
            max-width: 100%;
          }
          
          .footer-social {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 1rem;
            margin-top: 1rem;
          }

          .newsletter-form {
            flex-direction: column;
          }
          
          .newsletter-input {
            min-width: 100%;
          }
          
          .footer-bottom {
            flex-direction: column;
            text-align: center;
            gap: 1.5rem;
          }
          
          .footer-legal {
            justify-content: center;
            flex-wrap: wrap;
            gap: 1rem;
          }
          
          .stats-section {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 1rem;
          }
        }
        
        @media (max-width: 480px) {
          .footer-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .footer-section {
            text-align: center;
          }
          
          .footer-link:hover {
            transform: none;
          }
          
          .footer-link::before {
            display: none;
          }
        }
      `}</style>

      <footer className="footer">
        <div className="footer-container">
          {/* Estadísticas */}
          <div className="stats-section">
            <div className="stat-item">
              <span className="stat-number">15K+</span>
              <span className="stat-label">Estudiantes</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Bootcamps</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">95%</span>
              <span className="stat-label">Empleabilidad</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Soporte</span>
            </div>
          </div>

          {/* Newsletter */}
          <div className="newsletter-section">
            <h3 className="newsletter-title">¡Mantente actualizado!</h3>
            <p className="newsletter-description">
              Recibe las últimas noticias sobre tecnología, nuevos bootcamps y ofertas exclusivas directamente en tu inbox.
            </p>
            <form className="newsletter-form">
              <input
                type="email"
                placeholder="tu@email.com"
                className="newsletter-input"
                required
              />
              <button type="submit" className="newsletter-button">
                Suscribirse
              </button>
            </form>
          </div>

          {/* Contenido principal del footer */}
          <div className="footer-content">
            {/* Marca y descripción */}
            <div className="footer-brand">
              <Link to="/" className="footer-logo">
                <div className="footer-logo-icon">
                  &lt;/&gt;
                </div>
                <span>SHINESCRIPT</span>
              </Link>
              <p className="footer-description">
                Transformamos carreras a través de bootcamps intensivos de tecnología.
                Aprende las habilidades más demandadas del mercado con instructores expertos
                y proyectos del mundo real.
              </p>
            </div>

            {/* Bootcamps */}
            <div className="footer-section">
              <h3>Bootcamps</h3>
              <ul className="footer-links">
                <li><Link to="/bootcamp/web" className="footer-link">Desarrollo Web</Link></li>
                <li><Link to="/bootcamp/mobile" className="footer-link">Mobile Apps</Link></li>
                <li><Link to="/bootcamp/data" className="footer-link">Data Science</Link></li>
                <li><Link to="/bootcamp/ai" className="footer-link">Inteligencia Artificial</Link></li>
                <li><Link to="/bootcamp/devops" className="footer-link">DevOps</Link></li>
                <li><Link to="/bootcamp/blockchain" className="footer-link">Blockchain</Link></li>
              </ul>
            </div>

            {/* Empresa */}
            <div className="footer-section">
              <h3>Empresa</h3>
              <ul className="footer-links">
                <li><Link to="/about" className="footer-link">Sobre Nosotros</Link></li>
                <li><Link to="/instructors" className="footer-link">Instructores</Link></li>
                <li><Link to="/careers" className="footer-link">Únete al Equipo</Link></li>
                <li><Link to="/partners" className="footer-link">Partners</Link></li>
                <li><Link to="/press" className="footer-link">Prensa</Link></li>
                <li><Link to="/blog" className="footer-link">Blog</Link></li>
              </ul>
            </div>

            {/* Recursos */}
            <div className="footer-section">
              <h3>Recursos</h3>
              <ul className="footer-links">
                <li><Link to="/help" className="footer-link">Centro de Ayuda</Link></li>
                <li><Link to="/community" className="footer-link">Comunidad</Link></li>
                <li><Link to="/events" className="footer-link">Eventos</Link></li>
                <li><Link to="/scholarships" className="footer-link">Becas</Link></li>
                <li><Link to="/success-stories" className="footer-link">Casos de Éxito</Link></li>
                <li><Link to="/downloads" className="footer-link">Descargas</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div className="footer-section">
              <h3>Legal</h3>
              <ul className="footer-links">
                <li><Link to="/terms" className="footer-link">Términos de Uso</Link></li>
                <li><Link to="/privacy" className="footer-link">Política de Privacidad</Link></li>
                <li><Link to="/cookies" className="footer-link">Política de Cookies</Link></li>
                <li><Link to="/refund" className="footer-link">Política de Reembolso</Link></li>
                <li><Link to="/accessibility" className="footer-link">Accesibilidad</Link></li>
                <li><Link to="/contact" className="footer-link">Contacto</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-social">
             <a href="#" className="social-link" title="LinkedIn">
                <SlSocialLinkedin />
              </a>
              <a href="#" className="social-link" title="Twitter">
                <SlSocialTwitter />
              </a>
              <a href="#" className="social-link" title="Instagram">
                <SlSocialInstagram />
              </a>
              <a href="#" className="social-link" title="YouTube">
                <SlSocialYoutube />
              </a>
              <a href="#" className="social-link" title="Discord">
               <PiDiscordLogo />
              </a>
            </div>
          {/* Parte inferior */}
          <div className="footer-bottom">
            <p className="footer-copyright">
              © {currentYear} ShineScript. Todos los derechos reservados.
              Hecho con amor para transformar carreras tecnológicas.
            </p>
            <ul className="footer-legal">
              <li><Link to="/sitemap">Mapa del Sitio</Link></li>
              <li><Link to="/status">Estado del Servicio</Link></li>
              <li><Link to="/security">Seguridad</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};