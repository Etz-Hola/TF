import React from 'react'
import SidebarWithHeader from '../../SidebarWithHeader'
import Dashboard from './components/Dashboard'
import DataTable from '../Train/components/DataTable'
import TrainListPage from '../Train/components/TrainListPage'

const DashboardPage = () => {
  return (
    <SidebarWithHeader>
      <Dashboard />
      <TrainListPage />

      
    </SidebarWithHeader>
  )
}

export default DashboardPage