import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate, Link } from "react-router-dom";

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const { register, handleSubmit } = useForm<LoginForm>();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/dashboard");
    } catch (error) {
      alert("Error al iniciar sesión. Verifica tus credenciales.");
      console.error(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* 50% Izquierda - Imagen */}
      <div
        style={{
          width: "50%",
          backgroundImage:
            "url('https://res.cloudinary.com/dmnbaipjy/image/upload/v1754259592/ChatGPT_Image_3_ago_2025_16_19_30_ghrvsv.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* 50% Derecha - Formulario */}
      <div
        style={{
          width: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f6fa",
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            width: "350px",
            padding: "2rem",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "1.5rem",
              color: "#333",
            }}
          >
            Iniciar Sesión
          </h2>

          <input
            placeholder="Email"
            {...register("email")}
            style={{
              padding: "10px",
              marginBottom: "1rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          />
          <input
            type="password"
            placeholder="Contraseña"
            {...register("password")}
            style={{
              padding: "10px",
              marginBottom: "1rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "10px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
              cursor: "pointer",
              marginBottom: "1rem",
            }}
          >
            Entrar
          </button>

          <p style={{ fontSize: "14px", textAlign: "center" }}>
            ¿No tienes cuenta?{" "}
            <Link
              to="/register"
              style={{ color: "#007bff", textDecoration: "none" }}
            >
              Regístrate aquí
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
