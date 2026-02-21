import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useData } from '../../context/DataContext';
import { Save, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { toast } from 'react-toastify';
import { compressImage } from '../../utils/imageUtils';

const GalleryEditor = () => {
    const { data, updateSection } = useData();

    const { register, control, handleSubmit, reset, setValue, watch } = useForm({
        defaultValues: { gallery: data.gallery || [] }
    });

    useEffect(() => {
        if (data.gallery) {
            reset({ gallery: data.gallery });
        }
    }, [data.gallery, reset]);

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'gallery'
    });

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        const toastId = toast.loading(`Compressing & uploading ${files.length} image(s)...`);

        try {
            const compressed = await Promise.all(files.map(f => compressImage(f)));

            compressed.forEach((url, i) => {
                append({ url, caption: '', order: fields.length + i });
            });

            toast.update(toastId, {
                render: `${files.length} image(s) added! Click Save to publish.`,
                type: 'success',
                isLoading: false,
                autoClose: 3000
            });

            // Clear the input so the same file can be re-selected if needed
            e.target.value = '';
        } catch (error) {
            console.error(error);
            toast.update(toastId, {
                render: 'Failed to process images',
                type: 'error',
                isLoading: false,
                autoClose: 3000
            });
        }
    };

    const onSubmit = (formData) => {
        const items = formData.gallery.map((item, index) => ({
            ...item,
            order: index
        }));
        updateSection('gallery', items);
        toast.success('Gallery updated successfully!');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h3 className="font-semibold text-white">Manage Gallery</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Upload images to display in the public gallery section.</p>
                </div>

                {/* Upload Button */}
                <label className="flex items-center gap-2 px-4 py-2 border border-dashed border-primary/40 rounded-lg cursor-pointer hover:bg-primary/5 hover:border-primary transition-all text-primary text-sm font-medium">
                    <Plus size={16} />
                    <span>Add Images</span>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                    />
                </label>
            </div>

            {/* Empty state */}
            {fields.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 border border-dashed border-white/10 rounded-xl text-gray-500">
                    <ImageIcon size={40} className="mb-3 opacity-30" />
                    <p className="text-sm">No images yet. Click <span className="text-primary font-medium">Add Images</span> to get started.</p>
                </div>
            )}

            {/* Image Grid */}
            {fields.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {fields.map((field, index) => {
                        const currentUrl = watch(`gallery.${index}.url`);
                        return (
                            <div key={field.id} className="group relative flex flex-col gap-2">
                                {/* Preview */}
                                <div className="relative aspect-square rounded-xl overflow-hidden border border-white/10 bg-black/40">
                                    {currentUrl ? (
                                        <img
                                            src={currentUrl}
                                            alt={`Gallery ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-600">
                                            <ImageIcon size={28} />
                                        </div>
                                    )}
                                    {/* Delete overlay */}
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-red-400 hover:text-red-300 transition-opacity"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>

                                {/* Caption input */}
                                <input
                                    {...register(`gallery.${index}.caption`)}
                                    placeholder="Caption (optional)"
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-2 py-1.5 text-white text-xs placeholder-gray-600 focus:outline-none focus:border-primary/40"
                                />
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Save Button */}
            {fields.length > 0 && (
                <div className="pt-4">
                    <button
                        type="submit"
                        className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all transform hover:-translate-y-1 flex items-center space-x-2"
                    >
                        <Save size={18} />
                        <span>Save Changes</span>
                    </button>
                </div>
            )}
        </form>
    );
};

export default GalleryEditor;
