import React from 'react';
const Login = () => {
  return (
    <div
      class="d-flex flex-column align-self-center align-items-center mx-2"
      style="background: white; margin-top: 1rem; border-radius: 1rem"
    >
      <a
        class="btn btn-primary mb-3"
        style="
          background: #1a2c55;
          width: 20rem;
          height: 5rem;
          font-size: 1.5rem;
        "
        href="/auth/outlook"
        role="button"
      >
        Sign in with Outlook
      </a>
    </div>
  );
};
  
export default Login;
