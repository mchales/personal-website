import { useEffect } from 'react';
import image1 from 'public/assets/images/home/home-pic-1.png';
import image2 from 'public/assets/images/home/home-pic-2.jpg';
import image3 from 'public/assets/images/home/home-pic-3.jpg';

import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

import { Image } from 'src/components/image';
import { Lightbox, useLightBox } from 'src/components/lightbox';
import {
  Carousel,
  useCarousel,
  CarouselThumb,
  CarouselThumbs,
  CarouselArrowFloatButtons,
} from 'src/components/carousel';

// ----------------------------------------------------------------------

const images = [
  { src: image1.src, description: 'Default pic' },
  {
    src: image2.src,
    description: 'Playing Chinese chess masters in Furong Ancient Street. Jinan, China',
  },
  { src: image3.src, description: 'My dog showing how she feels about the HOA' },
];

export function HomeImageCarousel() {
  const carousel = useCarousel({
    thumbs: {
      slidesToShow: 'auto',
    },
  });

  // Create slides for Lightbox with correct types
  const slidesForLightbox = images.map((image) => ({
    src: image.src,
  }));

  const lightbox = useLightBox(slidesForLightbox);

  useEffect(() => {
    if (lightbox.open) {
      carousel.mainApi?.scrollTo(lightbox.selected, true);
    }
  }, [carousel.mainApi, lightbox.selected, lightbox.open]);

  return (
    <>
      <Box
        sx={{
          mb: 2.5,
          borderRadius: 2,
          position: 'relative',
          bgcolor: 'background.neutral',
        }}
      >
        <CarouselArrowFloatButtons
          {...carousel.arrows}
          options={carousel.options}
          slotProps={{
            prevBtn: { sx: { left: 8 } },
            nextBtn: { sx: { right: 8 } },
          }}
          sx={{ borderRadius: '50%', color: 'action.active', bgcolor: 'transparent' }}
        />
        <Carousel carousel={carousel} sx={{ borderRadius: 2 }}>
          {images.map((slide) => (
            <Tooltip key={slide.src} title={slide.description}>
              <Image alt={slide.description} src={slide.src} ratio="1/1" sx={{ minWidth: 320 }} />
            </Tooltip>
          ))}
        </Carousel>
      </Box>

      <CarouselThumbs
        ref={carousel.thumbs.thumbsRef}
        options={carousel.options?.thumbs}
        slotProps={{ disableMask: true }}
        sx={{ width: { xs: 1, sm: 360 } }}
      >
        {images.map((item, index) => (
          <CarouselThumb
            key={index}
            index={index}
            src={item.src}
            selected={index === carousel.thumbs.selectedIndex}
            onClick={() => carousel.thumbs.onClickThumb(index)}
          />
        ))}
      </CarouselThumbs>

      <Lightbox
        index={lightbox.selected}
        slides={slidesForLightbox}
        close={lightbox.onClose}
        onGetCurrentIndex={(index) => lightbox.setSelected(index)}
      />
    </>
  );
}
