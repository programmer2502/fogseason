import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useData } from '../../context/DataContext';
import { Save, Plus, Trash2, GripVertical } from 'lucide-react';
import { toast } from 'react-toastify';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const ServicesEditor = () => {
    const { data, updateSection } = useData();
    const { register, control, handleSubmit } = useForm({
        defaultValues: { services: data.services }
    });

    const { fields, append, remove, move: moveField } = useFieldArray({
        control,
        name: "services"
    });

    const onDragEnd = (result) => {
        if (!result.destination) return;
        moveField(result.source.index, result.destination.index);
    };

    const onSubmit = (formData) => {
        updateSection('services', formData.services);
        toast.success("Services updated successfully!");
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-white">Manage Services</h3>
                <button
                    type="button"
                    onClick={() => append({ id: Date.now(), title: "New Service", description: "Description", icon: "Code" })}
                    className="text-sm flex items-center space-x-1 text-primary hover:text-white transition-colors"
                >
                    <Plus size={16} />
                    <span>Add Service</span>
                </button>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="services">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                            {fields.map((field, index) => (
                                <Draggable key={field.id} draggableId={field.id.toString()} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            className="bg-white/5 p-4 rounded-lg border border-white/5 flex gap-4 items-start group hover:bg-white/10 transition-colors"
                                        >
                                            <div {...provided.dragHandleProps} className="pt-2 text-gray-500 cursor-move hover:text-white">
                                                <GripVertical size={20} />
                                            </div>
                                            <div className="flex-1 grid md:grid-cols-2 gap-4">
                                                <div className="space-y-3">
                                                    <input {...register(`services.${index}.title`)} placeholder="Service Title" className="w-full bg-black/40 border border-white/10 rounded p-2 text-white" />
                                                    <select {...register(`services.${index}.icon`)} className="w-full bg-black/40 border border-white/10 rounded p-2 text-white">
                                                        <option value="Code">Code</option>
                                                        <option value="Palette">Palette</option>
                                                        <option value="Smartphone">Smartphone</option>
                                                        <option value="Globe">Globe</option>
                                                        <option value="Cloud">Cloud</option>
                                                        <option value="Layout">Layout</option>
                                                        <option value="Server">Server</option>
                                                        <option value="Database">Database</option>
                                                    </select>
                                                </div>
                                                <div className="space-y-3">
                                                    <textarea {...register(`services.${index}.description`)} rows="3" placeholder="Description" className="w-full bg-black/40 border border-white/10 rounded p-2 text-white resize-none" />
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

export default ServicesEditor;
