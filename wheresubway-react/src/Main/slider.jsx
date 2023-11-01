// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../Component/sliderStyle.css';

// img
import gangImg from '../Component/sliderImg/gang.jpg';
import sooImg from '../Component/sliderImg/soo.jpeg';
import leeImg from '../Component/sliderImg/lee.jpeg';
import hongImg from '../Component/sliderImg/hongda.jpeg';
import apImg from '../Component/sliderImg/ap.jpeg';
import sinImg from '../Component/sliderImg/sin.jpeg';

export default () => {

  return (
    <div className="swiper-slide">
        <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={5}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
        
        >
            
        <SwiperSlide><img src={gangImg} alt="강남"/></SwiperSlide>
        <SwiperSlide><img src={sooImg} alt="수원"/></SwiperSlide>
        <SwiperSlide><img src={hongImg} alt="홍대"/></SwiperSlide>
        <SwiperSlide><img src={leeImg} alt="이태원"/></SwiperSlide>
        <SwiperSlide><img src={apImg} alt="압구정"/></SwiperSlide>
        <SwiperSlide><img src={sinImg} alt="신사"/></SwiperSlide>

        </Swiper>
    </div>
  );
};