import React from 'react'
import { updateStatus } from '../utils/supabaseFunctions';
// import { signOut } from '../utils/auth'

type Props = {
  id: string;
}

const SignOutButton = ({id}: Props) => {

  // const handleSignOut = async() => {
  //   try {
  //     await signOut();
  //     await updateStatus(id, 'offline');
  //   } catch(error) {
  //     console.error("SignOut Error:", error);
  //   }
  // }

  return (
    <>
      {/* <button className="p-1 border bg-red-400" onClick={ handleSignOut }>サインアウト</button> */}
      <form action="../auth/signout" method="post">
        <button className="p-1 border bg-red-400" type="submit">
          サインアウト
        </button>
      </form>
    </>
  );
}

export default SignOutButton