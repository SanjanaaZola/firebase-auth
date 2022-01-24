import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage('')
      setError('')
      await resetPassword(emailRef.current.value)
      setLoading(true)
      setMessage('Check your email for further instructions')
    } catch (error) {
      console.log(error)
      setError('Failed to Reset Password')
    }
    setLoading(false)
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
            Password Reset
          </h2>
          {error && <Alert variant='danger'> {error} </Alert>}
          {message && <Alert variant='success'> {message} </Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} required />
            </Form.Group>
          </Form>
          <Button
            disabled={loading}
            onClick={handleSubmit}
            className='w-100 mt-4'
            type='button'
          >
            Reset Password
          </Button>
          <div
            className='text-centre mt-3'
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Link to='/login'> Login </Link>
          </div>
        </Card.Body>
      </Card>
      <div
        className='w-100 text-centre mt-2'
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Need an Account?{' '}
        <Link to='/signup' className='ms-2'>
          Sign Up
        </Link>
      </div>
    </>
  )
}
