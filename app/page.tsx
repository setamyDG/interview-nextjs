import { getQuestions } from '@api/questions';
import TechCardList from '@components/TechCardList/TechCardList';

const Page = async (): Promise<JSX.Element> => {
  const symbol = '</>';
  const data = await getQuestions();

  return (
    <section className='bg-white rounded-2xl sm:shadow-2xl px-12 py-12'>
      <div className='w-full flex-center flex-col'>
        <h1 className='head_text text-center'>
          Discover & Share
          <br className='max-md:hidden' />
          <span className='blue_gradient text-center'> Interview {symbol} Challenges</span>
        </h1>
      </div>
      <TechCardList questions={data} />
    </section>
  );
};

export default Page;
