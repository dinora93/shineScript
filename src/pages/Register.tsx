import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate, Link } from "react-router-dom";

interface RegisterForm {
  email: string;
  password: string;
}

export default function Register() {
  const { register, handleSubmit } = useForm<RegisterForm>();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterForm) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Error al registrarse. Intenta de nuevo.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh", // Asegura que ocupe toda la pantalla
        width: "100vw",
      }}
    >
      {/* Lado izquierdo: Imagen */}
      <div
        style={{
          width: "50%", // 50% exacto
          height: "100%",
          backgroundImage:
            'url("https://res.cloudinary.com/dmnbaipjy/image/upload/v1754259592/ChatGPT_Image_3_ago_2025_16_19_30_ghrvsv.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Lado derecho: Formulario */}
      <div
        style={{
          width: "50%", 
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #f9f9f9 0%, #eef2f3 100%)",
          padding: "2rem",
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            backgroundColor: "#fff",
            padding: "2.5rem",
            borderRadius: "12px",
            boxShadow: "0 6px 25px rgba(0,0,0,0.1)",
            width: "100%",
            maxWidth: "380px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "1.5rem",
              color: "#333",
              fontSize: "1.8rem",
            }}
          >
            Crear Usuario
          </h2>

          <input
            placeholder="Email"
            {...register("email")}
            style={{
              padding: "0.75rem",
              marginBottom: "1rem",
              border: "1px solid #ccc",
              borderRadius: "8px",
              fontSize: "1rem",
              outline: "none",
              transition: "0.3s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#4CAF50")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />

          <input
            type="password"
            placeholder="Contraseña"
            {...register("password")}
            style={{
              padding: "0.75rem",
              marginBottom: "1.5rem",
              border: "1px solid #ccc",
              borderRadius: "8px",
              fontSize: "1rem",
              outline: "none",
              transition: "0.3s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#4CAF50")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />

          <button
            type="submit"
            style={{
              padding: "0.75rem",
              backgroundColor: "#4CAF50",
              color: "white",
              fontWeight: "bold",
              fontSize: "1rem",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseOver={(e) =>
              ((e.target as HTMLButtonElement).style.backgroundColor = "#45a049")
            }
            onMouseOut={(e) =>
              ((e.target as HTMLButtonElement).style.backgroundColor = "#4CAF50")
            }
          >
            Registrarse
          </button>

          <p style={{ marginTop: "1rem", textAlign: "center", fontSize: "0.9rem" }}>
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" style={{ color: "#4CAF50", fontWeight: "bold" }}>
              Inicia sesión aquí
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
