import Layout from "@/components/Layout";
import { useState, ChangeEvent, FormEvent } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Mixing",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError] = useState(false);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Clear form
      setFormData({
        name: "",
        email: "",
        projectType: "Mixing",
        message: "",
      });
      
      // Reset success message after a few seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-2">Contact</h1>
        <p className="text-lg text-white/80 mb-12">Get in touch for inquiries, collaborations, or project quotes.</p>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
            
            {submitSuccess ? (
              <div className="bg-green-800/40 border border-green-800 text-white p-4 rounded-lg mb-6">
                Your message has been sent successfully! I&apos;ll get back to you as soon as possible.
              </div>
            ) : submitError ? (
              <div className="bg-red-800/40 border border-red-800 text-white p-4 rounded-lg mb-6">
                There was an error sending your message. Please try again or contact me directly via email.
              </div>
            ) : null}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block mb-2 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              
              <div>
                <label htmlFor="projectType" className="block mb-2 font-medium">
                  Project Type
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="Mixing">Mixing</option>
                  <option value="Mastering">Mastering</option>
                  <option value="Production">Production</option>
                  <option value="Vocal Engineering">Vocal Engineering</option>
                  <option value="Consultation">Consultation</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Tell me about your project and requirements..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-6 py-3 text-gray-900 bg-accent rounded-md font-medium transition-colors ${
                  isSubmitting ? "bg-accent/70" : "hover:bg-accent/90"
                }`}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
          
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            
            <div className="bg-gray-900 p-6 rounded-lg mb-8">
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold mb-1">Email</h3>
                  <a href="mailto:cikanekmgmt@gmail.com" className="text-accent hover:underline">
                    cikanekmgmt@gmail.com
                  </a>
                </div>
                
                <div>
                  <h3 className="font-bold mb-1">Location</h3>
                  <p className="text-white/80">Los Angeles, CA</p>
                </div>
                
                <div>
                  <h3 className="font-bold mb-1">Studio Hours</h3>
                  <p className="text-white/80">Monday - Friday: 10AM - 7PM<br />Weekends: By appointment</p>
                </div>
                
                <div>
                  <h3 className="font-bold mb-1">Response Time</h3>
                  <p className="text-white/80">Usually within 24-48 hours</p>
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-6">Connect</h2>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/henre3000/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-900 p-3 rounded-full hover:bg-gray-800 transition-colors"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63z" clipRule="evenodd" />
                </svg>
              </a>
              
              <a 
                href="https://linktr.ee/henre3000" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-900 p-3 rounded-full hover:bg-gray-800 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M7.9998 12L7.9998 14.6C7.9998 16.7793 9.66091 18 11.9998 18C14.3387 18 15.9998 16.7793 15.9998 14.67L15.9998 12M4.5 8C4.5 9.05223 5.02165 10.0141 5.91697 10.7141C6.25065 10.9771 6.19366 11.4862 5.8818 11.7718C5.4589 12.1652 5.32701 12.7879 5.65568 13.2078L9.47598 18.3496C9.4985 18.3788 9.52186 18.4075 9.54605 18.4356C9.79993 18.7167 10.2368 18.6918 10.4591 18.384C10.4769 18.3595 10.4937 18.3342 10.5095 18.3083L14.2818 11.9902C14.5842 11.4971 14.4303 10.8456 13.9409 10.5459C13.6274 10.3497 13.5489 9.93628 13.7912 9.65335C14.5533 8.73322 14.9998 7.57462 14.9998 6.33333C14.9998 3.3885 12.7612 1 9.9998 1C7.23843 1 4.9998 3.3885 4.9998 6.33333C4.9998 6.89186 5.07626 7.43178 5.21956 7.94201C5.32701 8.30233 5.22299 8.69494 4.9589 8.9641C4.65937 9.2699 4.5 9.6109 4.5 10" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
