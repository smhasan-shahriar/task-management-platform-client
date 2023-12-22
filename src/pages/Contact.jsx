import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_embe3hc",
        "template_sehrzwv",
        form.current,
        "qUtYjIUv2eh_USeGp"
      )
      .then(
        (result) => {
          console.log(result.text);
          if(result.text === "OK") {
            toast('Email sent successfully')
            const data = e.target;
            data.reset();
          }
        },
        (error) => {
          toast(error.text)
        }
      );
  };
  return (
    <div className="customContainer max-w-[1440px] min-h-screen mx-auto px-10">
      <h1 className="font-bold text-4xl my-10 mx-auto text-center">
        Contact Us
      </h1>
      <div>
        <form ref={form} onSubmit={sendEmail}>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Name</span>
            </div>
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full"
              required
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Email Address</span>
            </div>
            <input
              name="email"
              type="email"
              placeholder="Your Email"
              className="input input-bordered w-full"
              required
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Phone Number</span>
            </div>
            <input
              name="number"
              type="number"
              placeholder="Your Phone Number"
              className="input input-bordered w-full"
              required
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Description</span>
            </div>
            <textarea
              name="description"
              className="textarea textarea-bordered"
              placeholder="Description"
            ></textarea>
          </label>
         
            <input
              className="btn btn-primary mx-auto w-full mt-5"
              
              type="submit"
              value="Submit"
             
            />
        
        </form>
      </div>
    </div>
  );
};

export default Contact;