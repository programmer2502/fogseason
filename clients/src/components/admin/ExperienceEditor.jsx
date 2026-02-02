import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useData } from '../../context/DataContext';
import { Save, Plus, Trash2, GripVertical } from 'lucide-react';
import { toast } from 'react-toastify';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const ExperienceEditor = () => {
    const { data, updateSection } = useData();
    const { register, control, handleSubmit, move } = useForm({
        defaultValues: { experience: data.experience }
    });

    const { fields, append, remove, move: moveField } = useFieldArray({
        control,
        name: "experience"
    });

    const onDragEnd = (result) => {
        if (!result.destination) return;
        moveField(result.source.index, result.destination.index);
    };

    const onSubmit = (formData) => {
        updateSection('experience', formData.experience);
        toast.success("Experience timeline updated!");
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-white">Manage Experience</h3>
                <button
                    type="button"
                    onClick={() => append({
                        id: Date.now(),
                        role: "New Role",
                        company: "Company Name",
                        period: "20XX - Present",
                        description: "Key responsibilities and achievements..."
                    })}
                    className="text-sm flex items-center space-x-1 text-primary hover:text-white transition-colors"
                >
                    <Plus size={16} />
                    <span>Add Job</span>
                </button>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="experience">
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
                                                        <label className="text-xs text-gray-400">Role</label>
                                                        <input {...register(`experience.${index}.role`)} className="w-full bg-black/40 border border-white/10 rounded p-2 text-white" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-xs text-gray-400">Company</label>
                                                        <input {...register(`experience.${index}.company`)} className="w-full bg-black/40 border border-white/10 rounded p-2 text-white" />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-xs text-gray-400">Period</label>
                                                    <input {...register(`experience.${index}.period`)} className="w-full bg-black/40 border border-white/10 rounded p-2 text-white" placeholder="2020 - Present" />
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-xs text-gray-400">Description</label>
                                                    <textarea {...register(`experience.${index}.description`)} rows="3" className="w-full bg-black/40 border border-white/10 rounded p-2 text-white resize-none" />
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

export default ExperienceEditor;
