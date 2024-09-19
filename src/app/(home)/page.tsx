import { HomeView } from 'src/sections/_home/view/home-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Sean McHale Home Page',
  description:
    'This is the home page for Sean McHale. It contains information about him and his projects.',
  keywords: '',
};

export default function Page() {
  return <HomeView />;
}
