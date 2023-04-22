import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex items-center justify-center flex-col gap-[10px] h-[90vh]">
      <h1 className='text-4xl font-bold mb-10'>This is Home page</h1>
      <h2 className='text-xl'>If you need to add contact, please go to <NavLink to='/contacts' className="font-bold text-white bg-black rounded px-2 py-1">Contacts</NavLink></h2>
      <h2 className='text-xl'>If you need to see graphs, please go to <NavLink to='/graph' className="font-bold text-white bg-black rounded px-2 py-1">Graphs</NavLink></h2>
    </div>
  )
}

export default Home