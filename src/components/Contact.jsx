import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from 'react-i18next';
// import TitleHeader from "../components/TitleHeader";

const Contact = () => {
  const { t } = useTranslation(); // Initialize useTranslation hook
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    contactNo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );

      toast.success(t("contact.successMessage")); // Translated success message
      setForm({ name: "", email: "", message: "", contactNo: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error(t("contact.errorMessage")); // Translated error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 text-gray-200 min-h-screen flex items-center justify-center">
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-gray-50">
          {t("contact.mainTitle")}
        </h2>
        {/* <p className="text-center text-lg md:text-xl mb-12 max-w-2xl mx-auto text-gray-400">
          {t("contact.description")}
        </p> */}
        <div className="text-center mb-12 text-gray-300"> {/* mb-12 to add space before form */}
          <p className="text-xl font-semibold mb-2">
            {t("footer.tel")}: <a href={`tel:${t("footer.telNo").replace(/\s/g, '').replace(/\+/g, '')}`} className="text-blue-400 hover:text-blue-300 transition-colors duration-200">{t("footer.telNo")}</a>
          </p>
          <p className="text-xl font-semibold">
            {t("footer.fax")}: {t("footer.faxNo")}
          </p>
        </div>

        <div className="flex justify-center">
          <div className="bg-gray-850 rounded-lg shadow-2xl p-8 sm:p-10 lg:p-12 w-full max-w-lg border border-gray-700 hover:border-blue-700 transition-colors duration-300">
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">
                  {t("contact.nameLabel")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t("contact.namePlaceholder")}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
                  {t("contact.emailLabel")} {/* Updated */}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t("contact.emailPlaceholder")}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-300 text-sm font-medium mb-2">
                  {t("contact.messageLabel")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder={t("contact.messagePlaceholder")}
                  rows="6"
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200 resize-y"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t("contact.sending")} {/* Updated */}
                  </>
                ) : (
                  t("contact.sendMessage") // Updated
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
    </section>
  );
};

export default Contact;