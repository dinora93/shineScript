import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { db, auth } from "../firebase/firebase";
import { Loading } from "../components/Loading";
import { useToast } from "../hooks/useToast";
import { ToastContainer } from "../components/ToastContainer";

interface Bootcamp {
  id: string;
  name: string;
  duration: string;
  image: string;
  rating?: number;
  students?: number;
  lastUpdate?: string;
  language?: string;
  learn?: string[];
  description?: string;
  target?: string[];
  instructor?: string;
  requirements?: string[];
  difficulty?: string;
  category?: string;
  price?: string;
  certification?: boolean;
}

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Bootcamp | null>(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);
  const { toasts, showToast, removeToast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      showToast("Sesión cerrada correctamente", "success");
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      showToast("Error al cerrar sesión", "error");
    }
  };

  const handleEnroll = () => {
    setEnrolled(!enrolled);
    showToast(
      enrolled ? "Te has desinscrito del curso" : "¡Te has inscrito al curso exitosamente!",
      enrolled ? "info" : "success"
    );
  };

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) return;
      
      try {
        const docRef = doc(db, "bootcamps", id);
        const snapshot = await getDoc(docRef);
        
        if (snapshot.exists()) {
          const courseData = { 
            id: snapshot.id, 
            ...snapshot.data(),
            rating: snapshot.data().rating || (Math.random() * 2 + 3.5).toFixed(1),
            students: snapshot.data().students || Math.floor(Math.random() * 1000 + 100),
            difficulty: snapshot.data().difficulty || 'Intermedio',
            category: snapshot.data().category || 'Desarrollo Web',
            price: snapshot.data().price || 'Gratis',
            certification: snapshot.data().certification !== false
          } as Bootcamp;
          
          setCourse(courseData);
        } else {
          showToast("Curso no encontrado", "error");
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error fetching course:", error);
        showToast("Error al cargar el curso", "error");
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourse();
  }, [id, navigate]);

  if (loading) {
    return <Loading message="Preparando los detalles del curso..." size="large" />;
  }

  if (!course) {
    return (
      <div className="error-container">
        <h2>Curso no encontrado</h2>
        <button onClick={() => navigate("/dashboard")}>Volver al Dashboard</button>
      </div>
    );
  }

  return (
    <>
      <style>{`
        :root {
          --primary: #4CAF50;
          --primary-dark: #45a049;
          --secondary: #2196F3;
          --accent: #FF9800;
          --success: #4CAF50;
          --warning: #FFC107;
          --error: #f44336;
          --text-primary: #212121;
          --text-secondary: #757575;
          --background: #fafafa;
        }
        
        .course-detail-container {
          min-height: 100vh;
          background: var(--background);
        }
        
        .header-nav {
          background: white;
          padding: 1rem 2rem;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        
        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        
        .breadcrumb a {
          color: var(--primary);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
        }
        
        .breadcrumb a:hover {
          color: var(--primary-dark);
        }
        
        .back-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--primary);
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        
        .back-button:hover {
          background: var(--primary-dark);
          transform: translateY(-2px);
        }
        
        .user-menu {
          position: relative;
        }
        
        .user-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary), var(--primary-dark));
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          font-size: 20px;
          transition: all 0.3s ease;
        }
        
        .user-icon:hover {
          transform: scale(1.1);
        }
        
        .dropdown {
          position: absolute;
          top: 50px;
          right: 0;
          background: white;
          border: none;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          min-width: 160px;
          z-index: 101;
          overflow: hidden;
        }
        
        .dropdown button {
          display: block;
          width: 100%;
          padding: 12px 16px;
          text-align: left;
          border: none;
          background: transparent;
          cursor: pointer;
          font-size: 14px;
          transition: background-color 0.2s ease;
        }
        
        .dropdown button:hover {
          background-color: #f5f5f5;
        }
        
        .course-hero {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 3rem 2rem;
        }
        
        .hero-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 3rem;
          align-items: center;
        }
        
        .hero-info h1 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          line-height: 1.2;
        }
        
        .hero-subtitle {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          opacity: 0.9;
          line-height: 1.6;
        }
        
        .course-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin-bottom: 2rem;
        }
        
        .stat-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
        }
        
        .stat-item strong {
          font-weight: 600;
        }
        
        .course-badges {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        
        .hero-badge {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 500;
        }
        
        .course-image {
          width: 100%;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          transition: transform 0.3s ease;
        }
        
        .course-image:hover {
          transform: scale(1.05);
        }
        
        .main-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 3rem 2rem;
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 3rem;
        }
        
        .content-sections {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        
        .course-section {
          background: white;
          padding: 2rem;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }
        
        .course-section h2 {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .section-icon {
          font-size: 1.2rem;
        }
        
        .course-section ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .course-section li {
          padding: 0.5rem 0;
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          line-height: 1.6;
        }
        
        .list-icon {
          color: var(--primary);
          font-weight: bold;
          margin-top: 0.1rem;
        }
        
        .course-description {
          line-height: 1.7;
          color: var(--text-secondary);
          font-size: 1rem;
        }
        
        .instructor-info {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        
        .instructor-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary), var(--primary-dark));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: white;
        }
        
        .instructor-details h3 {
          margin: 0 0 0.25rem 0;
          font-size: 1.1rem;
          font-weight: 600;
        }
        
        .instructor-sub {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin: 0;
        }
        
        .sidebar {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .enrollment-card {
          background: white;
          padding: 2rem;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          text-align: center;
          position: sticky;
          top: 120px;
        }
        
        .price-display {
          font-size: 2rem;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 1rem;
        }
        
        .price-note {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }
        
        .enroll-button {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, var(--primary), var(--primary-dark));
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 1rem;
        }
        
        .enroll-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(76, 175, 80, 0.3);
        }
        
        .enroll-button.enrolled {
          background: linear-gradient(135deg, var(--secondary), #1976D2);
        }
        
        .course-features {
          background: white;
          padding: 1.5rem;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }
        
        .feature-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 0;
          border-bottom: 1px solid #f0f0f0;
        }
        
        .feature-item:last-child {
          border-bottom: none;
        }
        
        .feature-icon {
          color: var(--primary);
          font-size: 1.1rem;
        }
        
        .share-button {
          width: 100%;
          padding: 0.75rem;
          background: transparent;
          color: var(--text-secondary);
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .share-button:hover {
          border-color: var(--primary);
          color: var(--primary);
        }
        
        .progress-indicator {
          background: #f0f0f0;
          height: 6px;
          border-radius: 3px;
          overflow: hidden;
          margin: 1rem 0;
        }
        
        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, var(--primary), var(--primary-dark));
          width: 0%;
          transition: width 0.3s ease;
        }
        
        .progress-bar.enrolled {
          width: 15%;
        }
        
        @media (max-width: 768px) {
          .hero-content {
            grid-template-columns: 1fr;
            gap: 2rem;
            text-align: center;
          }
          
          .hero-info h1 {
            font-size: 2rem;
          }
          
          .main-content {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding: 2rem 1rem;
          }
          
          .course-stats {
            grid-template-columns: 1fr;
          }
          
          .course-badges {
            justify-content: center;
            flex-wrap: wrap;
          }
          
          .enrollment-card {
            position: static;
          }
          
          .nav-content {
            flex-direction: column;
            gap: 1rem;
          }
          
          .breadcrumb {
            order: 2;
          }
        }
        
        @media (max-width: 480px) {
          .course-hero {
            padding: 2rem 1rem;
          }
          
          .course-section {
            padding: 1.5rem;
          }
          
          .enrollment-card {
            padding: 1.5rem;
          }
        }
      `}</style>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div className="course-detail-container">
        {/* Header Navigation */}
        <div className="header-nav">
          <div className="nav-content">
            <button
              className="back-button"
              onClick={() => navigate("/dashboard")}
            >
              ← Volver a cursos
            </button>
            
            <nav className="breadcrumb">
              <Link to="/dashboard">Cursos</Link>
              <span>→</span>
              <span>{course.category}</span>
              <span>→</span>
              <span>{course.name}</span>
            </nav>

            <div className="user-menu">
              <div
                onClick={() => setOpenDropdown(!openDropdown)}
                className="user-icon"
                title="Menú de usuario"
              >
                👤
              </div>

              {openDropdown && (
                <div className="dropdown">
                  <button onClick={handleLogout}>Cerrar sesión</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="course-hero">
          <div className="hero-content">
            <div className="hero-info">
              <h1>{course.name}</h1>
              <p className="hero-subtitle">
                {course.description || `Domina ${course.name} desde cero y construye aplicaciones modernas con las mejores prácticas de la industria.`}
              </p>

              <div className="course-stats">
                <div className="stat-item">
                  <span>⭐</span>
                  <span><strong>{course.rating}</strong> / 5</span>
                </div>
                <div className="stat-item">
                  <span>👥</span>
                  <span><strong>{course.students}</strong> estudiantes</span>
                </div>
                <div className="stat-item">
                  <span>⏰</span>
                  <span><strong>{course.duration}</strong></span>
                </div>
                <div className="stat-item">
                  <span>🌐</span>
                  <span><strong>{course.language || "Español"}</strong></span>
                </div>
              </div>

              <div className="course-badges">
                <span className="hero-badge">{course.difficulty}</span>
                <span className="hero-badge">{course.category}</span>
                {course.certification && <span className="hero-badge">📜 Certificación</span>}
              </div>

              <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                Última actualización: {course.lastUpdate || "Enero 2025"}
              </p>
            </div>

            <div className="hero-visual">
              <img src={course.image} alt={course.name} className="course-image" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="content-sections">
            {/* Lo que aprenderás */}
            <section className="course-section">
              <h2>
                <span className="section-icon">🎯</span>
                Lo que aprenderás
              </h2>
              <ul>
                {course.learn && course.learn.length > 0 ? (
                  course.learn.map((item, index) => (
                    <li key={index}>
                      <span className="list-icon">✓</span>
                      <span>{item}</span>
                    </li>
                  ))
                ) : (
                  <>
                    <li><span className="list-icon">✓</span><span>Fundamentos sólidos de {course.name}</span></li>
                    <li><span className="list-icon">✓</span><span>Desarrollo de proyectos prácticos</span></li>
                    <li><span className="list-icon">✓</span><span>Mejores prácticas de la industria</span></li>
                    <li><span className="list-icon">✓</span><span>Preparación para el mercado laboral</span></li>
                  </>
                )}
              </ul>
            </section>

            {/* Descripción del curso */}
            <section className="course-section">
              <h2>
                <span className="section-icon">📚</span>
                Descripción del curso
              </h2>
              <p className="course-description">
                {course.description || `Este bootcamp intensivo de ${course.name} está diseñado para llevarte desde los conceptos básicos hasta un nivel profesional. Aprenderás mediante proyectos prácticos, casos de estudio reales y con el apoyo de instructores expertos en la industria.`}
              </p>
            </section>

            {/* Instructor */}
            <section className="course-section">
              <h2>
                <span className="section-icon">👨‍🏫</span>
                Tu instructor
              </h2>
              <div className="instructor-info">
                <div className="instructor-avatar">
                  🧑‍💻
                </div>
                <div className="instructor-details">
                  <h3>{course.instructor || "ShineScript Team"}</h3>
                  <p className="instructor-sub">
                    {course.instructor === "ShineScript Team" 
                      ? "Equipo de expertos en tecnología con más de 10 años de experiencia en la industria"
                      : "Ingeniero en Tecnologías de la Información con experiencia en desarrollo de software y docencia"
                    }
                  </p>
                </div>
              </div>
            </section>

            {/* Para quién es este curso */}
            <section className="course-section">
              <h2>
                <span className="section-icon">👥</span>
                ¿Para quién es este curso?
              </h2>
              <ul>
                {course.target && course.target.length > 0 ? (
                  course.target.map((item, index) => (
                    <li key={index}>
                      <span className="list-icon">👤</span>
                      <span>{item}</span>
                    </li>
                  ))
                ) : (
                  <>
                    <li><span className="list-icon">👤</span><span>Principiantes que quieren aprender {course.name}</span></li>
                    <li><span className="list-icon">👤</span><span>Desarrolladores que buscan expandir sus habilidades</span></li>
                    <li><span className="list-icon">👤</span><span>Profesionales en transición de carrera</span></li>
                  </>
                )}
              </ul>
            </section>

            {/* Requisitos */}
            <section className="course-section">
              <h2>
                <span className="section-icon">📋</span>
                Requisitos
              </h2>
              <ul>
                {course.requirements && course.requirements.length > 0 ? (
                  course.requirements.map((item, index) => (
                    <li key={index}>
                      <span className="list-icon">💻</span>
                      <span>{item}</span>
                    </li>
                  ))
                ) : (
                  <>
                    <li><span className="list-icon">💻</span><span>Computadora con conexión a internet</span></li>
                    <li><span className="list-icon">💻</span><span>Conocimientos básicos de programación (recomendado)</span></li>
                    <li><span className="list-icon">💻</span><span>Ganas de aprender y dedicar tiempo al estudio</span></li>
                  </>
                )}
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <div className="sidebar">
            <div className="enrollment-card">
              <div className="price-display">
                {course.price === 'Gratis' || !course.price ? 'Gratis' : course.price}
              </div>
              <p className="price-note">
                {course.price === 'Gratis' || !course.price 
                  ? 'Acceso completo sin costo' 
                  : 'Precio especial por tiempo limitado'
                }
              </p>
              
              <div className="progress-indicator">
                <div className={`progress-bar ${enrolled ? 'enrolled' : ''}`}></div>
              </div>
              
              <button 
                className={`enroll-button ${enrolled ? 'enrolled' : ''}`}
                onClick={handleEnroll}
              >
                {enrolled ? '✓ Inscrito' : 'Inscribirse ahora'}
              </button>
              
              <button className="share-button">
                🔗 Compartir curso
              </button>
            </div>

            <div className="course-features">
              <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>
                Incluye:
              </h3>
              <ul className="feature-list">
                <li className="feature-item">
                  <span className="feature-icon">🎥</span>
                  <span>Videos de alta calidad</span>
                </li>
                <li className="feature-item">
                  <span className="feature-icon">📝</span>
                  <span>Ejercicios prácticos</span>
                </li>
                <li className="feature-item">
                  <span className="feature-icon">💾</span>
                  <span>Código fuente descargable</span>
                </li>
                <li className="feature-item">
                  <span className="feature-icon">📱</span>
                  <span>Acceso móvil</span>
                </li>
                <li className="feature-item">
                  <span className="feature-icon">♾️</span>
                  <span>Acceso de por vida</span>
                </li>
                {course.certification && (
                  <li className="feature-item">
                    <span className="feature-icon">🏆</span>
                    <span>Certificado de finalización</span>
                  </li>
                )}
                <li className="feature-item">
                  <span className="feature-icon">💬</span>
                  <span>Soporte directo</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}