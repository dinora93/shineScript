// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CourseDetail from "./pages/CourseDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import { Layout, AuthLayout, DashboardLayout, LandingLayout } from "./components/Layout";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Página de inicio pública con Layout completo */}
        <Route 
          path="/" 
          element={
            <LandingLayout>
              <Home />
            </LandingLayout>
          } 
        />

        {/* Login sin navbar/footer */}
        <Route 
          path="/login" 
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          } 
        />

        {/* Registro sin navbar/footer */}
        <Route 
          path="/register" 
          element={
            <AuthLayout>
              <Register />
            </AuthLayout>
          } 
        />

        {/* Dashboard protegido con navbar pero sin footer */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Detalle de curso protegido con navbar pero sin footer */}
        <Route
          path="/course/:id"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <CourseDetail />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Rutas adicionales con Layout completo */}
        <Route 
          path="/bootcamps" 
          element={
            <Layout>
              <div className="container mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold text-center mb-8">Nuestros Bootcamps</h1>
                <p className="text-center text-gray-600 mb-12">
                  Explora nuestra amplia gama de programas intensivos de tecnología
                </p>
                {/* Aquí iría el componente de lista de bootcamps */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Placeholder para bootcamps */}
                  <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                    <h3 className="text-xl font-semibold mb-4">Próximamente</h3>
                    <p className="text-gray-600">Más bootcamps disponibles pronto</p>
                  </div>
                </div>
              </div>
            </Layout>
          } 
        />

        <Route 
          path="/about" 
          element={
            <Layout>
              <div className="container mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold text-center mb-8">Sobre Nosotros</h1>
                <div className="max-w-3xl mx-auto text-center">
                  <p className="text-lg text-gray-600 mb-8">
                    ShineScript es una plataforma educativa dedicada a transformar carreras 
                    a través de bootcamps intensivos de tecnología.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                    <div className="text-center">
                      <div className="text-4xl mb-4">🎯</div>
                      <h3 className="text-xl font-semibold mb-2">Misión</h3>
                      <p className="text-gray-600">
                        Capacitar a profesionales con las habilidades más demandadas del mercado tech
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl mb-4">👁️</div>
                      <h3 className="text-xl font-semibold mb-2">Visión</h3>
                      <p className="text-gray-600">
                        Ser la plataforma líder en educación tecnológica en Latinoamérica
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl mb-4">💎</div>
                      <h3 className="text-xl font-semibold mb-2">Valores</h3>
                      <p className="text-gray-600">
                        Excelencia, innovación y compromiso con el éxito de nuestros estudiantes
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Layout>
          } 
        />

        <Route 
          path="/contact" 
          element={
            <Layout>
              <div className="container mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold text-center mb-8">Contacto</h1>
                <div className="max-w-2xl mx-auto">
                  <div className="bg-white rounded-xl shadow-lg p-8">
                    <form className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nombre completo
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Tu nombre"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="tu@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mensaje
                        </label>
                        <textarea
                          rows={5}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="¿En qué podemos ayudarte?"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 transform hover:-translate-y-1"
                      >
                        Enviar Mensaje ✨
                      </button>
                    </form>
                  </div>

                  {/* Información de contacto */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                    <div className="text-center">
                      <div className="text-3xl mb-3">📧</div>
                      <h3 className="font-semibold mb-2">Email</h3>
                      <p className="text-gray-600">hola@shinescript.com</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl mb-3">📱</div>
                      <h3 className="font-semibold mb-2">WhatsApp</h3>
                      <p className="text-gray-600">+503 2660-0000</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl mb-3">🌍</div>
                      <h3 className="font-semibold mb-2">Ubicación</h3>
                      <p className="text-gray-600">San Miguel, El Salvador</p>
                    </div>
                  </div>
                </div>
              </div>
            </Layout>
          } 
        />

        {/* Ruta 404 - Página no encontrada con Layout completo */}
        <Route 
          path="*" 
          element={
            <Layout>
              <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <div className="max-w-md mx-auto">
                  {/* Ilustración 404 */}
                  <div className="text-8xl mb-6">🤔</div>
                  
                  <h1 className="text-6xl font-bold text-purple-600 mb-4">404</h1>
                  
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Página no encontrada
                  </h2>
                  
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    La página que buscas no existe o ha sido movida. 
                    Pero no te preocupes, ¡tenemos muchas otras cosas geniales para ti!
                  </p>
                  
                  <div className="space-y-4">
                    <a 
                      href="/" 
                      className="inline-block bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-8 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
                    >
                      🏠 Volver al Inicio
                    </a>
                    
                    <div className="text-sm text-gray-500">
                      <p>¿Necesitas ayuda? <a href="/contact" className="text-purple-600 hover:underline">Contáctanos</a></p>
                    </div>
                  </div>
                  
                  {/* Enlaces útiles */}
                  <div className="mt-12 grid grid-cols-2 gap-4 text-sm">
                    <a href="/bootcamps" className="text-purple-600 hover:underline">
                      📚 Ver Bootcamps
                    </a>
                    <a href="/about" className="text-purple-600 hover:underline">
                      ℹ️ Sobre Nosotros
                    </a>
                    <a href="/contact" className="text-purple-600 hover:underline">
                      📞 Contacto
                    </a>
                    <a href="/login" className="text-purple-600 hover:underline">
                      👤 Iniciar Sesión
                    </a>
                  </div>
                </div>
              </div>
            </Layout>
          } 
        />
      </Routes>
    </div>
  );
}

export default App;