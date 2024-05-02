import React from 'react'
import BookTicket from '../../components/TicketManagement/BookTicket'
import SidebarWithHeader from '../../SidebarWithHeader'

const TicketBooking = () => {
    return (
        <>
        <SidebarWithHeader>

            <BookTicket />
            {/* <TicketBooking /> */}
        </SidebarWithHeader>
        </>
    )
}

export default TicketBooking