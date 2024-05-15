import style from './AllUsersAdmin.module.css'
import { useEffect, useState } from 'react'
import userProvider from '../../../utils/userProvider/userProvider'
import AllUsersAdminCards from '../allUsersAdminCards/AllUsersAdminCards'
import LoaderLight from '../../loaderLight/LoaderLight'

const AllUsersAdmin = ({setSelectOption, allUsers, setAllUsers, setLoading, loading}) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    setLoading(true)
    const all = async ()=> {
      const users = await userProvider.adminGetAllUsers()
      setAllUsers(users.data)
      setFilteredUsers(users.data)
      setLoading(false)
   }
   all()
  }, [])

  const handleSearch = () => {
    const filtered = allUsers.filter((user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }

  useEffect(() => { 
    handleSearch()
   }, [searchTerm])

  return (
    <>
    {
      loading
      ? (<LoaderLight/>)
      :(
        <div className={style.tableUsers}>
      <div className={style.inputSearch}>
      <input type="text" placeholder='Buscar por email...' onChange={(e) => setSearchTerm(e.target.value)}/>
      </div>
      <table>
        <thead>
        <tr className={style.trEmailsUsers}>
          <th>Email</th>
          <th>Rol</th>
          <th className={style.thStatus}>Estado</th>
          <th className={style.thButtonUsers}>Acción</th>
        </tr>
        </thead>
        <tbody>
        {
        filteredUsers?.map((e)=>(
          <AllUsersAdminCards
          key={e._id}
          setSelectOption={setSelectOption}
          id={e._id}
          role={e.role}
          banned={e.banned}
          email={e.email}
          />
        ))
      }
        </tbody>
      </table>
      
    </div>
      )
    }
    </>
  )
}

export default AllUsersAdmin