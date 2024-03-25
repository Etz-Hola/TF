import React from 'react'
import SidebarWithHeader from '../../../SidebarWithHeader'
import TrainUpload from '../components/TrainUpload'
import TrainListPage from '../components/TrainListPage'

const CreateTrainPage = () => {
  return (
    <SidebarWithHeader>
      {/* <TrainUpload /> */}
      <TrainListPage />
    </SidebarWithHeader>
  )
}

export default CreateTrainPage