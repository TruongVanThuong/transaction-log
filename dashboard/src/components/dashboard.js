import { useState, useEffect } from 'react';
import AuthUser from './AuthUser';

export default function Dashboard() {
  const { getAuthUser } = AuthUser();
  const [userDetail, setUserDetail] = useState(null);

  useEffect(() => {
    const authUser = getAuthUser();
    setUserDetail(authUser);
  }, [getAuthUser]);

  return (
    <div>
      <h1 className='mb-4 mt-4'>Dashboard page</h1>
      {userDetail ? (
        <div>
          <h4>Name</h4>
          <p>{userDetail.name}</p>
          <h4>Email</h4>
          <p>{userDetail.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}