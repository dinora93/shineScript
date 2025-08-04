import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

interface Bootcamp {
  id: string;
  name: string;
  duration: string;
  image: string;
}

export default function Dashboard() {
  const [bootcamps, setBootcamps] = useState<Bootcamp[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdown, setOpenDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  useEffect(() => {
    const fetchBootcamps = async () => {
      const snapshot = await getDocs(collection(db, "bootcamps"));
      setBootcamps(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Bootcamp))
      );
    };
    fetchBootcamps();
  }, []);

  // Filtrado por buscador
  const filteredBootcamps = bootcamps.filter((b) =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <style>{`
        .container {
          padding: 2rem;
          position: relative;
          min-height: 100vh;
        }
        .header-container {
          position: relative;
          height: 100px;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }
        .logo {
          width: 200px;
          height: 100px;
          object-fit: contain;
          flex-shrink: 0;
        }
        .search-input {
          flex-grow: 1;
          max-width: 400px;
          padding: 10px 15px;
          font-size: 16px;
          border-radius: 25px;
          border: 1px solid #ccc;
          outline: none;
          box-shadow: 0 0 8px rgba(0,0,0,0.1);
          text-align: center;
        }
        .user-icon-container {
          position: relative;
          flex-shrink: 0;
        }
        .user-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #4CAF50;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          font-size: 22px;
          user-select: none;
        }
        .dropdown {
          position: fixed;
          top: 1rem;
          right: 1rem;
          background-color: white;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(123, 118, 118, 0.1);
          min-width: 160px;
          z-index: 1001;
          overflow: hidden;
        }
        .dropdown button {
          display: block;
          width: 100%;
          padding: 10px;
          text-align: left;
          border: none;
          background: transparent;
          cursor: pointer;
          font-size: 14px;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }
        .card {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 1rem;
          text-align: center;
          background-color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 350px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          transition: transform 0.2s;
          cursor: pointer;
        }
        .card img {
          width: 100%;
          height: 150px;
          object-fit: cover;
          border-radius: 8px;
          margin-bottom: 1rem;
        }
        .card button {
          padding: 0.5rem 1rem;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          align-self: center;
          margin-top: auto;
        }
        .card:hover {
          transform: scale(1.03);
        }
        /* Mensaje centrado cuando no hay coincidencias */
        .no-bootcamps {
          grid-column: 4/-3;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          color: #999;
          font-size: 20px;
          font-weight: 500;
          user-select: none;
          text-align: center;
        }

        /* Media queries */
        @media (max-width: 900px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .logo {
            width: 150px;
            height: 75px;
          }
          .search-input {
            max-width: 250px;
            font-size: 14px;
          }
        }
        @media (max-width: 600px) {
          .grid {
            grid-template-columns: 1fr;
          }
          .logo {
            width: 120px;
            height: 60px;
          }
          .user-icon {
            width: 35px;
            height: 35px;
            font-size: 20px;
          }
          .header-container {
            height: auto;
            flex-wrap: wrap;
            gap: 0.5rem;
          }
          .search-input {
            flex-grow: 1;
            max-width: 100%;
          }
        }
      `}</style>

      <div className="container">
        <div className="header-container">
          <img
            src="https://res.cloudinary.com/dmnbaipjy/image/upload/v1754267629/ChatGPT_Image_3_ago_2025__06_32_22_p.m.-removebg-preview_tpkuoj.png"
            alt="shinescript"
            className="logo"
          />

          <input
            type="text"
            placeholder="Buscar bootcamps..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <div className="user-icon-container">
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

        <div className="grid">
          {filteredBootcamps.length > 0 ? (
            filteredBootcamps.map((b) => (
              <div
                key={b.id}
                className="card"
                onClick={() => navigate("/course/" + b.id)}
              >
                <img src={b.image} alt={b.name} />
                <div>
                  <h3 style={{ margin: "0 0 0.5rem 0" }}>{b.name}</h3>
                  <p style={{ margin: "0 0 1rem 0", color: "#666" }}>
                    Duración: {b.duration}
                  </p>
                </div>
                <button>Ver detalles</button>
              </div>
            ))
          ) : (
            <div className="no-bootcamps">
              No hay coincidencias para "{searchTerm}"
            </div>
          )}
        </div>
      </div>
    </>
  );
}
