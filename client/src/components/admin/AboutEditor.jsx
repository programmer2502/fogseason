import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useData } from '../../context/DataContext';
import { toast } from 'react-toastify';
import { compressImage } from '../../utils/imageUtils';
import { Save, Plus, Trash2, Image as ImageIcon } from 'lucide-react';

const AboutEditor = () => {
    const { data, updateSection } = useData();
    const { register, control, handleSubmit, watch, setValue } = useForm({
        defaultValues: data.about
    });

    const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({
        control,
        name: "skills"
    });

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const toastId = toast.loading("Compressing & Uploading...");
        try {
            const compressed = await compressImage(file);
            setValue("image", compressed, { shouldDirty: true });
            toast.update(toastId, { render: "Image uploaded successfully!", type: "success", isLoading: false, autoClose: 2000 });
        } catch (error) {
            console.error(error);
            toast.update(toastId, { render: "Failed to process image", type: "error", isLoading: false, autoClose: 3000 });
        }
    };

    const onSubmit = (formData) => {
        updateSection('about', formData);
        toast.success("About section updated!");
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Profile Image</label>
                    <input {...register("image")} className="hidden" />
                    <div className="flex gap-4 items-start">
                        {watch("image") ? (
                            <div className="relative group w-32 h-32 rounded-lg overflow-hidden border border-white/20 bg-black/50">
                                <img src={watch("image")} alt="Profile" className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => setValue("image", "", { shouldDirty: true })}
                                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-red-500 transition-opacity"
                                >
                                    <Trash2 size={24} />
                                </button>
                            </div>
                        ) : (
                            <div className="w-32 h-32 rounded-lg border border-dashed border-white/20 flex flex-col items-center justify-center bg-white/5 text-gray-500">
                                <ImageIcon size={24} />
                                <span className="text-xs mt-2">No Image</span>
                            </div>
                        )}
                        <label className="cursor-pointer px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-white transition-colors flex items-center gap-2">
                            <Plus size={16} />
                            <span>Upload Image</span>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageUpload}
                            />
                        </label>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Years Exp.</label>
                        <input type="number" {...register("experienceYears")} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Projects Done</label>
                        <input type="number" {...register("projectsCompleted")} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none" />
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Biography</label>
                <div className="bg-black/40 rounded-lg overflow-hidden border border-white/10">
                    <textarea
                        {...register("bio")}
                        rows="6"
                        className="w-full bg-transparent p-3 text-white focus:outline-none resize-y"
                    ></textarea>
                </div>
            </div>

            {/* Skills */}
            <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-white">Skills</h3>
                    <button
                        type="button"
                        onClick={() => appendSkill({ name: "New Skill", level: 50 })}
                        className="text-sm flex items-center space-x-1 text-primary hover:text-white transition-colors"
                    >
                        <Plus size={16} />
                        <span>Add Skill</span>
                    </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    {skillFields.map((field, index) => (
                        <div key={field.id} className="flex gap-4 items-center bg-white/5 p-4 rounded-lg border border-white/5">
                            <div className="flex-1">
                                <input {...register(`skills.${index}.name`)} placeholder="Skill Name" className="w-full bg-black/40 border border-white/10 rounded p-2 text-white text-sm mb-2" />
                                <div className="flex items-center gap-2">
                                    <input
                                        type="range"
                                        {...register(`skills.${index}.level`)}
                                        className="w-full accent-primary h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                                    />
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => removeSkill(index)}
                                className="text-red-500 hover:text-red-400"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>
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

export default AboutEditor;
