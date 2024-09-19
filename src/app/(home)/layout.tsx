import { MainLayout } from 'src/layouts/main';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <MainLayout
      header={{
        sx: { position: { md: 'fixed' } },
      }}
    >
      {children}
    </MainLayout>
  );
}
