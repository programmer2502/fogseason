import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useData } from '../../context/DataContext';
import { Save, Plus, Trash2, Image as ImageIcon, GripVertical } from 'lucide-react';
import { toast } from 'react-toastify';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { compressImage } from '../../utils/imageUtils';

const GalleryEditor = () => {
    const { data, updateSection } = useData();

    const { register, control, handleSubmit, reset, watch } = useForm({
        defaultValues: { gallery: data.gallery || [] }
    });

    useEffect(() => {
        if (data.gallery) {
            reset({ gallery: data.gallery });
        }
    }, [data.gallery, reset]);

    const { fields, append, remove, move } = useFieldArray({
        control,
        name: 'gallery'
    });

    const onDragEnd = (result) => {
        if (!result.destination) return;
        move(result.source.index, result.destination.index);
    };

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        const toastId = toast.loading(`Compressing ${files.length} image(s)...`);
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                <div>
                    <h3 className="font-semibold text-white">Manage Gallery</h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                        Drag to reorder · Click caption to edit · Hover image to delete
                    </p>
                </div>
                <label className="flex items-center gap-2 px-4 py-2 border border-dashed border-primary/40 rounded-lg cursor-pointer hover:bg-primary/5 hover:border-primary transition-all text-primary text-sm font-medium whitespace-nowrap">
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
                    <p className="text-sm">
                        No images yet. Click{' '}
                        <span className="text-primary font-medium">Add Images</span>{' '}
                        to get started.
                    </p>
                </div>
            )}

            {/* Drag-and-drop list */}
            {fields.length > 0 && (
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="gallery">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="space-y-3"
                            >
                                {fields.map((field, index) => {
                                    const currentUrl = watch(`gallery.${index}.url`);
                                    return (
                                        <Draggable
                                            key={field.id}
                                            draggableId={field.id.toString()}
                                            index={index}
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    className={`flex items-center gap-3 bg-white/5 border rounded-xl p-3 transition-all ${snapshot.isDragging
                                                            ? 'border-primary/40 shadow-lg shadow-primary/10 bg-white/10'
                                                            : 'border-white/10 hover:border-white/20'
                                                        }`}
                                                >
                                                    {/* Drag handle */}
                                                    <div
                                                        {...provided.dragHandleProps}
                                                        className="text-gray-500 hover:text-white cursor-grab active:cursor-grabbing flex-shrink-0 p-1"
                                                        title="Drag to reorder"
                                                    >
                                                        <GripVertical size={20} />
                                                    </div>

                                                    {/* Thumbnail */}
                                                    <div className="relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border border-white/10 bg-black/40">
                                                        {currentUrl ? (
                                                            <img
                                                                src={currentUrl}
                                                                alt={`Gallery ${index + 1}`}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-gray-600">
                                                                <ImageIcon size={20} />
                                                            </div>
                                                        )}
                                                        {/* Position badge */}
                                                        <div className="absolute top-0 left-0 bg-black/70 text-[9px] text-white px-1.5 py-0.5 font-bold rounded-br">
                                                            #{index + 1}
                                                        </div>
                                                    </div>

                                                    {/* Caption input */}
                                                    <div className="flex-1 min-w-0">
                                                        <label className="text-[10px] text-gray-500 uppercase tracking-wide mb-1 block">
                                                            Caption
                                                        </label>
                                                        <input
                                                            {...register(`gallery.${index}.caption`)}
                                                            placeholder="Add a caption (optional)…"
                                                            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-primary/50 transition-colors"
                                                        />
                                                    </div>

                                                    {/* Delete button */}
                                                    <button
                                                        type="button"
                                                        onClick={() => remove(index)}
                                                        title="Delete image"
                                                        className="flex-shrink-0 p-2 rounded-lg text-red-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            )}
                                        </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            )}

            {/* Save button */}
            {fields.length > 0 && (
                <div className="pt-4 border-t border-white/5">
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
