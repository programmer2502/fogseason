import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialData } from '../data/initialData';
import {
    fetchPublicData,
    updateSectionData,
    addCollectionItem,
    updateCollectionItemData,
    deleteCollectionItemData
} from '../utils/api';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const refreshData = async () => {
        try {
            const fetchedData = await fetchPublicData();
            if (fetchedData) {
                setData(prev => ({
                    ...prev,
                    ...fetchedData
                }));
            }
        } catch (err) {
            console.error("Failed to fetch data", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshData();
    }, []);

    const updateSection = async (section, content) => {
        try {
            // Optimistic update
            setData(prev => ({
                ...prev,
                [section]: content
            }));
            await updateSectionData(section, content);
        } catch (err) {
            console.error("Update failed", err);
            refreshData(); // Revert on error
        }
    };

    const updateNestedItem = async (section, id, newItem) => {
        try {
            // Optimistic update
            setData(prev => ({
                ...prev,
                [section]: prev[section].map(i => (i.id === id || i._id === id) ? newItem : i)
            }));

            // Map section names to collection names if needed
            // 'projects', 'services', 'experience' map directly
            await updateCollectionItemData(section, id, newItem);
        } catch (err) {
            console.error("Update item failed", err);
            refreshData();
        }
    };

    const addNestedItem = async (section, item) => {
        try {
            const newItem = await addCollectionItem(section, item);
            setData(prev => ({
                ...prev,
                [section]: [...prev[section], newItem]
            }));
        } catch (err) {
            console.error("Add item failed", err);
        }
    };

    const deleteNestedItem = async (section, id) => {
        try {
            setData(prev => ({
                ...prev,
                [section]: prev[section].filter(i => (i.id !== id && i._id !== id))
            }));
            await deleteCollectionItemData(section, id);
        } catch (err) {
            console.error("Delete item failed", err);
            refreshData();
        }
    };

    const resetData = () => {
        // Not really applicable with a backend, maybe re-fetch?
        refreshData();
    };

    return (
        <DataContext.Provider value={{
            data,
            loading,
            error,
            updateSection,
            updateNestedItem,
            addNestedItem,
            deleteNestedItem,
            resetData
        }}>
            {children}
        </DataContext.Provider>
    );
};
