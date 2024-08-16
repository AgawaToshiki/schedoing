import React from 'react'


const SignOutButton = () => {

  return (
    <>
      <form action="../api/auth/signout" method="post">
        <button className="p-1 border bg-red-400" type="submit">
          サインアウト
        </button>
      </form>
    </>
  );
}

export default SignOutButton