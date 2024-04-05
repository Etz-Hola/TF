import React from 'react'
import SidebarWithHeader from '../../SidebarWithHeader'
import Dashboard from './components/Dashboard'
import DataTable from '../Train/components/DataTable'
import TrainListPage from '../Train/components/TrainListPage'
import TrainCards from '../../components/trainCards/TrainCards'

const DashboardPage = () => {
  return (
    <SidebarWithHeader>
      <Dashboard />
      <TrainCards />

       

      
    </SidebarWithHeader>
  )
}

export default DashboardPage