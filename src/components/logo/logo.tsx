import type { BoxProps } from '@mui/material/Box';
import type { CSSObject } from '@mui/material/styles';

import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import { RouterLink } from 'src/routes/components';

import { logoClasses } from './classes';

// ----------------------------------------------------------------------

export type LogoProps = BoxProps & {
  href?: string;
  isSingle?: boolean;
  disableLink?: boolean;
};

export const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ href = '/', isSingle = false, disableLink = false, sx, className, ...other }, ref) => {
    const theme = useTheme();

    const PRIMARY_MAIN = theme.vars.palette.primary.main;

    const singleLogo = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        fill="#2a6f97"
        viewBox="0 0 512 512"
        strokeLinecap="round"
        fillRule="evenodd"
        fontSize="9pt"
        stroke="#2a6f97"
      >
        <path
          fill="currentColor"
          d="M 0 457.101 L 33.6 401.101 Q 58.8 422.101 90.3 435.401 A 163.439 163.439 0 0 0 127.893 445.971 A 224.827 224.827 0 0 0 163.8 448.701 A 195.867 195.867 0 0 0 195.631 446.276 Q 224.191 441.565 243.6 427.701 A 71.961 71.961 0 0 0 263.174 407.366 Q 273 391.64 273 371.001 A 83.577 83.577 0 0 0 270.638 350.752 A 68.714 68.714 0 0 0 264.6 334.951 A 56.679 56.679 0 0 0 256.197 323.358 Q 247.308 313.693 232.287 304.299 A 181.025 181.025 0 0 0 232.05 304.151 A 224.731 224.731 0 0 0 214.735 294.506 Q 193.244 283.633 161 271.601 Q 110.6 252.001 80.5 232.051 A 153.52 153.52 0 0 1 58.874 214.918 Q 46.856 203.371 39.467 190.313 A 93.117 93.117 0 0 1 37.45 186.551 A 116.667 116.667 0 0 1 26.805 153.851 A 160.495 160.495 0 0 1 24.5 126.001 Q 24.5 91.001 43.75 62.651 Q 63 34.301 100.45 17.151 Q 137.9 0.001 191.1 0.001 Q 234.5 0.001 269.15 8.751 Q 303.8 17.501 336.7 33.601 L 312.2 90.301 A 220.47 220.47 0 0 0 283.32 76.17 A 291.803 291.803 0 0 0 256.55 66.851 Q 224.7 57.401 189.7 57.401 A 190.309 190.309 0 0 0 161.492 59.361 Q 134.772 63.373 116.9 75.601 A 69.311 69.311 0 0 0 101.756 89.355 A 51.515 51.515 0 0 0 90.3 122.501 A 73.251 73.251 0 0 0 92.347 140.153 A 59.932 59.932 0 0 0 98 154.701 A 48.38 48.38 0 0 0 105.478 164.673 Q 113.876 173.481 128.45 182.001 Q 151.2 195.301 196.7 212.101 A 568.599 568.599 0 0 1 231.549 226.306 Q 248.578 233.958 262.592 241.889 A 248.523 248.523 0 0 1 283.15 254.801 Q 309.246 273.155 322.889 294.092 A 99.608 99.608 0 0 1 328.3 303.451 A 123.05 123.05 0 0 1 340.489 344.491 A 155.088 155.088 0 0 1 341.6 363.301 A 151.971 151.971 0 0 1 336.929 401.805 A 119.733 119.733 0 0 1 318.85 441.001 A 137.325 137.325 0 0 1 270.329 483.16 A 170.496 170.496 0 0 1 255.85 490.001 A 213.65 213.65 0 0 1 203.981 504.029 A 280.191 280.191 0 0 1 163.8 506.801 A 331.567 331.567 0 0 1 109.371 502.512 A 266.343 266.343 0 0 1 70.7 493.151 A 267.441 267.441 0 0 1 33.133 477.875 A 199.029 199.029 0 0 1 0 457.101 Z"
        />
      </svg>
    );

    const fullLogo = (
      <svg
        xmlns="http://www.w3.org/2000/svg "
        width="100%"
        height="100%"
        fill="none"
        viewBox="0 0 1080 350"
        strokeLinecap="round"
        fillRule="evenodd"
        fontSize="9pt"
        stroke="#000"
        strokeWidth="15"
      >
        <path
          fill="currentColor"
          d="M 678.001 0.001 L 770.501 214.001 L 798.001 288.501 L 801.001 288.501 L 793.001 212.501 L 793.001 13.501 A 36.376 36.376 0 0 1 793.163 9.934 Q 793.667 4.835 795.751 2.751 Q 798.038 0.464 803.958 0.079 A 39.287 39.287 0 0 1 806.501 0.001 L 833.001 0.001 L 833.001 336.501 A 36.376 36.376 0 0 1 832.84 340.068 Q 832.335 345.167 830.251 347.251 Q 827.964 349.538 822.045 349.923 A 39.287 39.287 0 0 1 819.501 350.001 L 793.501 350.001 L 701.001 140.001 L 673.001 59.501 L 670.001 59.501 L 677.501 129.501 L 677.501 336.501 A 36.376 36.376 0 0 1 677.34 340.068 Q 676.835 345.167 674.751 347.251 Q 672.464 349.538 666.545 349.923 A 39.287 39.287 0 0 1 664.001 350.001 L 637.501 350.001 L 637.501 13.501 A 36.376 36.376 0 0 1 637.663 9.934 Q 638.167 4.835 640.251 2.751 Q 642.538 0.464 648.458 0.079 A 39.287 39.287 0 0 1 651.001 0.001 L 678.001 0.001 Z M 493.501 183.001 L 439.001 183.001 L 439.001 336.501 A 36.376 36.376 0 0 1 438.84 340.068 Q 438.335 345.167 436.251 347.251 Q 433.964 349.538 428.045 349.923 A 39.287 39.287 0 0 1 425.501 350.001 L 399.001 350.001 L 399.001 47.501 A 99.073 99.073 0 0 1 399.76 34.765 Q 401.857 18.646 409.751 10.751 Q 420.501 0.001 446.501 0.001 L 518.501 0.001 A 99.073 99.073 0 0 1 531.238 0.76 Q 547.357 2.857 555.251 10.751 Q 566.001 21.501 566.001 47.501 L 566.001 336.501 A 36.376 36.376 0 0 1 565.84 340.068 Q 565.335 345.167 563.251 347.251 Q 560.964 349.538 555.045 349.923 A 39.287 39.287 0 0 1 552.501 350.001 L 526.001 350.001 L 526.001 57.501 Q 526.001 43.001 522.251 36.501 A 11.957 11.957 0 0 0 517.56 32.061 Q 513.118 29.587 505.501 29.001 L 459.501 29.001 Q 446.001 30.001 442.501 36.501 A 22.088 22.088 0 0 0 440.732 41.066 Q 439.392 45.898 439.089 53.103 A 105.073 105.073 0 0 0 439.001 57.501 L 439.001 154.001 L 506.001 154.001 L 506.001 169.501 Q 506.001 175.33 504.807 178.372 A 6.976 6.976 0 0 1 503.751 180.251 A 5.482 5.482 0 0 1 501.791 181.698 Q 499.009 183.001 493.501 183.001 Z M 312.501 183.001 L 244.501 183.001 L 244.501 321.001 L 340.001 321.001 L 340.001 336.501 A 36.376 36.376 0 0 1 339.84 340.068 Q 339.335 345.167 337.251 347.251 Q 334.964 349.538 329.045 349.923 A 39.287 39.287 0 0 1 326.501 350.001 L 204.501 350.001 L 204.501 13.501 A 36.376 36.376 0 0 1 204.663 9.934 Q 205.167 4.835 207.251 2.751 Q 209.538 0.464 215.458 0.079 A 39.287 39.287 0 0 1 218.001 0.001 L 340.001 0.001 L 340.001 15.501 Q 340.001 21.33 338.807 24.372 A 6.976 6.976 0 0 1 337.751 26.251 A 5.482 5.482 0 0 1 335.791 27.698 Q 333.009 29.001 327.501 29.001 L 244.501 29.001 L 244.501 154.001 L 325.001 154.001 L 325.001 169.501 Q 325.001 175.33 323.807 178.372 A 6.976 6.976 0 0 1 322.751 180.251 A 5.482 5.482 0 0 1 320.791 181.698 Q 318.009 183.001 312.501 183.001 Z M 138.501 201.501 L 138.501 302.501 A 99.073 99.073 0 0 1 137.743 315.238 Q 135.646 331.357 127.751 339.251 Q 117.001 350.001 91.001 350.001 L 30.001 350.001 A 45.601 45.601 0 0 1 22.521 349.432 Q 18.615 348.78 15.556 347.384 A 18.108 18.108 0 0 1 9.251 342.751 A 31.732 31.732 0 0 1 5.021 336.294 Q 1.876 330.064 0.001 321.001 L 75.001 321.001 Q 90.501 321.001 94.501 314.501 Q 97.845 309.067 98.394 297.344 A 103.796 103.796 0 0 0 98.501 292.501 L 98.501 211.501 Q 98.501 196.001 94.251 189.501 Q 90.808 184.235 78.994 183.235 A 71.353 71.353 0 0 0 73.001 183.001 L 47.501 183.001 A 99.073 99.073 0 0 1 34.765 182.243 Q 18.646 180.146 10.751 172.251 Q 0.001 161.501 0.001 135.501 L 0.001 47.501 A 99.073 99.073 0 0 1 0.76 34.765 Q 2.857 18.646 10.751 10.751 Q 21.501 0.001 47.501 0.001 L 107.001 0.001 A 45.601 45.601 0 0 1 114.481 0.571 Q 118.387 1.222 121.446 2.618 A 18.108 18.108 0 0 1 127.751 7.251 A 31.732 31.732 0 0 1 131.982 13.708 Q 135.126 19.939 137.001 29.001 L 63.501 29.001 Q 48.001 29.001 44.001 35.501 Q 40.657 40.935 40.109 52.659 A 103.796 103.796 0 0 0 40.001 57.501 L 40.001 125.501 Q 40.001 137.664 42.464 144.285 A 18.311 18.311 0 0 0 44.001 147.501 A 10.636 10.636 0 0 0 48.361 151.334 Q 52.298 153.349 58.93 153.842 A 61.854 61.854 0 0 0 63.501 154.001 L 91.001 154.001 A 99.073 99.073 0 0 1 103.738 154.76 Q 119.857 156.857 127.751 164.751 Q 138.501 175.501 138.501 201.501 Z"
        />
      </svg>
    );

    const baseStyles = {
      flexShrink: 0,
      color: 'inherit',
      display: 'inline-flex',
      verticalAlign: 'middle',
      width: isSingle ? 64 : 80,
      height: isSingle ? 64 : 22,
      ...sx,
    } as CSSObject;

    return (
      <Box
        ref={ref}
        component={RouterLink}
        href={href}
        className={logoClasses.root.concat(className ? ` ${className}` : '')}
        aria-label="logo"
        sx={{
          ...baseStyles,
          ...(disableLink && { pointerEvents: 'none' }),
        }}
        {...other}
      >
        {isSingle ? singleLogo : fullLogo}
      </Box>
    );
  }
);
