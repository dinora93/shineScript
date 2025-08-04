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
  const [openDropdown, setOpenDropdown] = useState(false);
  const navigate = useNavigate();

  // Obtener cursos desde Firestore
  useEffect(() => {
    const fetchBootcamps = async () => {
      const snapshot = await getDocs(collection(db, "bootcamps"));
      setBootcamps(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Bootcamp))
      );
    };
    fetchBootcamps();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      {/* Barra superior */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <h2></h2><img
          src="https://res.cloudinary.com/dmnbaipjy/image/upload/v1754267629/ChatGPT_Image_3_ago_2025__06_32_22_p.m.-removebg-preview_tpkuoj.png"
          alt="shinescript"
          style={{
        width: "200px",
        height: "100px",
        objectFit: "contain",
        position: "absolute",
        left: "16px",
          }}
          
        />

        {/* Icono de usuario con dropdown */}
        <div style={{ position: "relative" }}>
          <div
            onClick={() => setOpenDropdown(!openDropdown)}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#a2b0beff",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              fontSize: "22px",
              userSelect: "none",
            }}
            title="Menú de usuario"
          >
            👤
          </div>

          {openDropdown && (
            <div
              style={{
                position: "absolute",
                top: "50px",
                right: 0,
                backgroundColor: "white",
                border: "1px solid #ddd",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(123, 118, 118, 0.1)",
                minWidth: "160px",
                zIndex: 100,
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => navigate("/dashboard")}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  textAlign: "left",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Iniciar sesión
              </button>
              <button
                onClick={() => navigate("/register")}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  textAlign: "left",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Registrarse
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Listado de cursos */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1rem",
        }}
      >
        {bootcamps.map((b) => (
          <div
            key={b.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "1rem",
              textAlign: "center",
              backgroundColor: "#fff",
            }}
          >
            <img
              src={b.image}
              alt={b.name}
              style={{ width: "100%", borderRadius: "8px" }}
            />
            <h3>{b.name}</h3>
            <p>Duración: {b.duration}</p>
            <button
              onClick={() => navigate("/login")}
              style={{
                marginTop: "0.5rem",
                padding: "0.5rem 1rem",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Ver detalles
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
