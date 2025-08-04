import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { db, auth } from "../firebase/firebase";
import "../CourseDetail.css";

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
}

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Bootcamp | null>(null);
  const [openDropdown, setOpenDropdown] = useState(false);

  // Cerrar sesión
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // Redirige al inicio
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) return;
      const docRef = doc(db, "bootcamps", id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        setCourse({ id: snapshot.id, ...snapshot.data() } as Bootcamp);
      }
    };
    fetchCourse();
  }, [id]);

  if (!course) return <p className="loading-text">Cargando curso...</p>;

  return (
    <div className="course-detail-container">
        <div 
            style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            padding: "16px",
            zIndex: 101,
            boxSizing: "border-box",
            }}
        >
            <button
            className="back-button"
            onClick={() => navigate("/dashboard")}
            style={{
                backgroundColor: "#f0f0f0",
                border: "1px solid #ccc",
                padding: "8px 12px",
                borderRadius: "5px",
                cursor: "pointer",
                marginLeft: "8px",
            }}
            >
            ← Volver a cursos
            </button>
            <div style={{ position: "relative", marginRight: "8px" }}>
            <div
                onClick={() => setOpenDropdown(!openDropdown)}
                style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "#4CAF50",
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
                    left: "auto",
                    backgroundColor: "white",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(123, 118, 118, 0.1)",
                    minWidth: "160px",
                    maxWidth: "calc(100vw - 32px)",
                    marginRight: "0",
                    zIndex: 100,
                    overflow: "hidden",
                }}
                >
                <button
                    onClick={handleLogout}
                    style={{
                    display: "block",
                    width: "100%",
                    padding: "10px",
                    textAlign: "left",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    fontSize: "14px",
                    boxSizing: "border-box",
                    }}
                >
                    Cerrar sesión
                </button>
                </div>
            )}
            </div>
        </div>
      

      {/* Contenido del curso */}
      <img src={course.image} alt={course.name} className="course-banner" />

      <div className="course-header">
        <h1>{course.name}</h1>
        <p className="course-summary">
          Aprende {course.name} desde cero y domina el desarrollo de aplicaciones modernas.
        </p>

        <div className="course-meta">
          <span>⭐ {course.rating || 4.3} / 5</span>
          <span>👥 {course.students || 731} estudiantes</span>
          <span>⏳ {course.duration}</span>
        </div>

        <p className="course-update">
          Última actualización {course.lastUpdate || "enero de 2025"} ·{" "}
          {course.language || "Español"}
        </p>
      </div>

      <section className="course-section">
        <h2>Lo que aprenderás</h2>
        <ul>
          {course.learn && course.learn.length > 0 ? (
            course.learn.map((item, index) => <li key={index}>✔ {item}</li>)
          ) : (
            <>
              <li>✔ Crear tu primera aplicación Android con Kotlin</li>
              <li>✔ Persistencia de datos con SQLite, Realm y Firebase</li>
              <li>✔ Uso de Android Studio y componentes principales</li>
              <li>✔ Crear apps multi idioma y con autenticación</li>
            </>
          )}
        </ul>
      </section>

      <section className="course-section">
        <h2>Descripción</h2>
        <p>
          {course.description ||
            "Este curso te guiará desde los conceptos básicos hasta la creación de aplicaciones móviles completas usando Kotlin, Android Studio y Firebase, con ejemplos prácticos y claros."}
        </p>
      </section>

      <section className="course-section">
        <h2>¿Para quién es este curso?</h2>
        <ul>
          {course.target && course.target.length > 0 ? (
            course.target.map((item, index) => <li key={index}>👤 {item}</li>)
          ) : (
            <>
              <li>👤 Estudiantes que quieran aprender desarrollo Android</li>
              <li>👤 Programadores que quieran migrar de Java a Kotlin</li>
            </>
          )}
        </ul>
      </section>

      <section className="course-section">
        <h2>Instructor</h2>
        <p>{course.instructor || "Soluciones Informáticas k&D"}</p>
        <p className="instructor-sub">
          Ingenieros en Tecnologías de la Información con experiencia en desarrollo de software y docencia.
        </p>
      </section>

      <section className="course-section">
        <h2>Requisitos</h2>
        <ul>
          {course.requirements && course.requirements.length > 0 ? (
            course.requirements.map((item, index) => <li key={index}>💻 {item}</li>)
          ) : (
            <>
              <li>💻 Computadora con al menos 4GB de RAM</li>
              <li>💻 Conocimientos básicos de programación</li>
            </>
          )}
        </ul>
      </section>
    </div>
  );
}
