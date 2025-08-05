// src/pages/Login.tsx
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "../hooks/useToast";
import { ToastContainer } from "../components/ToastContainer";

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toasts, showToast, removeToast } = useToast();

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      showToast("¡Bienvenido de vuelta!", "success");
      navigate("/dashboard");
    } catch (error: any) {
      let errorMessage = "Error al iniciar sesión";
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = "No existe una cuenta con este email";
          break;
        case 'auth/wrong-password':
          errorMessage = "Contraseña incorrecta";
          break;
        case 'auth/invalid-email':
          errorMessage = "Email inválido";
          break;
        case 'auth/too-many-requests':
          errorMessage = "Demasiados intentos. Intenta más tarde";
          break;
        default:
          errorMessage = "Verifica tus credenciales";
      }
      
      showToast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

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
        
        .login-container {
          display: flex;
          min-height: 100vh;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .login-image {
          width: 50%;
          background-image: url('https://res.cloudinary.com/dqstycwjr/image/upload/v1754352392/Dise%C3%B1o_sin_t%C3%ADtulo_6_xdbccb.png');
          background-size: cover;
          background-position: center;
          position: relative;
          overflow: hidden;
        }
        
        .login-image::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(76, 175, 80, 0.8), rgba(33, 150, 243, 0.6));
          z-index: 1;
        }
        
        .image-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          color: white;
          padding: 2rem;
        }
        
        .image-content h2 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        
        .image-content p {
          font-size: 1.2rem;
          opacity: 0.9;
          max-width: 400px;
          line-height: 1.6;
        }
        
        .login-form-section {
          width: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          padding: 2rem;
        }
        
        .login-form {
          width: 100%;
          max-width: 400px;
          background: white;
          padding: 3rem 2.5rem;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          position: relative;
        }
        
        .form-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .form-header h2 {
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }
        
        .form-header p {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
          position: relative;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: var(--text-primary);
          font-size: 0.9rem;
        }
        
        .input-wrapper {
          position: relative;
        }
        
        .form-input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: #f8f9fa;
          box-sizing: border-box;
        }
        
        .form-input:focus {
          outline: none;
          border-color: var(--primary);
          background: white;
          box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
        }
        
        .form-input.error {
          border-color: var(--error);
          background: #fff5f5;
        }
        
        .password-toggle {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.2rem;
          color: var(--text-secondary);
          padding: 4px;
        }
        
        .error-message {
          color: var(--error);
          font-size: 0.8rem;
          margin-top: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        
        .submit-button {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, var(--primary), var(--primary-dark));
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .submit-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(76, 175, 80, 0.3);
        }
        
        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }
        
        .loading-spinner {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 2px solid #ffffff;
          border-radius: 50%;
          border-top-color: transparent;
          animation: spin 1s ease-in-out infinite;
          margin-right: 8px;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .form-footer {
          text-align: center;
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid #e0e0e0;
        }
        
        .form-footer p {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin: 0;
        }
        
        .form-footer a {
          color: var(--primary);
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
        }
        
        .form-footer a:hover {
          color: var(--primary-dark);
        }
        
        .demo-credentials {
          background: #f0f8ff;
          border: 1px solid #b3d9ff;
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1.5rem;
          font-size: 0.8rem;
        }
        
        .demo-credentials h4 {
          margin: 0 0 0.5rem 0;
          color: var(--secondary);
          font-size: 0.9rem;
        }
        
        @media (max-width: 768px) {
          .login-container {
            flex-direction: column;
          }
          
          .login-image {
            width: 100%;
            min-height: 40vh;
          }
          
          .image-content h2 {
            font-size: 2rem;
          }
          
          .login-form-section {
            width: 100%;
            min-height: 60vh;
          }
          
          .login-form {
            padding: 2rem 1.5rem;
            margin: 1rem;
          }
        }
        
        @media (max-width: 480px) {
          .login-form {
            padding: 1.5rem 1rem;
          }
          
          .form-header h2 {
            font-size: 1.5rem;
          }
        }
      `}</style>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div className="login-container">
        {/* Imagen de fondo con contenido */}
        <div className="login-image">
          <div className="image-content">
            <h2>¡Bienvenido de vuelta!</h2>
            <p>Continúa tu viaje de aprendizaje con ShineScript y desbloquea tu potencial tecnológico</p>
          </div>
        </div>

        {/* Formulario de login */}
        <div className="login-form-section">
          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <div className="form-header">
              <h2>Iniciar Sesión</h2>
              <p>Ingresa tus credenciales para acceder</p>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-wrapper">
                <input
                  id="email"
                  type="email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="tu@email.com"
                  {...register("email", {
                    required: "El email es requerido",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email inválido"
                    }
                  })}
                />
              </div>
              {errors.email && (
                <div className="error-message">
                  <span>⚠️</span>
                  <span>{errors.email.message}</span>
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <div className="input-wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  placeholder="Tu contraseña"
                  {...register("password", {
                    required: "La contraseña es requerida",
                    minLength: {
                      value: 6,
                      message: "La contraseña debe tener al menos 6 caracteres"
                    }
                  })}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.password && (
                <div className="error-message">
                  <span>⚠️</span>
                  <span>{errors.password.message}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={loading}
            >
              {loading && <div className="loading-spinner"></div>}
              {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </button>

            <div className="form-footer">
              <p>
                ¿No tienes cuenta?{" "}
                <Link to="/register">
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}