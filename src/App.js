import './App.css';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import AdminLogin from "./pages/AdminLogin";
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import AdminDashboard from "./Views/adminDashboard";
import AdminFormView from "./pages/AdminFormView";
import Events from "./pages/Events";
import BlogPostPortal from "./pages/BlogPostPortal";

// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <Navbar />
//         <Switch>
//         <Route path="/" exact component={Home} />
//           <Route path="/AdminFormView" exact component={AdminFormView} />
//           <Route path="/events" exact component={Events} />
//           <Route path="/AdminLogin" exact component={AdminLogin} />  
//           <Route path="/adminDashboard" exact component={AdminDashboard} /> 
//           <Route path="/BlogPostPortal" exact component={BlogPostPortal} /> 
//         </Switch>
//         <Footer />
//       </Router>
    
//     </div>
//   );
// }
// export default App;



const Main = withRouter(({ location }) => {
  return (
    <div className="App">
      {location.pathname !== '/adminDashboard' && <Navbar />}
      <Route path="/" exact component={Home} />
      <Route path="/AdminLogin" exact component={AdminLogin} />
      <Route path="/adminDashboard" exact component={AdminDashboard} />
      <Route path="/AdminFormView" exact component={AdminFormView} />
      <Route path="/events" exact component={Events} />
      <Route path="/BlogPostPortal" exact component={BlogPostPortal} /> 
      {location.pathname !== '/adminDashboard' && <Footer />}
    </div>
  );
});
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Main />
        </Switch>
      </Router>
    </div>
  );
}
export default App;