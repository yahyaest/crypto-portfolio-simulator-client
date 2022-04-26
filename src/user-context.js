import { createContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext({
  user: null,
  portfolio: null,
});

export function UserContextProvider(props) {
  const [currentUser, setCurrentUser] = useState({});
  const [currentPortfolio, setCurrentPortfolio] = useState({});

  useEffect(() => {
    async function fetchData() {
      let email = localStorage.getItem("email");

      try {
        // Get current User
        const user = await axios.post(
          `${process.env.REACT_APP_API_URL}/users/current-user`,
          {
            email,
          }
        );

        setCurrentUser(user.data[0]);
        // Get current portfolio
        const userId = user.data[0]["_id"];
        const portfolio = await axios.post(
          `${process.env.REACT_APP_API_URL}/portfolios/current-portfolio`,
          {
            userId,
          }
        );
        setCurrentPortfolio(portfolio.data[0]);
      } catch (error) {
        console.log(error.respons?.data);
      }
    }

    fetchData();
  }, []);

  const context = {
    user: currentUser,
    portfolio: currentPortfolio,
  };

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
}
export default UserContext;
