import { UserProfile } from '@clerk/nextjs';



const UserProfilePage = (props: { params: { locale: string } }) => {

  return (
    <>
    {/*   <TitleBar
        title={'title_bar'}
        description={'title_bar_description'}
      /> */}

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
