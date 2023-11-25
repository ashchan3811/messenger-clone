"use client";

import { signOut } from "next-auth/react";

const UserPage = () => {
  return (
    <button type='button' onClick={() => signOut()}>
      Sign Out
    </button>
  );
};

export default UserPage;
