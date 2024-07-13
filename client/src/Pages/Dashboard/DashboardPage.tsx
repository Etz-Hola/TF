import React from 'react'
import SidebarWithHeader from '../../SidebarWithHeader'
import Dashboard from './components/Dashboard'
 import TrainCards from '../../components/trainCards/TrainCards'
import Footer from '../../components/Footer'
import BookedTickets from '../../components/TicketManagement/BookedTickets'
import TicketBooking from '../../components/TicketManagement/TicketBooking'
import TicketList from '../../components/TicketManagement/TicketList'


const DashboardPage = () => {
  return (
    <SidebarWithHeader>
      {/* <Dashboard /> */}
      {/* <TicketList /> */}
      {/* <BookedTickets/> */}
      {/* <TicketBooking/> */}
      
      <TrainCards />
    

       

      
    </SidebarWithHeader>
  )
}

export default DashboardPage