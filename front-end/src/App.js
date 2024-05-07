import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import route from './routes/Routes'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {
            route.routes.map((route) => (
              <Route key={route.path}
                path={route.path}
                element={
                  <route.element />
                }
              />
            ))
          }
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
