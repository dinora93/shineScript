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
    <div style={{ padding: "2rem", minHeight: "100vh" }}>
      {/* Barra superior con flex */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
          gap: "1rem",
        }}
      >
        {/* Imagen dentro del flujo */}
        <img
          src="https://res.cloudinary.com/dmnbaipjy/image/upload/v1754267629/ChatGPT_Image_3_ago_2025__06_32_22_p.m.-removebg-preview_tpkuoj.png"
          alt="shinescript"
          style={{
            width: "200px",
            height: "100px",
            objectFit: "contain",
          }}
        />

        {/* Icono usuario con dropdown */}
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
                position: "fixed",
                top: "1rem",
                right: "1rem",
                backgroundColor: "white",
                border: "1px solid #ddd",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(123, 118, 118, 0.1)",
                minWidth: "160px",
                zIndex: 9999,
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

      {/* Grid de bootcamps */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1rem",
          minHeight: "400px",
          marginTop: "1rem",
        }}
      >
        {bootcamps.length > 0 ? (
          bootcamps.map((b) => (
            <div
              key={b.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "1rem",
                textAlign: "center",
                backgroundColor: "#fff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "350px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                transition: "transform 0.2s",
                cursor: "pointer",
              }}
              onClick={() => navigate("/login")}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "scale(1.03)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
              }}
            >
              <img
                src={b.image}
                alt={b.name}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "1rem",
                }}
              />
              <div>
                <h3 style={{ margin: "0 0 0.5rem 0" }}>{b.name}</h3>
                <p style={{ margin: "0 0 1rem 0", color: "#666" }}>
                  Duración: {b.duration}
                </p>
              </div>
              <button
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  alignSelf: "center",
                  marginTop: "auto",
                }}
              >
                Ver detalles
              </button>
            </div>
          ))
        ) : (
          <div
            style={{
              gridColumn: "1 / -1",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "400px",
              color: "#999",
              fontSize: "20px",
              fontWeight: "500",
              userSelect: "none",
              textAlign: "center",
            }}
          >
            No hay bootcamps disponibles
          </div>
        )}
      </div>
    </div>
  );
}
