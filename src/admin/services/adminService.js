// Tricksy/frontend/src/admin/services/adminService.js
import { apiRequest } from '../api/api'; 

export const AdminService = {
  // 1. SIDEBAR
  getSidebarData: () => apiRequest('/sections/main-sections?adminView=true'),

  // 2. SUBSECTIONS LIST
  getSubsectionsBySection: (sectionId) => 
    apiRequest(`/subsections/by-section/${sectionId}?adminView=true`),

  // 3. CREATE MODULE
  createSubsection: (data) => 
    apiRequest('/subsections/create', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

  // 4. UPDATE CONFIG 
  updateSubsectionDetails: (id, data) => 
    apiRequest(`/subsections/update/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),

  // 5. DELETE
  deleteSubsection: (id) => 
    apiRequest(`/subsections/delete/${id}`, { method: 'DELETE' }),

  // 6. REORDER (Drag & Drop)
  reorderSubsections: (orderedIds) => 
    apiRequest('/subsections/reorder', {
      method: 'PATCH',
      body: JSON.stringify({ orderedIds })
    }),

  // 7. EDITOR CONTENT 
  getSectionContent: (subsectionId) => 
    apiRequest(`/content/get/${subsectionId}`),

  // 8. UPDATE CONTENT 
  updateSectionContent: (subsectionId, data) => 
    apiRequest(`/content/update/${subsectionId}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),

  // 9. IMAGE UPLOAD 
  uploadHeroImage: (formData) => 
    apiRequest('/upload/image', {
      method: 'POST',
      body: formData, 
    })
};