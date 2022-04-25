import { Switch, Route, Redirect, } from "react-router-dom";
import CryptoPage from "./pages/cryptoPage";

const App: React.FC = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/crypto" component={CryptoPage}></Route>
        <Redirect from="/" exact to="/home"></Redirect>
      </Switch>
    </div>
  );
};

export default App;
