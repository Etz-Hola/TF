import React from 'react'
import SidebarWithHeader from '../../SidebarWithHeader'
import Profile from './components/Profile'
import TrainListPage from '../Train/components/TrainListPage'

const ProfilePage = () => {
  return (
    <SidebarWithHeader >
      <Profile />
      <TrainListPage />
    </SidebarWithHeader>
  )
}

export default ProfilePage