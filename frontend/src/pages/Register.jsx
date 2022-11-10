import { useState, useEffect } from "react"; // use useState for form fields, each with a component level state
import { FaUserSecret } from "react-icons/fa";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "", // to confirm password (confirmation)
  });

   const { name, email, password, password2 } = formData
  // create onChange to allow user to type in textfields
   const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const onSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <>
      <section className='heading'>
        <h1>
          <FaUserSecret /> Register
        </h1>
        <p> Please create an account</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              placeholder='Enter your name'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              placeholder='Confirm password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
          <button type="submit" class="bg-blue-600 py-3 px-80 hover:invert text-white font-medium ">
              Submit
            </button>
            
          </div>
        </form>
      </section>
    </>
  )
}

export default Register



