import React, { useState } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    setError('')

    try {
      await logout()
      navigate('/login')
    } catch {
      setError('Failed to Log out')
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2
            className='text-centre mb-4'
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            Profile
          </h2>
          {error && <Alert variant='danger'> {error} </Alert>}
          <strong>Email: </strong>
          {currentUser.email}
          <Link to='/updateprofile' className='btn btn-primary w-100 mt-3'>
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div
        className='w-100 text-centre'
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button variant='link' onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  )
}
