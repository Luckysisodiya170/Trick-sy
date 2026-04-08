// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import PageManager from '../../components/PageManager';
// import { 
//   LayoutTemplate, Phone, MessageSquare, MapPin, Box, 
//   Mail, Smartphone, Send, Globe, Image as ImageIcon, ShieldCheck 
// } from 'lucide-react';

// const iconLibrary = {
//   hero: LayoutTemplate, info: Phone, form: MessageSquare,
//   map: MapPin, mail: Mail, mobile: Smartphone, send: Send,
//   whyus: ShieldCheck, box: Box, globe: Globe, image: ImageIcon
// };

// const themeOptions = {
//   slate: { color: 'text-slate-500', bg: 'bg-slate-100' },
//   rose: { color: 'text-rose-500', bg: 'bg-rose-50' },
//   amber: { color: 'text-amber-500', bg: 'bg-amber-50' },
//   emerald: { color: 'text-emerald-500', bg: 'bg-emerald-50' },
//   teal: { color: 'text-teal-500', bg: 'bg-teal-50' },
//   cyan: { color: 'text-cyan-500', bg: 'bg-cyan-50' },
//   sky: { color: 'text-sky-500', bg: 'bg-sky-50' },
//   blue: { color: 'text-blue-500', bg: 'bg-blue-50' },
//   indigo: { color: 'text-indigo-500', bg: 'bg-indigo-50' },
//   violet: { color: 'text-violet-500', bg: 'bg-violet-50' },
//   fuchsia: { color: 'text-fuchsia-500', bg: 'bg-fuchsia-50' },
// };

// const TestPageOverview = () => {
//   const { sectionId = '1' } = useParams(); 

//   const [sections, setSections] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//  useEffect(() => {
//     const fetchSections = async () => {
//       setIsLoading(true);
//       try {
//         const response = await fetch(`http://localhost:5000/api/test/GetSubsectionById/${sectionId}`);
//         const data = await response.json();

//         if (data.success) {
//             const formattedData = data.data.map(row => {
//               const activeTheme = row.theme || 'indigo'; 
              
//             return {
//   ...row,
//   iconKey: row.iconKey || 'box', 
//   color: themeOptions[activeTheme]?.color || 'text-indigo-500',
//   bg: themeOptions[activeTheme]?.bg || 'bg-indigo-50'
// };
//             });

//             console.log("Formatted data ready for UI:", formattedData);
//             setSections(formattedData);  
//         }
//       } catch (error) {
//         console.error("Failed to fetch sections:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchSections();
//   }, [sectionId]);

//   if (isLoading) {
//     return <div className="p-8 text-center text-gray-500">Loading modules...</div>; 
//   }

//   return (
//     <PageManager 
//       title={`TEST SECTIONS`} 
//       storageKey={`tricksy_test_modules_${sectionId}`} 
//       defaultSections={sections} 
//       iconLibrary={iconLibrary}
//       baseRoute="/admin/pages/test"
//       itemLabel="Block"
//     />
//   );
// };

// export default TestPageOverview;