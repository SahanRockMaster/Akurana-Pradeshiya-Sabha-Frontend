import './App.css';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import AdminLogin from "./pages/AdminLogin";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AdminDashboard from "./Views/adminDashboard";
import AdminFormView from "./pages/AdminFormView";
import Events from "./pages/Events";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
        <Route path="/" exact component={Home} />
          <Route path="/AdminFormView" exact component={AdminFormView} />
          <Route path="/events" exact component={Events} />
          <Route path="/AdminLogin" exact component={AdminLogin} />  
          <Route path="/adminDashboard" exact component={AdminDashboard} /> 
        </Switch>
        <Footer />
      </Router>
    
    </div>
  );
}
export default App;
