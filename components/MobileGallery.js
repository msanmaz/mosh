import { Image, Stack } from '@chakra-ui/react'
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";


// import required modules
import { Pagination } from "swiper";

export const MobileGallery = (props) => {
    return (
        <Stack>
            <Swiper pagination={true} modules={[Pagination]} id='mobileswiper' className="mySwiper">
                <SwiperSlide id='mobileslide'><Image src={`${props.image}`}/></SwiperSlide>
                <SwiperSlide id='mobileslide'><Image src={`${props.imageSe}`}/></SwiperSlide>
            </Swiper>
        </Stack>
    )
}
