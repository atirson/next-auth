import type { NextPage } from 'next'
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import styles from '../styles/Home.module.css'
import { withSSRGuest } from '../utils/withSSRGuest';

const Home: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useContext(AuthContext)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = {
      email,
      password
    }

    await signIn(data);
  }

  return (
   <form onSubmit={handleSubmit} className={styles.container}>
     <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
     <button type='submit'>Entrar</button>
   </form>
  )
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {},
  }
})

export default Home
