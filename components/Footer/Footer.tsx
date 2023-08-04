const Footer = (): JSX.Element => (
  <footer className='bg-gray-50 py-4 text-white' role='contentinfo'>
    <div className='container mx-auto text-center'>
      <p className='text-sm text-gray-300'>&copy; {new Date().getFullYear()} setamyDG. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
