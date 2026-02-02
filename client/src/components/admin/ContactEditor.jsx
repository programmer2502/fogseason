import React from 'react';
import { useForm } from 'react-hook-form';
import { useData } from '../../context/DataContext';
import { Save } from 'lucide-react';
import { toast } from 'react-toastify';

const ContactEditor = () => {
    const { data, updateSection } = useData();
    const { register, handleSubmit } = useForm({
        defaultValues: data.contact
    });

    const onSubmit = (formData) => {
        updateSection('contact', formData);
        toast.success("Contact info updated!");
    };

    //   const onSubmit = (formData) => {
    //     updateSection('contact', formData);
    //     toast.success("Contact info updated!");
    // };


    // function return
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h3 className="font-semibold text-white mb-4">Contact Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Email Address</label>
                    <input {...register("email")} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Phone Number</label>
                    <input {...register("phone")} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none" />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Location</label>
                <input {...register("location")} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none" />
            </div>

            <div className="pt-6">
                <button type="submit" className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all transform hover:-translate-y-1 flex items-center space-x-2">
                    <Save size={18} />
                    <span>Save Changes</span>
                </button>
            </div>
        </form>
    );
};

export default ContactEditor;
