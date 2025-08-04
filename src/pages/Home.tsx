import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    const fetchBootcamps = async () => {
      const snapshot = await getDocs(collection(db, "bootcamps"));
      setBootcamps(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Bootcamp))
      );
    };
    fetchBootcamps();
  }, []);

  const filteredBootcamps = bootcamps.filter((b) =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <style>{`
        .container {
          padding: 2rem;
          min-height: 100vh;
          position: relative;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .logo {
          width: 200px;
          height: 100px;
          object-fit: contain;
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
          margin: 0 1rem;
          min-width: 150px;
        }
        .user-icon-container {
          position: relative;
        }
        .user-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #a2b0beff;
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
          z-index: 9999;
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
          min-height: 400px;
          margin-top: 1rem;
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
        .no-bootcamps {
          grid-column: 4/-3 /* ocupa todo el ancho de la cuadrícula */;
          display: flex;
          justify-content: space-around;
          align-items: center;
          height: 100vh; /* ocupa toda la altura de la ventana */
          color: #999;
          font-size: 20px;
          font-weight: 500;
          user-select: none;
          text-align: center;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .logo {
            width: 150px;
            height: 75px;
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
          .header {
            margin-bottom: 1rem;
          }
          .search-input {
            max-width: 100%;
            margin: 0.5rem 0 0 0;
          }
        }
      `}</style>

      <div className="container">
        <div className="header">
          <img
            src="https://res.cloudinary.com/dmnbaipjy/image/upload/v1754267629/ChatGPT_Image_3_ago_2025__06_32_22_p.m.-removebg-preview_tpkuoj.png"
            alt="shinescript"
            className="logo"
          />

          <input
            type="text"
            placeholder="Buscar bootcamps..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
                <button onClick={() => navigate("/dashboard")}>Iniciar sesión</button>
                <button onClick={() => navigate("/register")}>Registrarse</button>
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
                onClick={() => navigate("/login")}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.03)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
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
