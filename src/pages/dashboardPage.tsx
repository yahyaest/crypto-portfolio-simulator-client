import React from 'react'
import { useContext } from "react";
import UserContext from "../user-context";

const DashboardPage = () => {
    const userCtx = useContext(UserContext);
  console.log(userCtx);

  return (
    <div>DashboardPage</div>
  )
}

export default DashboardPage