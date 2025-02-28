import { OrganizationProfile } from '@clerk/nextjs';



const OrganizationProfilePage = (props: { params: { locale: string } }) => {


  return (
    <>

      {/*  <TitleBar
        title={t('title_bar')}
        description={t('title_bar_description')}
      /> */}

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
