import React from "react";
import { useForm } from "react-hook-form";

function ContactCard() {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => {
  }


  return (
    <section className="contact padding-top padding-bottom">
      <div className="container">
        <div className="section-header section-header--middle">
          <div className="section-header__content">
            <div className="section-header__titlebar">
              <h2 className="section__header__title"> Get In Touch</h2>
            </div>
          </div>
        </div>
        <div className="contact__wrapper">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <form onSubmit={handleSubmit(onSubmit)} className="form">
                <div className="row">
                  <div className="col-md-6">
                    <input  {...register("name")} type="text" placeholder="Your Name*" required="" />
                  </div>
                  <div className="col-md-6">
                    <input {...register("email")} type="email" placeholder="Your Email*" required="" />
                  </div>
                  <div className="col-md-6">
                    <input {...register("phone")} type="tel" placeholder="Your No*" required="" />
                  </div>
                  <div className="col-md-6">
                    <input {...register("Subject")} type="text" placeholder="Subject*" required="" />
                  </div>
                  <div className="col-12">
                    <textarea {...register("Your Message")} placeholder="Your Message" defaultValue={""} />
                  </div>
                </div>
                <div className="text-center">
                  <button type="submit" className="default-btn">
                    <span>Send Your Message</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactCard;
