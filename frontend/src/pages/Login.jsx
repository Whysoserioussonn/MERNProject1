import { useState, useEffect } from "react"; // use useState for form fields, each with a component level state
import { FaSignInAlt } from "react-icons/fa";

function Login() {
  const [formData, setFormData] = useState({    
    email: "",
    password: "",    
  });

   const {  email, password } = formData
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
          <FaSignInAlt /> Login
        </h1>
        <p> Login to Set Resolution Goals</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>          
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
          <button type="submit" class="bg-blue-600 py-3 px-80 hover:invert text-white font-medium ">
              Submit
            </button>            
          </div>
        </form>
      </section>
    </>
  )
}

export default Login



