import { NextPage } from "next";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { setupApiClient } from "../services/api";
import { api } from "../services/apiClient";
import { withSSRAuth } from "../utils/withSSRAuth";

const Dashboard: NextPage = () => {
  const {user} = useContext(AuthContext);

  useEffect(() => {
    api.get('/me').then(response => console.log('Dashboard', response.data))
    .catch(err => console.log('Dashboard', err));
  }, [])

  return (
    <h1>Dashboard, {user.email}</h1>
  )
}

// eslint-disable-next-line @next/next/no-typos
export const GetServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupApiClient(ctx);
  const response = await apiClient.get('/me');

  console.log(response.data)

  return {
    props: {},
  }
})

export default Dashboard
