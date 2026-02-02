import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useData } from '../../context/DataContext';
import { Save, Plus, Trash2, GripVertical, Image as ImageIcon } from 'lucide-react';
import { toast } from 'react-toastify';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

import { compressImage } from '../../utils/imageUtils';

const ProjectsEditor = () => {
    const { data, updateSection } = useData();

    // Prepare default values: ensure 'gallery' (string) exists for the textarea
    const preparedProjects = data.projects ? data.projects.map(p => ({
        ...p,
        gallery: p.images ? p.images.join('\n') : (p.image || '')
    })) : [];

    const { register, control, handleSubmit, reset, setValue, watch } = useForm({
        defaultValues: { projects: preparedProjects }
    });

    // Reset form when data changes (e.g. initial load)
    useEffect(() => {
        if (data.projects) {
            const formatted = data.projects.map(p => ({
                ...p,
                gallery: p.images ? p.images.join('\n') : (p.image || '')
            }));
            reset({ projects: formatted });
        }
    }, [data.projects, reset]);

    const { fields, append, remove, move: moveField } = useFieldArray({
        control,
        name: "projects"
    });

    const onDragEnd = (result) => {
        if (!result.destination) return;
        moveField(result.source.index, result.destination.index);
    };

    const handleImageUpload = async (e, index) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        const toastId = toast.loading("Compressing & Uploading...");

        try {
            const compressedImages = await Promise.all(files.map(file => compressImage(file)));

            // Get current gallery value
            const currentGallery = watch(`projects.${index}.gallery`) || '';
            const currentImages = currentGallery.split('\n').filter(Boolean);

            // Append new images
            const newImages = [...currentImages, ...compressedImages];

            setValue(`projects.${index}.gallery`, newImages.join('\n'), { shouldDirty: true });

            toast.update(toastId, { render: "Images added successfully!", type: "success", isLoading: false, autoClose: 2000 });

        } catch (error) {
            console.error(error);
            toast.update(toastId, { render: "Failed to process images", type: "error", isLoading: false, autoClose: 3000 });
        }
    };

    const onSubmit = (formData) => {
        // Convert tags from string to array if needed
        // Convert gallery string to images array
        const processedProjects = formData.projects.map(p => {
            let tags = p.tags;
            if (typeof tags === 'string') {
                tags = tags.split(',').map(t => t.trim()).filter(Boolean);
            }

            // Process images
            const images = p.gallery
                ? p.gallery.split('\n').map(url => url.trim()).filter(Boolean)
                : [p.image];

            // Ensure main image is updated to the first one in the list
            const mainImage = images.length > 0 ? images[0] : p.image;

            return {
                ...p,
                tags,
                images,
                image: mainImage
            };
        });

        updateSection('projects', processedProjects);
        toast.success("Projects updated successfully!");
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-white">Manage Projects</h3>
                <button
                    type="button"
                    onClick={() => append({
                        id: Date.now(),
                        title: "New Project",
                        description: "Description",
                        image: "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                        gallery: "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                        tags: ["React", "CSS"],
                        github: "#",
                        demo: "#",
                        category: "Web"
                    })}
                    className="text-sm flex items-center space-x-1 text-primary hover:text-white transition-colors"
                >
                    <Plus size={16} />
                    <span>Add Project</span>
                </button>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="projects">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-6">
                            {fields.map((field, index) => (
                                <Draggable key={field.id} draggableId={field.id.toString()} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            className="bg-white/5 p-6 rounded-lg border border-white/5 flex gap-4 items-start group"
                                        >
                                            <div {...provided.dragHandleProps} className="pt-2 text-gray-500 cursor-move hover:text-white">
                                                <GripVertical size={20} />
                                            </div>

                                            <div className="flex-1 space-y-4">
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="text-xs text-gray-400">Title</label>
                                                        <input {...register(`projects.${index}.title`)} className="w-full bg-black/40 border border-white/10 rounded p-2 text-white" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-xs text-gray-400">Category</label>
                                                        <input {...register(`projects.${index}.category`)} className="w-full bg-black/40 border border-white/10 rounded p-2 text-white" placeholder="e.g. Web, Mobile" />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-xs text-gray-400">Project Images</label>
                                                    <textarea {...register(`projects.${index}.gallery`)} className="hidden" />

                                                    <div className="flex flex-wrap gap-3">
                                                        {(watch(`projects.${index}.gallery`) || "").split('\n').filter(Boolean).map((img, imgIdx) => (
                                                            <div key={imgIdx} className="relative group w-20 h-20 rounded-lg overflow-hidden border border-white/20 bg-black/50">
                                                                <img src={img} alt="" className="w-full h-full object-cover" />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        const current = watch(`projects.${index}.gallery`).split('\n').filter(Boolean);
                                                                        const updated = current.filter((_, i) => i !== imgIdx).join('\n');
                                                                        setValue(`projects.${index}.gallery`, updated, { shouldDirty: true });
                                                                    }}
                                                                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-red-500 transition-opacity"
                                                                >
                                                                    <Trash2 size={16} />
                                                                </button>
                                                                {imgIdx === 0 && <div className="absolute top-0 left-0 bg-primary/90 text-[9px] text-white px-1.5 py-0.5 font-bold rounded-br">COVER</div>}
                                                            </div>
                                                        ))}

                                                        <label className="w-20 h-20 rounded-lg border border-dashed border-white/20 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 hover:border-primary/50 transition-all text-gray-500 hover:text-primary group">
                                                            <Plus size={20} className="group-hover:scale-110 transition-transform" />
                                                            <span className="text-[9px] mt-1 font-medium">Add</span>
                                                            <input
                                                                type="file"
                                                                multiple
                                                                accept="image/*"
                                                                className="hidden"
                                                                onChange={(e) => handleImageUpload(e, index)}
                                                            />
                                                        </label>
                                                    </div>
                                                    <p className="text-[10px] text-gray-500">First image is the cover. Dragging not supported for reorder yet (delete and re-add to reorder).</p>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-xs text-gray-400">Description</label>
                                                    <textarea {...register(`projects.${index}.description`)} rows="2" className="w-full bg-black/40 border border-white/10 rounded p-2 text-white resize-none" />
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-xs text-gray-400">Tags (comma separated)</label>
                                                    <input
                                                        {...register(`projects.${index}.tags`)}
                                                        className="w-full bg-black/40 border border-white/10 rounded p-2 text-white"
                                                        placeholder="React, CSS, Node.js"
                                                    />
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <input {...register(`projects.${index}.github`)} placeholder="GitHub URL" className="w-full bg-black/40 border border-white/10 rounded p-2 text-white text-sm" />
                                                    <input {...register(`projects.${index}.demo`)} placeholder="Demo URL" className="w-full bg-black/40 border border-white/10 rounded p-2 text-white text-sm" />
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => remove(index)}
                                                className="text-red-500 hover:text-red-400 p-2"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            <div className="pt-6">
                <button type="submit" className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all transform hover:-translate-y-1 flex items-center space-x-2">
                    <Save size={18} />
                    <span>Save Changes</span>
                </button>
            </div>
        </form>
    );
};

export default ProjectsEditor;
