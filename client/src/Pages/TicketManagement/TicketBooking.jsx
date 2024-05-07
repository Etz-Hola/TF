import React from 'react'
import BookTicket from '../../components/TicketManagement/BookTicket'
import SidebarWithHeader from '../../SidebarWithHeader'
import BookedTickets from '../../components/TicketManagement/BookedTickets'

const TicketBooking = () => {
    return (
        <>
        <SidebarWithHeader>

            <BookTicket />
            {/* <TicketBooking /> */}
            {/* <BookedTickets /> */}
        </SidebarWithHeader>
        </>
    )
}

export default TicketBooking