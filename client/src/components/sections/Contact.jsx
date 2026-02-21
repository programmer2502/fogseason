import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useData } from '../../context/DataContext';
import { toast } from 'react-toastify';

const Contact = () => {
    const { data } = useData();
    const { contact } = data;
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (formData) => {
        const { name, subject, message } = formData;
        // Clean phone number: remove non-digits
        const phoneNumber = contact.phone.replace(/\D/g, '');

        // Construct the text message
        const text = `Hi, I am ${name}. Subject: ${subject}. Message: ${message}`;
        const encodedText = encodeURIComponent(text);

        // WhatsApp URL
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;

        // Open in new tab
        window.open(whatsappUrl, '_blank');

        toast.success("Redirecting to WhatsApp...");
        reset();
    }

    return (
        <section id="contact" className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute -left-20 top-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">Get In Touch</h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-secondary to-accent mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
                    {/* Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <h3 className="text-3xl font-bold mb-6 text-slate-900">Contact us now</h3>
                        <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                            Ready to upgrade your infrastructure? Contact our team for a consultation and quote.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center space-x-6 group">
                                <div className="p-4 glass rounded-2xl text-primary group-hover:scale-110 transition-transform duration-300">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Mail me at</p>
                                    <a href={`mailto:${contact.email}`} className="text-slate-900 text-lg font-medium hover:text-primary transition-colors">{contact.email}</a>
                                </div>
                            </div>
                            <div className="flex items-center space-x-6 group">
                                <div className="p-4 glass rounded-2xl text-secondary group-hover:scale-110 transition-transform duration-300">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Call me at</p>
                                    <p className="text-slate-900 text-lg font-medium">{contact.phone}</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-6 group">
                                <div className="p-4 glass rounded-2xl text-accent group-hover:scale-110 transition-transform duration-300 mt-1">
                                    <MapPin size={24} />
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Head Office</p>
                                        <p className="text-slate-900 text-lg font-medium">{contact.headOffice}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Branch Office</p>
                                        <p className="text-slate-900 text-lg font-medium">No- 21/77, Kamaraj nagar, Maduravoyal, Chennai - 600095</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="glass p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm"
                    >
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Name</label>
                                    <input
                                        {...register("name", { required: true })}
                                        type="text"
                                        className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary text-slate-900 focus:ring-1 focus:ring-primary transition-all shadow-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Email</label>
                                    <input
                                        {...register("email", { required: true })}
                                        type="email"
                                        className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary text-slate-900 focus:ring-1 focus:ring-primary transition-all shadow-sm"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Subject</label>
                                <input
                                    {...register("subject", { required: true })}
                                    type="text"
                                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary text-slate-900 focus:ring-1 focus:ring-primary transition-all shadow-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Message</label>
                                <textarea
                                    {...register("message", { required: true })}
                                    rows="4"
                                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary text-slate-900 focus:ring-1 focus:ring-primary transition-all resize-none shadow-sm"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all transform hover:-translate-y-1 flex items-center justify-center space-x-2 shadow-md"
                            >
                                <span>Send Message</span>
                                <Send size={18} />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
