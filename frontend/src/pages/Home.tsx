import { useEffect, useState } from 'react'
import { IUsersApi } from '../api/http-request-interface'
import api from '../api/http-request'
const Home = () => {
  const [users, setUsers] = useState<IUsersApi[]>([]);
  useEffect(() => {
    const requestUsers = async () => {
       const response = await api.getUsers();
       setUsers(response.data);
    }

    requestUsers();
  }, [])
  return (
    <>
      <p>Home</p>
      { users.map((el: IUsersApi, idx: number) => <p key={idx}>{el.name}</p>) }
    </>
  )
}

export default Home