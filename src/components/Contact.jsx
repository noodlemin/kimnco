import { useRef, useState } from "react";
// import emailjs from "@emailjs/browser";

// --- i18n Placeholder ---
// Replace this with your actual i18n hook, e.g., const { t } = useTranslation();
const t = (key) => {
  const translations = {
    "contact.title": "Get in Touch – Let’s Connect",
    "contact.subtitle": "💬 Have questions or ideas? Let’s talk! 🚀",
    "contact.name.label": "Your name",
    "contact.name.placeholder": "What’s your good name?",
    "contact.email.label": "Your Email",
    "contact.email.placeholder": "What’s your email address?",
    "contact.message.label": "Your Message",
    "contact.message.placeholder": "How can I help you?",
    "contact.button.send": "Send Message",
    "contact.button.sending": "Sending...",
    "contact.alert.agree": "You must agree to the privacy policy to continue.",
    "contact.alert.success": "Thank you! Your message has been sent.",
    "contact.alert.error": "Something went wrong. Please try again.",
  };
  return translations[key] || key;
};
// -------------------------

// import TermsAndConditions from "./TermsAndConditions"; // <-- Import new component
// import LocationMap from "./LocationMap";             // <-- Import new component

function Contact() {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false); // <-- State for consent
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAgreed) {
      alert(t('contact.alert.agree'));
      return;
    }

    setLoading(true);

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );

      alert(t('contact.alert.success'));
      setForm({ name: "", email: "", message: "" });
      setIsAgreed(false); // Reset consent checkbox
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert(t('contact.alert.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="flex-center section-padding bg-black">
      <div className="w-full h-full md:px-10 px-5">

        <div className="grid-12-cols mt-16">
          <div className="xl:col-span-5">
            <div className="flex-center card-border rounded-xl p-10">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-7"
              >
                {/* --- Form fields (no changes here) --- */}
                <div>
                  <label htmlFor="name">{t("contact.name.label")}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t("contact.name.placeholder")}
                    required />
                </div>

                <div>
                  <label htmlFor="email">{t("contact.email.label")}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder={t("contact.email.placeholder")}
                    required />
                </div>

                <div>
                  <label htmlFor="message">{t("contact.message.label")}</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder={t("contact.message.placeholder")}
                    rows="5"
                    required />
                </div>

                {/* --- Inserted Terms and Conditions Component --- */}
                {/* <TermsAndConditions
              isAgreed={isAgreed}
              onAgreeChange={() => setIsAgreed(!isAgreed)}
              t={t} // Pass the translation function
            /> */}

                {/* --- Submit Button with Disabled Logic --- */}
                <button type="submit" disabled={loading || !isAgreed}>
                  <div className="cta-button group">
                    <div className="bg-circle" />
                    <p className="text">
                      {loading ? t("contact.button.sending") : t("contact.button.send")}
                    </p>
                    <div className="arrow-wrapper">
                      <img src="/images/arrow-down.svg" alt="arrow" />
                    </div>
                  </div>
                </button>
              </form>
            </div>
          </div>
          <div className="xl:col-span-7 min-h-96">
            <div className="bg-[#cd7c2e] w-full h-full hover:cursor-grab rounded-3xl overflow-hidden">
              {/* <ContactExperience /> */}
            </div>
          </div>
        </div>

        {/* --- Location Map Section Below The Grid --- */}
        {/* <LocationMap t={t} /> */}
      </div>
    </section>
  );
}

export default Contact;