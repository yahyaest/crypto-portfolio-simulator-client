import { createContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext({
  user: null,
  portfolio: null,
  //  getTransaction: function (userData, favAnime) {},
  //  buyCrypto: function (userData, favAnime) {},
  // sellCrypto: function (userData, favAnime) {},
});

export function UserContextProvider(props) {
  const [currentUser, setCurrentUser] = useState({});
  const [currentortfolio, setCurrentortfolio] = useState({});

  useEffect(() => {
    async function fetchData() {
      let email = localStorage.getItem("email");
      await axios
        .post(`${process.env.REACT_APP_API_URL}/users/current-user`, { email })
        .then(async (response) => {
          setCurrentUser(response.data[0]);
          const userId = response.data[0]["_id"];
          await axios
            .post(
              `${process.env.REACT_APP_API_URL}/portfolios/current-portfolio`,
              {
                userId
              }
            )
            .then((response) => setCurrentortfolio(response.data[0]))
            .catch((error) => console.log(error.response?.data));
        })
        .catch((error) => console.log(error.respons?.data));
    }

    fetchData();
  }, []);

  const context = {
    user: currentUser,
    portfolio: currentortfolio,
  };

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
}
export default UserContext;
