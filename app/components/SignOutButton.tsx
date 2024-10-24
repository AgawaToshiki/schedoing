'use client'
import React, { useState } from 'react'
import { signOut } from '../actions/signOut'
import Button from '../components/elements/button/Button';
import ConfirmModal from '../components/layouts/ConfirmModal';


const SignOutButton = () => {

  const [isOpen, setIsOpen] = useState<boolean>(false);

	const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(true);
  }

  const handleSignOut = async() => {
    const result = await signOut();
    if(result && result.error){
			alert(result.message);
			return
		}
  }
  
  return (
    <>
      <Button
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleOpenModal(e)}
        variant="danger"
        size="medium"
        form="square"
        attrs={
          { type: "button" }
        }
      >
        サインアウト
      </Button>
      {isOpen && (
        <ConfirmModal
          isOpen={isOpen}
          title="サインアウト"
          message="サインアウトしますか？"
          setter={setIsOpen}
        >
          <form action={handleSignOut}>
            <Button
              variant="danger"
              size="medium"
              form="square"
              attrs={
                { type: "submit" }
              }
            >
              サインアウト
            </Button>
          </form>
        </ConfirmModal>
      )}

    </>
  );
}

export default SignOutButton