import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function RegisterScreen(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/'

  const userRegister = useSelector((state) => state.userRegister)
  const { userInfo, loading, error } = userRegister
  const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("Password and Confirm Password doesn't match !")
    } else {
      dispatch(register(name, email, password))
    }
  }
  useEffect(() => {
    if (userInfo) {
      //console.log('/n/n/n XXXXXX/n/n/n/n')
      props.history.push(redirect)
    }
  }, [props.history, userInfo, redirect])

  return (
    <div>
      <form className='form' onSubmit={submitHandler}>
        <div>
          <h1>Register</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant='danger'>{error}</MessageBox>}
        <div>
          <label htmlFor='name'>Name</label>
          <input
            type='name'
            name
            id='name'
            placeholder='Enter name'
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='email'>Email Adress</label>
          <input
            type='email'
            id='email'
            placeholder='Enter Email Address'
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            placeholder='Enter Password'
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            type='password'
            id='confirmPassword'
            placeholder='Confirm Password'
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div>
          <label />
          <button className='primary' type='submit'>
            Register
          </button>
        </div>

        <div>
          <label />
          <div>
            Already have an account?{' '}
            <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>{' '}
          </div>
        </div>
      </form>
    </div>
  )
}
