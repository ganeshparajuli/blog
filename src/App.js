import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import ArticlesList from "./pages/ArticlesList";
import Article from "./pages/Article";
import NotFound from "./pages/NotFound";

// Components
import NavBar from "./components/NavBar";

function App() {
  return (
    <Router>
      <NavBar />
      <div className='max-w-screen-md mx-auto pt-20'>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/articles-list' element={<ArticlesList />} />
          <Route exact path='/article/:name' element={<Article />} />
          <Route component={NotFound} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
