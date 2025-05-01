import Image from "next/image";
import React from "react";

function Footer() {
  return (
    <>
      <div
        className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40
      text-sm"
      >
        <div className="">
          <Image
            src="/assets_frontend/logo.svg"
            alt="Logo"
            width={150}
            height={150}
            className="mb-5 w-40"
          />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">Company</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+0-000-000-000</li>
            <li>Sadaqelmi.dev@gmail.com</li>
          </ul>
          <p></p>
        </div>
      </div>
      <div>
        <p className="text-center text-gray-600 text-sm mb-5 border-t border-black pt-5">
          &copy; 2023 Sadaqelmi.dev. All rights reserved.
        </p>
      </div>
    </>
  );
}

export default Footer;
