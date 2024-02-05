import React from "react";

import aboutMain from "../Assets/Images/aboutMainImage.png";
import HomeLayout from "../Layouts/HomeLayouts";

const AboutUs = () => {
  return (
    <HomeLayout>
      <div className="pl-30 pt-20 flex flex-col text-white ">
        <div className="flex items-center justify- gap-5 mx-10">
          <section className="w-1/2 space-y-10">
            <h1 className="text-5xl text-yellow-500 font-semibold">
              {" "}
              Affordable and Quality eduction
            </h1>
            <p className="text-xl text-green-500">
              This education website designed to sell courses is a platform that
              facilitates the online sale and delivery of educational content.
              These websites typically offer a diverse range of courses,
              covering various subjects and skill levels, with the primary goal
              of providing valuable learning experiences to users. Here is a
              short description of key features and functionalities commonly
              found on such websites:
            </p>
          </section>
          <div className="w-1/2">
            <img
              alt="about main page"
              src={aboutMain}
              className="drop-shadow-2xl"
            />
          </div>
        </div>
        <div className="flex items-center justify-center flex-wrap pl-30 gap-5">
          <div className="h-96 carousel carousel-vertical rounded-box">
            <div className="carousel-item h-full">
              <img src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg" />
            </div>
            <div className="carousel-item h-full">
              <img src="https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg" />
            </div>
            <div className="carousel-item h-full">
              <img src="https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg" />
            </div>
            <div className="carousel-item h-full">
              <img src="https://daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg" />
            </div>
            <div className="carousel-item h-full">
              <img src="https://daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg" />
            </div>
            <div className="carousel-item h-full">
              <img src="https://daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg" />
            </div>
            <div className="carousel-item h-full">
              <img src="https://daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg" />
            </div>
          </div>
          <div className="h-96 carousel carousel-vertical rounded-box">
            <div className="carousel-item h-full">
              <img src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg" />
            </div>
            <div className="carousel-item h-full">
              <img src="https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg" />
            </div>
            <div className="carousel-item h-full">
              <img src="https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg" />
            </div>
            <div className="carousel-item h-full">
              <img src="https://daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg" />
            </div>
            <div className="carousel-item h-full">
              <img src="https://daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg" />
            </div>
            <div className="carousel-item h-full">
              <img src="https://daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg" />
            </div>
            <div className="carousel-item h-full">
              <img src="https://daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg" />
            </div>
          </div>
          <div className="h-96 carousel carousel-vertical rounded-box">
            <div className="carousel-item h-full">
              <img src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg" />
            </div>
            <div className="carousel-item h-full">
              <img src="https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg" />
            </div>
            <div className="carousel-item h-full">
              <img src="https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg" />
            </div>
            <div className="carousel-item h-full">
              <img src="https://daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg" />
            </div>
            <div className="carousel-item h-full">
              <img src="https://daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg" />
            </div>
            <div className="carousel-item h-full">
              <img src="https://daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg" />
            </div>
            <div className="carousel-item h-full">
              <img src="https://daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg" />
            </div>
          </div>
          <div className="h-96 carousel carousel-vertical rounded-box">
            <div className="carousel-item h-full">
              <img src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg" />
            </div>
            <div className="carousel-item h-full">
              <img src="https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg" />
            </div>
            <div className="carousel-item h-full">
              <img src="https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg" />
            </div>
            <div className="carousel-item h-full">
              <img src="https://daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg" />
            </div>
            <div className="carousel-item h-full">
              <img src="https://daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg" />
            </div>
            <div className="carousel-item h-full">
              <img src="https://daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg" />
            </div>
            <div className="carousel-item h-full">
              <img src="https://daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg" />
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default AboutUs;
