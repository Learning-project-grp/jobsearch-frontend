import ProfileLayout from 'components/Profile/ProfileLayout'
import React from 'react'
import Education from './Education'
import Experience from './Experience'

const ProfilePage = () => {
  return (
    <ProfileLayout>
      <Experience />
      <Education />
    </ProfileLayout>
  )
}

export default ProfilePage
