import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <div className="bg-black p-4">
      <div className="container text-white m-auto flex justify-between items-center xs:flex-col">
        <NavLink to={'/'} ><h1 className="text-2xl">Contact Management</h1></NavLink>
        <div className="flex gap-4">
          <NavLink to={'/contacts'}>Contacts</NavLink>
          <NavLink to={'/graph'} >Graphs</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Header