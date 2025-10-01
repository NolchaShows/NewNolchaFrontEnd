import React, { useState } from "react";

function Form() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };
  return (
    <div className="lg:bg-[url('/landing/background2.jpg')] lg:bg-center lg:rounded-[12px] lg:h-[685px] max-w-[1440px] mx-auto ">
      <div className="lg:py-[80px] lg:px-[40px] py-[20px] px-[16px]">
        <div className="flex lg:flex-row flex-col lg:justify-between w-full ">
          <img src="/landing/step.svg"
          className="hidden lg:block"
          />
          <img src="/landing/step2.svg"
          className="lg:hidden w-[398px]"
          />
          <form onSubmit={handleSubmit} className="flex flex-col gap-[16px] lg:max-w-[665px] w-full  mt-[10%]">
            <div className="gap-4 lg:flex hidden ">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-1/2 border border-gray-300 bg-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-1/2 border border-gray-300 rounded bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              </div>

              <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full lg:hidden border-b border-[#909090] lg:border lg:border-gray-300 bg-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full lg:hidden border-b border-[#909090] lg:border lg:border-gray-300 rounded bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border-b border-[#909090] lg:border lg:border-gray-300 rounded px-3 bg-white py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full border-b border-[#909090] lg:border lg:border-gray-300 rounded px-3 bg-white py-2 h-[200px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>

            <button
              type="submit"
              className="w-full hidden lg:block cursor-pointer bg-[var(--primary-color)] text-[#141414] py-2 rounded "
            >Submit</button>
            <button
              type="submit"
              className="w-full lg:hidden cursor-pointer bg-[var(--primary-color)] text-[#141414] py-2 rounded "
            >Let's talk</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;
