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
    // SWR Cache: Initialize from localStorage to render instantly, fallback to initialData
    const [data, setData] = useState(() => {
        try {
            const cached = localStorage.getItem('public_data');
            return cached ? JSON.parse(cached) : initialData;
        } catch (e) {
            console.error('Failed to read from localStorage', e);
            return initialData;
        }
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const refreshData = async () => {
        try {
            const fetchedData = await fetchPublicData();
            if (fetchedData) {
                setData(prev => {
                    const next = {
                        ...prev,
                        ...fetchedData
                    };
                    try {
                        localStorage.setItem('public_data', JSON.stringify(next));
                    } catch (e) {
                        console.error('Failed to write to localStorage', e);
                    }
                    return next;
                });
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
            // Optimistic update + Cache update
            setData(prev => {
                const next = {
                    ...prev,
                    [section]: content
                };
                try {
                    localStorage.setItem('public_data', JSON.stringify(next));
                } catch (e) {}
                return next;
            });
            await updateSectionData(section, content);
        } catch (err) {
            console.error("Update failed", err);
            refreshData(); // Revert on error
        }
    };

    const updateNestedItem = async (section, id, newItem) => {
        try {
            // Optimistic update + Cache update
            setData(prev => {
                const next = {
                    ...prev,
                    [section]: prev[section].map(i => (i.id === id || i._id === id) ? newItem : i)
                };
                try {
                    localStorage.setItem('public_data', JSON.stringify(next));
                } catch (e) {}
                return next;
            });

            // Map section names to collection names if needed
            // 'projects', 'services', 'experience' map directly
            await updateCollectionItemData(section, id, newItem);
        } catch (err) {
            console.error("Update item failed", err);
            refreshData();
        }
    };

    const addNestedItem = async (section, item) => {
        const tempId = `temp-${Date.now()}`;
        const tempItem = { ...item, _id: tempId, id: tempId };

        try {
            // Optimistic update: Add the temporary item instantly
            setData(prev => {
                const next = {
                    ...prev,
                    [section]: [...prev[section], tempItem]
                };
                try {
                    localStorage.setItem('public_data', JSON.stringify(next));
                } catch (e) {}
                return next;
            });

            // Send request to server
            const newItem = await addCollectionItem(section, item);

            // Replace temporary item with real item from backend response
            setData(prev => {
                const next = {
                    ...prev,
                    [section]: prev[section].map(i => (i._id === tempId || i.id === tempId) ? newItem : i)
                };
                try {
                    localStorage.setItem('public_data', JSON.stringify(next));
                } catch (e) {}
                return next;
            });
        } catch (err) {
            console.error("Add item failed", err);
            // Revert optimistic add
            setData(prev => {
                const next = {
                    ...prev,
                    [section]: prev[section].filter(i => (i._id !== tempId && i.id !== tempId))
                };
                try {
                    localStorage.setItem('public_data', JSON.stringify(next));
                } catch (e) {}
                return next;
            });
        }
    };

    const deleteNestedItem = async (section, id) => {
        try {
            setData(prev => {
                const next = {
                    ...prev,
                    [section]: prev[section].filter(i => (i.id !== id && i._id !== id))
                };
                try {
                    localStorage.setItem('public_data', JSON.stringify(next));
                } catch (e) {}
                return next;
            });
            await deleteCollectionItemData(section, id);
        } catch (err) {
            console.error("Delete item failed", err);
            refreshData();
        }
    };

    const resetData = () => {
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
