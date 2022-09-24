import ProfileLayout from 'components/Profile/ProfileLayout'
import React from 'react'
import Education from './education'
import Experience from './experience'

const ProfilePage = () => {
  return (
    <ProfileLayout>
      <Experience />
      <Education />
    </ProfileLayout>
  )
}

export default ProfilePage
