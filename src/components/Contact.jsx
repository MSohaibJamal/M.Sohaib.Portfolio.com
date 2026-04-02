import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const emailJsServiceId =
    import.meta.env.VITE_EMAILJS_SERVICE_ID ||
    import.meta.env.VITE_APP_EMAILJS_SERVICE_ID;
  const emailJsTemplateId =
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID ||
    import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID;
  const emailJsPublicKey =
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY ||
    import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY;
  const contactName =
    import.meta.env.VITE_CONTACT_NAME ||
    import.meta.env.VITE_APP_CONTACT_NAME ||
    "Sohaib Jamal";
  const contactEmail =
    import.meta.env.VITE_CONTACT_EMAIL ||
    import.meta.env.VITE_APP_CONTACT_EMAIL ||
    "sohaibjamal140@gmail.com";

  const [loading, setLoading] = useState(false);
  const isFormComplete =
    form.name.trim() && form.email.trim() && form.message.trim();

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormComplete) {
      alert("Please fill in your name, email, and message before sending.");
      return;
    }

    if (!emailJsServiceId || !emailJsTemplateId || !emailJsPublicKey) {
      alert(
        "Email is not configured yet. Add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in your local .env and in your Vercel project settings."
      );
      return;
    }

    setLoading(true);

    try {
      const emailRequest = emailjs.send(
        emailJsServiceId,
        emailJsTemplateId,
        {
          from_name: form.name,
          to_name: contactName,
          from_email: form.email,
          reply_to: form.email,
          to_email: contactEmail,
          message: form.message,
        },
        emailJsPublicKey
      );

      await Promise.race([
        emailRequest,
        new Promise((_, reject) =>
          setTimeout(
            () =>
              reject(
                new Error(
                  "Email request timed out. Please check EmailJS template settings and try again."
                )
              ),
            15000
          )
        ),
      ]);

      alert("Thank you. I will get back to you as soon as possible.");
      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("EmailJS send failed:", error);
      alert(error?.text || error?.message || "Ahh, something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'
          noValidate
        >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              required
              autoComplete='name'
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="What's your web address?"
              required
              autoComplete='email'
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Message</span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='What you want to say?'
              required
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>

          <button
            type='submit'
            disabled={loading}
            className='bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary'
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
