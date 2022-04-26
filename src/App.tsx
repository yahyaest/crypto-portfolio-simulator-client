import { Switch, Route, Redirect } from "react-router-dom";
import CryptoPage from "./pages/cryptoPage";
import Navbar from "./components/navbar";
import LoginPage from "./pages/loginPage";

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/login" component={LoginPage}></Route>

        <Route path="/crypto" component={CryptoPage}></Route>
        <Redirect from="/" exact to="/home"></Redirect>
      </Switch>
    </div>
  );
};

export default App;
