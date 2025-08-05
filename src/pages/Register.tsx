// src/pages/Register.tsx
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "../hooks/useToast";
import { ToastContainer } from "../components/ToastContainer";

interface RegisterForm {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

export default function Register() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterForm>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toasts, showToast, removeToast } = useToast();

  const password = watch("password");

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      
      // Actualizar el perfil del usuario con el nombre completo
      await updateProfile(userCredential.user, {
        displayName: data.fullName
      });
      
      showToast("¡Cuenta creada exitosamente! Bienvenido a ShineScript", "success");
      navigate("/dashboard");
    } catch (error: any) {
      let errorMessage = "Error al crear la cuenta";
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = "Ya existe una cuenta con este email";
          break;
        case 'auth/invalid-email':
          errorMessage = "Email inválido";
          break;
        case 'auth/operation-not-allowed':
          errorMessage = "Registro no permitido";
          break;
        case 'auth/weak-password':
          errorMessage = "La contraseña es muy débil";
          break;
        default:
          errorMessage = "Error inesperado. Intenta de nuevo";
      }
      
      showToast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: "", color: "#e0e0e0" };
    
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 25;
    if (password.match(/\d/)) strength += 25;
    if (password.match(/[^a-zA-Z\d]/)) strength += 25;
    
    if (strength < 50) return { strength, label: "Débil", color: "#f44336" };
    if (strength < 75) return { strength, label: "Media", color: "#FF9800" };
    return { strength, label: "Fuerte", color: "#4CAF50" };
  };

  const passwordStrength = getPasswordStrength(password || "");

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
        
        .register-container {
          display: flex;
          min-height: 100vh;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .register-image {
          width: 50%;
          background-image: url('https://res.cloudinary.com/dqstycwjr/image/upload/v1754352392/Dise%C3%B1o_sin_t%C3%ADtulo_6_xdbccb.png');
          background-size: cover;
          background-position: center;
          position: relative;
          overflow: hidden;
        }
        
        .register-image::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(33, 150, 243, 0.8), rgba(76, 175, 80, 0.6));
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
        
        .register-form-section {
          width: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          padding: 2rem;
          overflow-y: auto;
        }
        
        .register-form {
          width: 100%;
          max-width: 450px;
          background: white;
          padding: 3rem 2.5rem;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          margin: 2rem 0;
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
        
        .form-input.success {
          border-color: var(--success);
          background: #f5fff5;
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
        
        .password-strength {
          margin-top: 0.5rem;
        }
        
        .strength-bar {
          height: 4px;
          background: #e0e0e0;
          border-radius: 2px;
          overflow: hidden;
          margin-bottom: 0.25rem;
        }
        
        .strength-fill {
          height: 100%;
          transition: all 0.3s ease;
          border-radius: 2px;
        }
        
        .strength-label {
          font-size: 0.8rem;
          font-weight: 500;
        }
        
        .error-message {
          color: var(--error);
          font-size: 0.8rem;
          margin-top: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        
        .success-message {
          color: var(--success);
          font-size: 0.8rem;
          margin-top: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        
        .checkbox-group {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }
        
        .checkbox-input {
          margin-top: 0.2rem;
        }
        
        .checkbox-label {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }
        
        .checkbox-label a {
          color: var(--primary);
          text-decoration: none;
        }
        
        .checkbox-label a:hover {
          text-decoration: underline;
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
        
        .benefits-list {
          background: #f0f8ff;
          border: 1px solid #b3d9ff;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .benefits-list h4 {
          margin: 0 0 1rem 0;
          color: var(--secondary);
          font-size: 1rem;
          font-weight: 600;
        }
        
        .benefits-list ul {
          margin: 0;
          padding-left: 1rem;
          list-style: none;
        }
        
        .benefits-list li {
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        @media (max-width: 768px) {
          .register-container {
            flex-direction: column;
          }
          
          .register-image {
            width: 100%;
            min-height: 40vh;
          }
          
          .image-content h2 {
            font-size: 2rem;
          }
          
          .register-form-section {
            width: 100%;
            min-height: 60vh;
          }
          
          .register-form {
            padding: 2rem 1.5rem;
            margin: 1rem;
          }
        }
        
        @media (max-width: 480px) {
          .register-form {
            padding: 1.5rem 1rem;
          }
          
          .form-header h2 {
            font-size: 1.5rem;
          }
        }
      `}</style>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div className="register-container">
        {/* Imagen de fondo con contenido */}
        <div className="register-image">
          <div className="image-content">
            <h2>¡Únete a ShineScript!</h2>
            <p>Comienza tu viaje hacia el éxito tecnológico con los mejores bootcamps del mercado</p>
          </div>
        </div>

        {/* Formulario de registro */}
        <div className="register-form-section">
          <form onSubmit={handleSubmit(onSubmit)} className="register-form">
            <div className="form-header">
              <h2>Crear Cuenta</h2>
              <p>Únete a miles de estudiantes que ya transformaron su carrera</p>
            </div>

            {/* Beneficios de registrarse */}
            <div className="benefits-list">
              <h4>✨ Al registrarte obtienes:</h4>
              <ul>
                <li>🎯 Acceso a bootcamps exclusivos</li>
                <li>📜 Certificados reconocidos</li>
                <li>👥 Comunidad de desarrolladores</li>
                <li>🚀 Proyectos del mundo real</li>
              </ul>
            </div>

            <div className="form-group">
              <label htmlFor="fullName">Nombre completo</label>
              <div className="input-wrapper">
                <input
                  id="fullName"
                  type="text"
                  className={`form-input ${errors.fullName ? 'error' : ''}`}
                  placeholder="Tu nombre completo"
                  {...register("fullName", {
                    required: "El nombre es requerido",
                    minLength: {
                      value: 2,
                      message: "El nombre debe tener al menos 2 caracteres"
                    },
                    pattern: {
                      value: /^[a-zA-ZÀ-ÿ\s]+$/,
                      message: "Solo se permiten letras y espacios"
                    }
                  })}
                />
              </div>
              {errors.fullName && (
                <div className="error-message">
                  <span>⚠️</span>
                  <span>{errors.fullName.message}</span>
                </div>
              )}
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
                  className={`form-input ${errors.password ? 'error' : passwordStrength.strength > 50 ? 'success' : ''}`}
                  placeholder="Crea una contraseña segura"
                  {...register("password", {
                    required: "La contraseña es requerida",
                    minLength: {
                      value: 8,
                      message: "La contraseña debe tener al menos 8 caracteres"
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
              
              {password && (
                <div className="password-strength">
                  <div className="strength-bar">
                    <div 
                      className="strength-fill" 
                      style={{ 
                        width: `${passwordStrength.strength}%`,
                        backgroundColor: passwordStrength.color
                      }}
                    />
                  </div>
                  <div className="strength-label" style={{ color: passwordStrength.color }}>
                    Fortaleza: {passwordStrength.label}
                  </div>
                </div>
              )}
              
              {errors.password && (
                <div className="error-message">
                  <span>⚠️</span>
                  <span>{errors.password.message}</span>
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar contraseña</label>
              <div className="input-wrapper">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                  placeholder="Confirma tu contraseña"
                  {...register("confirmPassword", {
                    required: "Confirma tu contraseña",
                    validate: value => value === password || "Las contraseñas no coinciden"
                  })}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  title={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.confirmPassword && (
                <div className="error-message">
                  <span>⚠️</span>
                  <span>{errors.confirmPassword.message}</span>
                </div>
              )}
              {!errors.confirmPassword && watch("confirmPassword") && password === watch("confirmPassword") && (
                <div className="success-message">
                  <span>✅</span>
                  <span>Las contraseñas coinciden</span>
                </div>
              )}
            </div>

            <div className="checkbox-group">
              <input
                type="checkbox"
                id="terms"
                className="checkbox-input"
                {...register("terms", {
                  required: "Debes aceptar los términos y condiciones"
                })}
              />
              <label htmlFor="terms" className="checkbox-label">
                Acepto los <a href="#" target="_blank">términos y condiciones</a> y la <a href="#" target="_blank">política de privacidad</a> de ShineScript
              </label>
            </div>
            {errors.terms && (
              <div className="error-message" style={{ marginTop: '-1rem', marginBottom: '1rem' }}>
                <span>⚠️</span>
                <span>{errors.terms.message}</span>
              </div>
            )}

            <button
              type="submit"
              className="submit-button"
              disabled={loading}
            >
              {loading && <div className="loading-spinner"></div>}
              {loading ? "Creando cuenta..." : "Crear Cuenta"}
            </button>

            <div className="form-footer">
              <p>
                ¿Ya tienes cuenta?{" "}
                <Link to="/login">
                  Inicia sesión aquí
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}