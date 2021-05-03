import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signup } from '../firebase/auth';

function Signup() {
  const {register, handleSubmit, reset } = useForm();
  // eslint-disable-next-line no-undef
  const [isLoading, setLoading] = useState(false);

  const onSubmit =  async data => {
    setLoading(true);
    try {
      await signup(data);
      reset();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  const formClassName = `ui form ${isLoading ? 'loading' : ''}`;
  
  return (
    <div className="login-container">
      <div className="ui card login-card">
        <div className="content">
          <form className={formClassName} onSubmit={handleSubmit(onSubmit)}>
            <div className="two fields">
              <div className="field">
                <label>
                  First Name
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    {...register('firstName')}
                  />
                </label>
              </div>
              <div className="field">
                <label>
                  Last Name
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    {...register('lastName')}
                  />
                </label>
              </div>
            </div>
            <div className="field">
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  {...register('email')}
                />
              </label>
            </div>
            <div className="field">
              <label>
                Password
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  {...register('password')}
                />
              </label>
            </div>
            <div className="field actions">
              <button className="ui primary button login" type="submit">
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
