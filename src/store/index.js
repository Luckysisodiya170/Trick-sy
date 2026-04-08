import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../api/api';

// --- (API Calls) ---
export const fetchSections = createAsyncThunk('sections/fetch', async (sectionId, { rejectWithValue }) => {
    try {
        const response = await apiRequest(`/test/GetSubsectionById/${sectionId}`);
        const data = await response.json();
        if (!response.ok) return rejectWithValue(data.message);
        return data.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});


export const updateSingleSubsectionContent = createAsyncThunk(
    'content/updateOne',
    async ({ subsectionId, updateData }, { rejectWithValue }) => {
        try {
        
            const response = await apiRequest(`/test/UpdateSubsectionContent/${subsectionId}`, {
                method: 'PATCH',
                body: JSON.stringify(updateData),
            });
            const data = await response.json();
            if (!data.success) return rejectWithValue(data.message);
            return data.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const fetchFullPageContent = createAsyncThunk('content/fetchAll', async (sectionId, { rejectWithValue }) => {
    try {
        const response = await apiRequest(`/test/Getallcontent/${sectionId}`);
        const data = await response.json();
        if (!response.ok) return rejectWithValue("Failed to fetch page content");
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchSingleSubsectionContent = createAsyncThunk('content/fetchOne', async (subsectionId, { rejectWithValue }) => {
    try {
        const response = await apiRequest(`/test/GetSubsectionContent/${subsectionId}`);
        const data = await response.json();
        if (!response.ok) return rejectWithValue("Failed to fetch subsection content");
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});


export const updateSubsection = createAsyncThunk('sections/update', async ({ dbId, updatedFields }, { rejectWithValue }) => {
    try {
        const response = await apiRequest(`/test/updateSubsection/${dbId}`, {
            method: 'PATCH',
            body: JSON.stringify(updatedFields),
        });
        const data = await response.json();
        if (!data.success) return rejectWithValue(data.message);
        return { dbId, updatedFields };
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const createSubsection = createAsyncThunk('sections/create', async (newModuleData, { rejectWithValue }) => {
    try {
        const response = await apiRequest('/test/CreateSubsection', {
            method: 'POST',
            body: JSON.stringify(newModuleData),
        });
        const data = await response.json();
        if (!data.success) return rejectWithValue(data.message);
        return data.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const deleteSubsection = createAsyncThunk('sections/delete', async (dbId, { rejectWithValue }) => {
    try {
        const response = await apiRequest(`/test/DeleteSubsection/${dbId}`, { method: 'DELETE' });
        const data = await response.json();
        if (!data.success) return rejectWithValue(data.message);
        return dbId;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// --- SLICES ---

// Subsection Slice (Metadata like name, slug)
const sectionSlice = createSlice({
    name: 'sections',
    initialState: { items: [], status: 'idle', error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSections.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchSections.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = 'succeeded';
            })
            .addCase(updateSubsection.fulfilled, (state, action) => {
                const { dbId, updatedFields } = action.payload;
                const index = state.items.findIndex((item) => item.id === dbId);
                if (index !== -1) state.items[index] = { ...state.items[index], ...updatedFields };
            })
            .addCase(createSubsection.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(deleteSubsection.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item.id !== action.payload);
            });
    },
});

// Content Slice (Actual Text/Images)
const contentSlice = createSlice({
    name: 'content',
    initialState: { activePage: [], activeSubsection: null, status: 'idle', error: null },
    reducers: {
        clearActiveSubsection: (state) => { state.activeSubsection = null; }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateSingleSubsectionContent.fulfilled, (state, action) => {
                state.activeSubsection = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchFullPageContent.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchFullPageContent.fulfilled, (state, action) => {
                state.activePage = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchSingleSubsectionContent.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchSingleSubsectionContent.fulfilled, (state, action) => {
                state.activeSubsection = action.payload;
                state.status = 'succeeded';
            })
            // Global Error Handling
            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state, action) => {
                    state.error = action.payload;
                    state.status = 'failed';
                    console.error("Redux Error:", action.payload);
                }
            );
            
    }
});

// --- STORE EXPORT ---

export const { clearActiveSubsection } = contentSlice.actions;

export const store = configureStore({
    reducer: {
        sections: sectionSlice.reducer,
        content: contentSlice.reducer
    }
});