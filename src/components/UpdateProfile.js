import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function UpdateProfile() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, changeEmail, changePassword } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match!')
    }

    if (
      emailRef.current.value !== currentUser.email &&
      passwordRef.current.value !== ''
    ) {
      return setError('Both cant be changes at a time')
    }

    const promises = []
    setLoading(true)
    setError('')
    if (emailRef.current.value !== currentUser.email) {
      promises.push(changeEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(changePassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        navigate('/')
      })
      .catch(() => {
        setError('Failed to update account')
      })
      .finally(() => {
        setLoading(false)
      })
  }
  console.log('passwordRef', passwordRef)
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
            Update Profile
          </h2>
          {error && <Alert variant='danger'> {error} </Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                ref={passwordRef}
                autoComplete='off'
                placeholder='Leave blank to keep the same'
              />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type='password'
                ref={passwordConfirmRef}
                autoComplete='off'
                placeholder='Leave blank to keep the same'
              />
            </Form.Group>
          </Form>
          <Button
            disabled={loading}
            onClick={handleSubmit}
            className='w-100 mt-4'
            type='button'
          >
            Update
          </Button>
          {/* {emailRef.current.value !== currentUser.email && passwordRef} */}
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
        <Link to='/'> Cancel </Link>
      </div>
    </>
  )
}
