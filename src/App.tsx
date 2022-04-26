import { Switch, Route, Redirect } from "react-router-dom";
import CryptoPage from "./pages/cryptoPage";
import Navbar from "./components/navbar";
import LoginPage from "./pages/loginPage";
import DashboardPage from "./pages/dashboardPage";
import HomePage from "./pages/homePage";

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/login" component={LoginPage}></Route>
        <Route path="/dashboard" component={DashboardPage}></Route>
        <Route path="/currencies" component={CryptoPage}></Route>
        <Route path="/home" component={HomePage}></Route>

        <Redirect from="/" exact to="/home"></Redirect>
      </Switch>
    </div>
  );
};

export default App;
