import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError('')
      const xyz = await login(emailRef.current.value, passwordRef.current.value)
      console.log(xyz)
      localStorage.setItem('ACCESS_TOKEN', JSON.stringify(xyz.user.accessToken))
      navigate('/')
      setLoading(true)
    } catch (error) {
      console.log(error)
      setError('Failed to Log In')
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
            Log In
          </h2>
          {error && <Alert variant='danger'> {error} </Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} required />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                ref={passwordRef}
                required
                autoComplete='off'
              />
            </Form.Group>
          </Form>
          <Button
            disabled={loading}
            onClick={handleSubmit}
            className='w-100 mt-4'
            type='button'
          >
            Log In
          </Button>
          <div
            className='text-centre mt-3'
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Link to='/forgotpassword'> Forgot Password?</Link>
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
        Need an Account? <Link to='/signup' className='ms-2'> Sign Up</Link>
      </div>
    </>
  )
}
