import { useContext, useEffect } from "react";
import { Can } from "../components/Can";
import { AuthContext } from "../contexts/AuthContext";
import { useCan } from "../hooks/useCan";
import { setupApiClient } from "../services/api";
import { api } from "../services/apiClient";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function Dashboard() {
  const {user} = useContext(AuthContext);

  useEffect(() => {
    api.get('/me').then(response => console.log('Dashboard', response.data))
    .catch(err => console.log('Dashboard', err));
  }, [])

  return (
    <>
      <h1>Dashboard, {user.email}</h1>

      <Can permissions={['metrics.list']}>
        <p>You can see metrics</p>
      </Can>
      
    </>
    
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupApiClient(ctx);
  const response = await apiClient.get('/me');

  return {
    props: {},
  }
})
