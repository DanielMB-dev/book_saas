import { OrganizationProfile } from '@clerk/nextjs';



const OrganizationProfilePage = () => {


  return (
    <>

      <OrganizationProfile
        routing="path"
        path={
          '/dashboard/organization-profile'
        }
        afterLeaveOrganizationUrl="/onboarding/organization-selection"
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

export default OrganizationProfilePage;
