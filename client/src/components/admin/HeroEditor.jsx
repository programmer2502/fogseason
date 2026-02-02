import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useData } from '../../context/DataContext';
import { Save, Plus, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

const HeroEditor = () => {
    const { data, updateSection } = useData();
    const { register, control, handleSubmit } = useForm({
        defaultValues: data.hero
    });

    const { fields: ctaFields, append: appendCta, remove: removeCta } = useFieldArray({
        control,
        name: "cta"
    });

    const onSubmit = (formData) => {
        updateSection('hero', formData);
        toast.success("Hero section updated successfully!");
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Full Name</label>
                    <input
                        {...register("name")}
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Professional Title</label>
                    <input
                        {...register("title")}
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Tagline</label>
                <input
                    {...register("tagline")}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                />
            </div>

            {/* CTAs */}
            <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-white">Call to Action Buttons</h3>
                    <button
                        type="button"
                        onClick={() => appendCta({ label: "New Button", link: "#", primary: false })}
                        className="text-sm flex items-center space-x-1 text-primary hover:text-white transition-colors"
                    >
                        <Plus size={16} />
                        <span>Add Button</span>
                    </button>
                </div>
                {ctaFields.map((field, index) => (
                    <div key={field.id} className="flex gap-4 items-start bg-white/5 p-4 rounded-lg border border-white/5">
                        <div className="flex-1 space-y-3">
                            <div>
                                <label className="text-xs text-gray-500 mb-1 block">Label</label>
                                <input {...register(`cta.${index}.label`)} className="w-full bg-black/40 border border-white/10 rounded p-2 text-white text-sm" />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 mb-1 block">Link</label>
                                <input {...register(`cta.${index}.link`)} className="w-full bg-black/40 border border-white/10 rounded p-2 text-white text-sm" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 mt-6">
                            <label className="flex items-center space-x-2 text-sm text-gray-400 cursor-pointer hover:text-white">
                                <input type="checkbox" {...register(`cta.${index}.primary`)} className="rounded border-gray-600 bg-black/40 text-primary focus:ring-primary" />
                                <span>Primary Style</span>
                            </label>
                            <button
                                type="button"
                                onClick={() => removeCta(index)}
                                className="text-red-500 hover:text-red-400 text-sm flex items-center space-x-1"
                            >
                                <Trash2 size={16} />
                                <span>Remove</span>
                            </button>
                        </div>
                    </div>
                ))}
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

export default HeroEditor;
