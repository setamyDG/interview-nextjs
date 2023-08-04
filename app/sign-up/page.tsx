import SignUpForm from '@components/SignUpForm/SignUpForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Sign up via different providers',
};

const SignUpPage = () => <SignUpForm />;

export default SignUpPage;
