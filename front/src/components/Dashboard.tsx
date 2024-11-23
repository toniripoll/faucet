import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

const Dashboard = () => {
  return (
    <div className='container p-4'>
        <div><Header/></div>
        <div><Outlet/></div>
        <div><Footer/></div>
    </div>
  )
}

export default Dashboard