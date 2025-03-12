import { UserProfile } from '@clerk/nextjs';



const UserProfilePage = () => {

  return (
    <>

      <UserProfile
        routing="path"
        path={'/dashboard/user-profile'}
        appearance={{
          elements: {
            rootBox: 'w-full',
            cardBox: 'w-full flex',
          },
        }}
      />
    </>
  );
};

export default UserProfilePage;
