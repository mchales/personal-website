'use client';

import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import Alert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';

import { useBoolean } from 'src/hooks/use-boolean';

import { Logo } from 'src/components/logo';

import { Main } from './main';
import { Footer } from './footer';
import { NavMobile } from './nav/mobile';
import { NavDesktop } from './nav/desktop';
import { navData } from '../config-nav-main';
import { MenuButton } from '../components/menu-button';
import { LayoutSection } from '../core/layout-section';
import { HeaderSection } from '../core/header-section';

// ----------------------------------------------------------------------

export type MainLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
};

export function MainLayout({ sx, children, header }: MainLayoutProps) {
  const theme = useTheme();

  const openMobileNav = useBoolean();

  const layoutQuery: Breakpoint = 'md';

  return (
    <LayoutSection
      /** **************************************
       * Header
       *************************************** */
      headerSection={
        <HeaderSection
          layoutQuery={layoutQuery}
          sx={header?.sx}
          slots={{
            topArea: (
              <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
                This is an info Alert.
              </Alert>
            ),
            leftArea: (
              <>
                {/* -- Menu button -- */}
                <MenuButton
                  onClick={openMobileNav.onTrue}
                  sx={{
                    mr: 1,
                    ml: -1,
                    [theme.breakpoints.up(layoutQuery)]: { display: 'none' },
                  }}
                />
                <NavMobile
                  data={navData}
                  open={openMobileNav.value}
                  onClose={openMobileNav.onFalse}
                />
                {/* -- Logo -- */}
                <Logo />
              </>
            ),
            centerArea: (
              <NavDesktop
                data={navData}
                sx={{
                  display: 'none',
                  [theme.breakpoints.up(layoutQuery)]: { display: 'flex' },
                }}
              />
            ),
          }}
        />
      }
      /** **************************************
       * Footer
       *************************************** */
      footerSection={<Footer layoutQuery={layoutQuery} />}
      /** **************************************
       * Stylex
       *************************************** */
      sx={sx}
    >
      <Main>{children}</Main>
    </LayoutSection>
  );
}
