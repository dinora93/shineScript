// src/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";  // Eliminamos la importación de auth
import { useNavigate } from "react-router-dom";
import { EmptyState } from "../components/EmptyState";
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
  difficulty?: string;
  category?: string;
}

interface Filters {
  duration: string;
  difficulty: string;
  category: string;
}

export default function Dashboard() {
  const [bootcamps, setBootcamps] = useState<Bootcamp[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [filters, setFilters] = useState<Filters>({
    duration: 'all',
    difficulty: 'all',
    category: 'all'
  });
  const navigate = useNavigate();
  const { toasts, showToast, removeToast } = useToast();

  const toggleFavorite = (courseId: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId];
      
      const action = newFavorites.includes(courseId) ? 'agregado a' : 'removido de';
      showToast(`Curso ${action} favoritos`, "info");
      
      return newFavorites;
    });
  };

  useEffect(() => {
    const fetchBootcamps = async () => {
      try {
        const snapshot = await getDocs(collection(db, "bootcamps"));
        const bootcampsData = snapshot.docs.map((doc) => ({ 
          id: doc.id, 
          ...doc.data(),
          rating: doc.data().rating || (Math.random() * 2 + 3.5).toFixed(1),
          students: doc.data().students || Math.floor(Math.random() * 1000 + 100),
          difficulty: doc.data().difficulty || ['Principiante', 'Intermedio', 'Avanzado'][Math.floor(Math.random() * 3)],
          category: doc.data().category || ['Desarrollo Web', 'Mobile', 'Data Science', 'DevOps'][Math.floor(Math.random() * 4)]
        } as Bootcamp));
        
        setBootcamps(bootcampsData);
        showToast(`${bootcampsData.length} bootcamps cargados`, "success");
      } catch (error) {
        console.error("Error fetching bootcamps:", error);
        showToast("Error al cargar los bootcamps", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchBootcamps();
  }, []);

  // Filtrado avanzado
  const filteredBootcamps = bootcamps.filter((b) => {
    const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDuration = filters.duration === 'all' || b.duration.includes(filters.duration);
    const matchesDifficulty = filters.difficulty === 'all' || b.difficulty === filters.difficulty;
    const matchesCategory = filters.category === 'all' || b.category === filters.category;
    
    return matchesSearch && matchesDuration && matchesDifficulty && matchesCategory;
  });

  const EnhancedCard = ({ bootcamp }: { bootcamp: Bootcamp }) => (
    <div className={`enhanced-card ${viewMode === 'list' ? 'list-view' : ''}`}>
      <div className="card-header">
        <img src={bootcamp.image} alt={bootcamp.name} />
        <div className="course-badges">
          <span className="badge difficulty">{bootcamp.difficulty}</span>
        </div>
        <button 
          className={`favorite-btn ${favorites.includes(bootcamp.id) ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(bootcamp.id);
          }}
          title={favorites.includes(bootcamp.id) ? 'Remover de favoritos' : 'Agregar a favoritos'}
        >
          {favorites.includes(bootcamp.id) ? '❤️' : '🤍'}
        </button>
      </div>
      
      <div className="card-content">
        <div className="card-main-info">
          <h3>{bootcamp.name}</h3>
          <p className="category">{bootcamp.category}</p>
          <p className="duration">⏰ {bootcamp.duration}</p>
          
          <div className="course-preview">
            <span className="students">👥 {bootcamp.students} estudiantes</span>
            <span className="rating-detail">⭐ {bootcamp.rating}/5</span>
          </div>
        </div>
        
        <button 
          className="card-action"
          onClick={() => navigate("/course/" + bootcamp.id)}
        >
          Ver detalles
        </button>
      </div>
    </div>
  );

  const FilterBar = () => (
    <div className="filter-bar">
      <div className="filter-group">
        <label>Duración:</label>
        <select 
          value={filters.duration} 
          onChange={(e) => setFilters(prev => ({...prev, duration: e.target.value}))}
        >
          <option value="all">Todas</option>
          <option value="semanas">Semanas</option>
          <option value="meses">Meses</option>
          <option value="horas">Horas</option>
        </select>
      </div>
      
      <div className="filter-group">
        <label>Dificultad:</label>
        <select 
          value={filters.difficulty} 
          onChange={(e) => setFilters(prev => ({...prev, difficulty: e.target.value}))}
        >
          <option value="all">Todas</option>
          <option value="Principiante">Principiante</option>
          <option value="Intermedio">Intermedio</option>
          <option value="Avanzado">Avanzado</option>
        </select>
      </div>
      
      <div className="filter-group">
        <label>Categoría:</label>
        <select 
          value={filters.category} 
          onChange={(e) => setFilters(prev => ({...prev, category: e.target.value}))}
        >
          <option value="all">Todas</option>
          <option value="Desarrollo Web">Desarrollo Web</option>
          <option value="Mobile">Mobile</option>
          <option value="Data Science">Data Science</option>
          <option value="DevOps">DevOps</option>
        </select>
      </div>
      
      <div className="view-toggle">
        <button 
          className={viewMode === 'grid' ? 'active' : ''}
          onClick={() => setViewMode('grid')}
          title="Vista en cuadrícula"
        >
          ⊞
        </button>
        <button 
          className={viewMode === 'list' ? 'active' : ''}
          onClick={() => setViewMode('list')}
          title="Vista en lista"
        >
          ☰
        </button>
      </div>
    </div>
  );

  if (loading) {
    return <Loading message="Preparando tu experiencia de aprendizaje..." size="large" />;
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
        
        .container {
          padding: 2rem;
          position: relative;
          min-height: 100vh;
          background: var(--background);
        }
        
        .header-container {
          position: relative;
          background: white;
          padding: 1.5rem 2rem;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          justify-content: center; /* Centrado horizontal */
          gap: 1rem;
        }
        
        .search-container {
          flex-grow: 1;
          max-width: 600px; /* Mayor ancho */
          position: relative;
        }
        
        .search-input {
          width: 100%;
          padding: 12px 20px 12px 45px;
          font-size: 16px;
          border-radius: 25px;
          border: 2px solid #e0e0e0;
          outline: none;
          transition: all 0.3s ease;
          background: #f8f9fa;
        }
        
        .search-input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
          background: white;
        }
        
        .filter-bar {
          display: flex;
          gap: 1rem;
          align-items: center;
          background: white;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }
        
        .filter-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .filter-group label {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-secondary);
        }
        
        .filter-group select {
          padding: 6px 12px;
          border: 1px solid #e0e0e0;
          border-radius: 6px;
          background: white;
          font-size: 0.9rem;
          cursor: pointer;
        }
        
        .view-toggle {
          margin-left: auto;
          display: flex;
          background: #f0f0f0;
          border-radius: 8px;
          overflow: hidden;
        }
        
        .view-toggle button {
          padding: 8px 12px;
          border: none;
          background: transparent;
          cursor: pointer;
          font-size: 16px;
          transition: all 0.2s ease;
        }
        
        .view-toggle button.active {
          background: var(--primary);
          color: white;
        }
        
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
          margin-top: 1rem;
        }
        
        .grid.list-mode {
          grid-template-columns: 1fr;
        }
        
        .enhanced-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          height: 420px;
          display: flex;
          flex-direction: column;
        }
        
        .enhanced-card.list-view {
          flex-direction: row;
          height: 200px;
        }
        
        .enhanced-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.15);
        }
        
        .card-header {
          position: relative;
          height: 220px;
          overflow: hidden;
        }
        
        .enhanced-card.list-view .card-header {
          width: 300px;
          height: 100%;
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
          display: flex;
          gap: 8px;
        }
        
        .badge {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .badge.difficulty {
          color: var(--accent);
        }
        
        .badge.rating {
          color: var(--primary);
        }
        
        .favorite-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 16px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .favorite-btn:hover {
          transform: scale(1.1);
        }
        
        .favorite-btn.active {
          background: rgba(244, 67, 54, 0.1);
        }
        
        .card-content {
          padding: 1.5rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        
        .enhanced-card.list-view .card-content {
          justify-content: center;
        }
        
        .card-main-info h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
          line-height: 1.3;
        }
        
        .category {
          color: var(--secondary);
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
        }
        
        .duration {
          color: var(--text-secondary);
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }
        
        .course-preview {
          margin-top: auto;
          margin-bottom: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        
        .card-action {
          padding: 12px 24px;
          background: linear-gradient(135deg, var(--primary), var(--primary-dark));
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          align-self: flex-start;
        }
        
        .card-action:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
        }
        
        /* Media queries */
        @media (max-width: 768px) {
          .container {
            padding: 1rem;
          }
                    
          .search-container {
            max-width: 100%;
          }
          
          .filter-bar {
            flex-direction: column;
            align-items: stretch;
            gap: 1rem;
          }
          
          .filter-group {
            justify-content: space-between;
          }
          
          .view-toggle {
            margin-left: 0;
            align-self: center;
          }
          
          .grid {
            grid-template-columns: 1fr;
          }
          
          .enhanced-card.list-view {
            flex-direction: column;
            height: 420px;
          }
          
          .enhanced-card.list-view .card-header {
            width: 100%;
            height: 220px;
          }
        }
      `}</style>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div className="container">
        <div className="header-container">
          <div className="search-container">
          </div>
        </div>

        <FilterBar />
        <div className={`grid ${viewMode === 'list' ? 'list-mode' : ''}`}>
          {filteredBootcamps.length > 0 ? (
            filteredBootcamps.map((bootcamp) => (
              <EnhancedCard key={bootcamp.id} bootcamp={bootcamp} />
            ))
          ) : (
            <EmptyState
              title="No encontramos bootcamps"
              description="Intenta ajustar los filtros o términos de búsqueda para encontrar el curso perfecto"
              actionText="Limpiar filtros"
              onAction={() => {
                setSearchTerm("");
                setFilters({ duration: 'all', difficulty: 'all', category: 'all' });
              }}
              icon="🔍"
            />
          )}
        </div>
      </div>
    </>
  );
}