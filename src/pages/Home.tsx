// src/pages/Home.tsx
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { EmptyState } from "../components/EmptyState";
import { SkeletonCard } from "../components/Loading";

interface Bootcamp {
  id: string;
  name: string;
  duration: string;
  image: string;
  rating?: number;
  students?: number;
  difficulty?: string;
}

export default function Home() {
  const [bootcamps, setBootcamps] = useState<Bootcamp[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBootcamps = async () => {
      try {
        const snapshot = await getDocs(collection(db, "bootcamps"));
        setBootcamps(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Bootcamp))
        );
      } catch (error) {
        console.error("Error fetching bootcamps:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBootcamps();
  }, []);

  const filteredBootcamps = bootcamps.filter((b) =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const HeroSection = () => (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Transforma tu carrera con ShineScript</h1>
        <p className="hero-subtitle">
          Aprende las tecnologías más demandadas con bootcamps prácticos diseñados por expertos
        </p>

        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">{bootcamps.length}</span>
            <span className="stat-label">Bootcamps</span>
          </div>
          <div className="stat">
            <span className="stat-number">5000+</span>
            <span className="stat-label">Estudiantes</span>
          </div>
          <div className="stat">
            <span className="stat-number">95%</span>
            <span className="stat-label">Empleabilidad</span>
          </div>
        </div>

        <div className="cta-buttons">
          <button
            className="cta-primary"
            onClick={() => navigate("/register")}
          >
            Comenzar Gratis
          </button>
          <button
            className="cta-secondary"
            onClick={() => navigate("/login")}
          >
            Ya tengo cuenta
          </button>
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-image">
          <img
            src="https://res.cloudinary.com/dmnbaipjy/image/upload/v1754267629/ChatGPT_Image_3_ago_2025__06_32_22_p.m.-removebg-preview_tpkuoj.png"
            alt="ShineScript Education"
          />
        </div>
      </div>
    </section>
  );

  const CourseCard = ({ bootcamp }: { bootcamp: Bootcamp }) => (
    <div
      className="enhanced-card"
      onClick={() => navigate("/login")}
    >
      <div className="card-header">
        <img src={bootcamp.image} alt={bootcamp.name} />
        <div className="course-badges">
          <span className="badge difficulty">{bootcamp.difficulty || 'Intermedio'}</span>
          <span className="badge rating">⭐ {bootcamp.rating || 4.5}</span>
        </div>
      </div>

      <div className="card-content">
        <h3>{bootcamp.name}</h3>
        <p className="duration">Duración: {bootcamp.duration}</p>

        <div className="course-preview">
          <span className="students">👥 {bootcamp.students || '500+'} estudiantes</span>
        </div>
      </div>

      <button className="card-action">Ver detalles</button>
    </div>
  );

  return (
    <>
      <style>{`
        :root {
          --primary: #4CAF50;
          --primary-dark: #45a049;
          --secondary: #2196F3;
          --accent: #FF9800;
          --text-primary: #212121;
          --text-secondary: #757575;
          --background: #fafafa;
        }
        
        .container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .hero-section {
          display: flex;
          align-items: center;
          min-height: 80vh;
          padding: 2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          position: relative;
          overflow: hidden;
        }
        
        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
          pointer-events: none;
        }
        
        .hero-content {
          flex: 1;
          max-width: 600px;
          z-index: 2;
        }
        
        .hero-title {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          line-height: 1.2;
        }
        
        .hero-subtitle {
          font-size: 1.25rem;
          margin-bottom: 2rem;
          opacity: 0.9;
          line-height: 1.6;
        }
        
        .hero-stats {
          display: flex;
          gap: 2rem;
          margin-bottom: 2rem;
        }
        
        .stat {
          text-align: center;
        }
        
        .stat-number {
          display: block;
          font-size: 2rem;
          font-weight: 700;
        }
        
        .stat-label {
          font-size: 0.9rem;
          opacity: 0.8;
        }
        
        .cta-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        
        .cta-primary, .cta-secondary {
          padding: 1rem 2rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
        }
        
        .cta-primary {
          background: var(--primary);
          color: white;
          border: none;
        }
        
        .cta-primary:hover {
          background: var(--primary-dark);
          transform: translateY(-2px);
        }
        
        .cta-secondary {
          background: transparent;
          color: white;
          border: 2px solid white;
        }
        
        .cta-secondary:hover {
          background: white;
          color: var(--primary);
        }
        
        .hero-visual {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2;
        }
        
        .hero-image img {
          max-width: 400px;
          width: 100%;
          height: auto;
          filter: drop-shadow(0 10px 20px rgba(0,0,0,0.2));
        }
        
        .main-content {
          background: var(--background);
          padding: 2rem;
        }
        
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          gap: 1rem;
          flex-wrap: wrap;
          background: white;
          padding: 1rem 2rem;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header-message {
          font-size: 0.90rem;
          font-weight: bold;
          color: #191b19ff;
          margin: 0;
          flex: 1;
          min-width: 250px;
        }
          
        .header-message:hover {
          color: var(--primary);
          cursor: pointer;
        }

        .search-container {
          display: flex;
          align-items: center;
          flex-grow: 1;
          max-width: 800px;
          margin: 0 auto;
        }
        .search-input {
          flex-grow: 1;
          max-width: 400px;
          padding: 12px 20px;
          font-size: 16px;
          border-radius: 25px;
          border: 2px solid #e0e0e0;
          outline: none;
          transition: all 0.3s ease;
          text-align: center;
          margin: 0 1rem;
          min-width: 150px;
        }
        
        .search-input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
        }
        
        .search-input:focus {
  border-color: #764ba2;
  box-shadow: 0 0 0 4px rgba(118, 75, 162, 0.1);
  outline: none;
}
        .user-icon-container {
          position: relative;
        }
        
        .user-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          font-size: 20px;
          user-select: none;
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
          z-index: 1000;
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
        
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }
        
        .enhanced-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          height: 400px;
          display: flex;
          flex-direction: column;
        }
        
        .enhanced-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.15);
        }
        
        .card-header {
          position: relative;
          height: 200px;
          overflow: hidden;
        }
        
        .card-header img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        
        .enhanced-card:hover .card-header img {
          transform: scale(1.1);
        }
        
        .course-badges {
          position: absolute;
          top: 12px;
          left: 12px;
          right: 12px;
          display: flex;
          justify-content: space-between;
        }
        
        .badge {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
        }
        
        .badge.difficulty {
          color: var(--accent);
        }
        
        .badge.rating {
          color: var(--primary);
        }
        
        .card-content {
          padding: 1.5rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        
        .card-content h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }
        
        .duration {
          color: var(--text-secondary);
          margin-bottom: 1rem;
        }
        
        .course-preview {
          margin-top: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        
        .card-action {
          margin: 0 1.5rem 1.5rem;
          padding: 12px;
          background: linear-gradient(135deg, var(--primary), var(--primary-dark));
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        
        .card-action:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
        }
        
        @media (max-width: 768px) {
          .hero-section {
            flex-direction: column;
            text-align: center;
            padding: 1rem;
          }
          
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-stats {
            justify-content: center;
          }
          
          .cta-buttons {
            justify-content: center;
          }
          
          .grid {
            grid-template-columns: 1fr;
          }
          
          .main-content {
            padding: 1rem;
          }
          


.header {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

`}</style>

      <div className="container">
        <HeroSection />

        <div className="main-content">
          <div className="header">
            <p className="header-message">
              Reserva tu cupo en nuestros bootcamps y comienza tu carrera tecnológica hoy mismo
            </p>
            <input
              type="text"
              placeholder="Buscar bootcamps..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid">
            {loading ? (
              // Mostrar skeletons mientras carga
              Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            ) : filteredBootcamps.length > 0 ? (
              filteredBootcamps.map((bootcamp) => (
                <CourseCard key={bootcamp.id} bootcamp={bootcamp} />
              ))
            ) : (
              <EmptyState
                title="No encontramos bootcamps"
                description="Intenta con términos diferentes o explora todas nuestras opciones"
                actionText="Ver todos los cursos"
                onAction={() => setSearchTerm("")}
                icon="🔍"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};