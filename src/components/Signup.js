import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export const Signup = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match!')
    }

    try {
      setError('')
      await signup(emailRef.current.value, passwordRef.current.value)
      navigate('/')
      setLoading(true)
    } catch (error) {
      console.log(error)
      setError('Failed to create an account')
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
            Sign Up
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
            <Form.Group id='password'>
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type='password'
                ref={passwordConfirmRef}
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
            Sign Up
          </Button>
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
        Already have an Account? <Link to='/login' className='ms-2'> Log In </Link>
      </div>
    </>
  )
}
