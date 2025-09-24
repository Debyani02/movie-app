
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signin from './pages/Signin/signin';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Signup from './pages/Signup/signup';
import Dashboard from './pages/Dashboard/dashboard';
import "bootstrap-icons/font/bootstrap-icons.css";
import MovieDetails from './pages/MovieDetails/moviedetails';
import UpdateMovie from './pages/UpdateMovie/updatemovie';
import ProtectedRoute from './component/ProtectedRoutes/protectedroutes';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Signin />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
          />
          <Route path='/movie/:id' element={
            <ProtectedRoute>
              <MovieDetails />
            </ProtectedRoute>
            }></Route>
          <Route path='/updatemovie/:id' element={
            <ProtectedRoute>
              <UpdateMovie />
            </ProtectedRoute>
            }></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
