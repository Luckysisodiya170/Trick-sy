// Tricksy/frontend/src/admin/redux/slices/adminSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AdminService } from '../../services/adminService';

export const fetchSidebarTree = createAsyncThunk('admin/fetchSidebarTree', async (_, { rejectWithValue }) => {
  try {
    const res = await AdminService.getSidebarData();
    return res.success ? res.data : rejectWithValue(res.message);
  } catch (err) { return rejectWithValue(err.message); }
});

export const fetchPageSections = createAsyncThunk('admin/fetchPageSections', async (sectionId, { rejectWithValue }) => {
  try {
    const res = await AdminService.getSubsectionsBySection(sectionId);
    return res.success ? res.data : rejectWithValue(res.message);
  } catch (err) { return rejectWithValue(err.message); }
});

export const createSubsection = createAsyncThunk('admin/createSubsection', async (data, { rejectWithValue }) => {
  try {
    const res = await AdminService.createSubsection(data);
    return res.success ? res.data : rejectWithValue(res.message);
  } catch (err) { return rejectWithValue(err.message); }
});

export const deleteSubsection = createAsyncThunk('admin/deleteSubsection', async (id, { rejectWithValue }) => {
  try {
    const res = await AdminService.deleteSubsection(id);
    return res.success ? id : rejectWithValue(res.message);
  } catch (err) { return rejectWithValue(err.message); }
});


// 1. Fetch Single Content 
export const fetchSingleSubsectionContent = createAsyncThunk('admin/fetchSingleContent', async (id, { rejectWithValue }) => {
  try {
    const res = await AdminService.getSectionContent(id);
    return res.success ? res.data : rejectWithValue(res.message);
  } catch (err) { return rejectWithValue(err.message); }
});

// 2. Update Content 
export const updateSingleSubsectionContent = createAsyncThunk('admin/updateContent', async ({ subsectionId, updateData }, { rejectWithValue }) => {
  try {
    const res = await AdminService.updateSectionContent(subsectionId, updateData);
    return res.success ? res.data : rejectWithValue(res.message);
  } catch (err) { return rejectWithValue(err.message); }
});

// 3. Update Subsection Config 
export const updateSubsectionConfig = createAsyncThunk('admin/updateConfig', async ({ dbId, updatedFields }, { rejectWithValue }) => {
  try {
    const res = await AdminService.updateSubsectionDetails(dbId, updatedFields);
    return res.success ? res.data : rejectWithValue(res.message);
  } catch (err) { return rejectWithValue(err.message); }
});

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    sidebarTree: [],
    pageSections: [],
    activeSubsection: null, 
    isLoading: false,
    isSectionsLoading: false,
    status: 'idle', 
    error: null,
  },
  reducers: { 
    clearAdminError: (state) => { state.error = null; },
    setActiveSubsection: (state, action) => { state.activeSubsection = action.payload; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSidebarTree.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sidebarTree = action.payload || [];
      })
      .addCase(fetchPageSections.pending, (state) => { state.isSectionsLoading = true; })
      .addCase(fetchPageSections.fulfilled, (state, action) => {
        state.isSectionsLoading = false;
        state.pageSections = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchPageSections.rejected, (state, action) => {
        state.isSectionsLoading = false;
        state.error = action.payload;
      })
      .addCase(createSubsection.fulfilled, (state, action) => {
        if (action.payload) state.pageSections.push(action.payload);
      })
      .addCase(deleteSubsection.fulfilled, (state, action) => {
        state.pageSections = state.pageSections.filter(sec => sec.id !== action.payload);
      })

      
      // Fetch Content (Editor)
      .addCase(fetchSingleSubsectionContent.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchSingleSubsectionContent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.activeSubsection = action.payload;
      })
      .addCase(fetchSingleSubsectionContent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Update Content
      .addCase(updateSingleSubsectionContent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.activeSubsection = action.payload;
      })

      // Update Config 
      .addCase(updateSubsectionConfig.fulfilled, (state, action) => {
        const index = state.pageSections.findIndex(s => s.id === action.payload.id);
        if (index !== -1) {
          state.pageSections[index] = action.payload;
        }
      });
  }
});

export const { clearAdminError, setActiveSubsection } = adminSlice.actions;
export default adminSlice.reducer;