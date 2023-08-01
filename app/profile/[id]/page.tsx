import { getQuestions } from '@api/questions';
import Profile from '@components/Profile/Profile';
import { Hydrate, dehydrate } from '@tanstack/react-query';
import getQueryClient from '@utils/getQueryClient';

const ProfilePage = async (): Promise<JSX.Element> => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['questions'], getQuestions);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      {/* should be different component where we can make query for single user */}
      <Profile />
    </Hydrate>
  );
};

export default ProfilePage;
