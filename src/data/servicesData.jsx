// src/data/servicesData.jsx
import React from 'react';
import { 
  Sparkles, Droplets, Wind, Home, Paintbrush, Brush, 
  Hammer, ShieldCheck, Building2, Armchair, Wrench, Fan 
} from 'lucide-react';

export const servicesData = {
  // 1. DEEP CLEANING
  "deep-cleaning": {
    title: "Professional Deep Cleaning",
    subtitle: "Complete Sanitization",
    description: "Our deep cleaning service goes beyond the surface to eliminate dirt, grime, and hidden allergens. Perfect for move-ins, move-outs, or your annual spring cleaning.",
    includes: [
      { title: "Floor Scrubbing", desc: "Machine scrubbing for hard floors.", icon: <Sparkles className="w-6 h-6" /> },
      { title: "Kitchen Degreasing", desc: "Appliance & cabinet deep clean.", icon: <Droplets className="w-6 h-6" /> },
      { title: "Bathroom Sanitization", desc: "Grout cleaning & disinfection.", icon: <ShieldCheck className="w-6 h-6" /> },
      { title: "Dusting & Vacuuming", desc: "Complete allergen removal.", icon: <Home className="w-6 h-6" /> }
    ],
    process: [
      { step: "01", title: "Easy Booking", desc: "Select time slot online." },
      { step: "02", title: "Site Inspection", desc: "Our experts assess the property." },
      { step: "03", title: "Deep Cleaning", desc: "Rigorous cleaning process." },
      { step: "04", title: "Final Check", desc: "Walkthrough for satisfaction." }
    ],
    pricing: [
      { plan: "Apartment", price: "$149", features: ["Up to 2 Bedrooms", "Basic Deep Clean", "1 Professional"], isPopular: false },
      { plan: "Villa", price: "$299", features: ["Up to 4 Bedrooms", "Complete Sanitization", "Team of 3"], isPopular: true },
      { plan: "Office", price: "$399", features: ["Up to 2000 sq ft", "Desk & Floor Polish", "After-hours Service"], isPopular: false }
    ],
    faqs: [
      { q: "Do I need to provide supplies?", a: "No, we bring industrial-grade equipment and eco-friendly chemicals." },
      { q: "How long does a deep clean take?", a: "It typically takes 4-6 hours depending on the property size." }
    ]
  },

  // 2. AC DUCT CLEANING
  "ac-duct-cleaning": {
    title: "AC Duct Cleaning",
    subtitle: "Breathe Pure Air",
    description: "Improve your indoor air quality and AC efficiency with our robotic duct cleaning technology. Say goodbye to dust mites, mold, and bacteria.",
    includes: [
      { title: "Robotic Inspection", desc: "Camera inspection of all ducts.", icon: <Wind className="w-6 h-6" /> },
      { title: "Vent Sanitization", desc: "Deep cleaning of grills and vents.", icon: <Fan className="w-6 h-6" /> },
      { title: "Mold Removal", desc: "Anti-fungal chemical treatment.", icon: <ShieldCheck className="w-6 h-6" /> },
      { title: "Filter Cleaning", desc: "Washing or replacing AC filters.", icon: <Sparkles className="w-6 h-6" /> }
    ],
    process: [
      { step: "01", title: "Initial Test", desc: "Checking current airflow and cooling." },
      { step: "02", title: "Deep Vacuuming", desc: "Negative pressure extraction." },
      { step: "03", title: "Sanitization", desc: "Eco-friendly bacterial spray." },
      { step: "04", title: "Post Test", desc: "Showing before & after results." }
    ],
    pricing: [
      { plan: "Basic", price: "$99", features: ["Up to 5 Vents", "Filter Cleaning", "Standard Sanitization"], isPopular: false },
      { plan: "Premium", price: "$199", features: ["Up to 12 Vents", "Robotic Cleaning", "Anti-Mold Treatment"], isPopular: true },
      { plan: "Villa Setup", price: "$349", features: ["All Vents", "Full System Overhaul", "Before/After Report"], isPopular: false }
    ],
    faqs: [
      { q: "How often should I clean AC ducts?", a: "We recommend professional cleaning at least once every 12 to 18 months." },
      { q: "Does it create a mess inside the house?", a: "Not at all. Our negative pressure vacuums ensure all dust is captured safely." }
    ]
  },

  // 3. COMMERCIAL CLEANING
  "commercial-cleaning": {
    title: "Commercial Cleaning",
    subtitle: "Spotless Workspaces",
    description: "Keep your office or retail space pristine with our customized corporate cleaning solutions. A clean office boosts productivity and impresses clients.",
    includes: [
      { title: "Workstation Cleaning", desc: "Sanitizing desks and hardware.", icon: <Building2 className="w-6 h-6" /> },
      { title: "Pantry & Restrooms", desc: "Hygiene-focused deep cleaning.", icon: <Droplets className="w-6 h-6" /> },
      { title: "Carpet Extraction", desc: "Stain and odor removal.", icon: <Sparkles className="w-6 h-6" /> },
      { title: "Waste Management", desc: "Daily trash removal and recycling.", icon: <ShieldCheck className="w-6 h-6" /> }
    ],
    process: [
      { step: "01", title: "Site Visit", desc: "Understanding your business needs." },
      { step: "02", title: "Custom Plan", desc: "Creating a tailored schedule." },
      { step: "03", title: "Execution", desc: "After-hours or weekend cleaning." },
      { step: "04", title: "Audit", desc: "Monthly quality checks." }
    ],
    pricing: [
      { plan: "Small Office", price: "$199", features: ["Up to 1000 sq ft", "Weekly Service", "Basic Trash Removal"], isPopular: false },
      { plan: "Corporate", price: "$499", features: ["Up to 5000 sq ft", "Daily Service", "Pantry Restocking"], isPopular: true },
      { plan: "Enterprise", price: "Custom", features: ["Multiple Floors", "Dedicated Full-time Staff", "24/7 Support"], isPopular: false }
    ],
    faqs: [
      { q: "Do you offer after-hours cleaning?", a: "Yes, we work around your schedule to ensure zero disruption to your business." },
      { q: "Are your cleaners insured?", a: "Yes, our entire corporate team is fully vetted, trained, and insured." }
    ]
  },

  // 4. UPHOLSTERY CLEANING
  "upholstery-cleaning": {
    title: "Upholstery Cleaning",
    subtitle: "Revive Your Furniture",
    description: "Extend the life of your furniture with our advanced fabric and leather cleaning. We remove tough stains, odors, and deep-seated dust mites.",
    includes: [
      { title: "Fabric Shampooing", desc: "Deep foam extraction method.", icon: <Armchair className="w-6 h-6" /> },
      { title: "Stain Removal", desc: "Targeted spot treatment.", icon: <Droplets className="w-6 h-6" /> },
      { title: "Leather Polishing", desc: "Conditioning for luxury leather.", icon: <Sparkles className="w-6 h-6" /> },
      { title: "Deodorizing", desc: "Leaving a fresh, natural scent.", icon: <Wind className="w-6 h-6" /> }
    ],
    process: [
      { step: "01", title: "Fabric Test", desc: "Checking material safety." },
      { step: "02", title: "Vacuuming", desc: "Dry dust extraction." },
      { step: "03", title: "Shampooing", desc: "Applying safe cleaning agents." },
      { step: "04", title: "Drying", desc: "High-speed moisture extraction." }
    ],
    pricing: [
      { plan: "Single Item", price: "$49", features: ["1 Sofa or Mattress", "Basic Stain Removal", "Dry Vacuum"], isPopular: false },
      { plan: "Living Room", price: "$129", features: ["Up to 5 Seater Sofa", "Carpet Cleaning", "Deodorizing"], isPopular: true },
      { plan: "Full House", price: "$249", features: ["All Beds & Sofas", "Curtain Steaming", "Premium Leather Care"], isPopular: false }
    ],
    faqs: [
      { q: "How long does the sofa take to dry?", a: "With our extraction machines, it usually takes 2-4 hours to dry completely." },
      { q: "Can you remove pet odors?", a: "Yes, our enzyme-based cleaners break down and permanently remove pet odors." }
    ]
  },

  // 5. PAINTING SERVICES
  "painting-services": {
    title: "Premium Wall Painting",
    subtitle: "Transform Your Space",
    description: "Give your home or office a fresh, vibrant look with our professional painting services. Flawless finish with premium quality paints guaranteed.",
    includes: [
      { title: "Wall Sanding", desc: "Smooth base preparation.", icon: <Brush className="w-6 h-6" /> },
      { title: "Premium Coats", desc: "Double coat of luxury paint.", icon: <Paintbrush className="w-6 h-6" /> },
      { title: "Crack Filling", desc: "Fixing minor wall damages.", icon: <Hammer className="w-6 h-6" /> },
      { title: "Masking", desc: "Protecting floors and furniture.", icon: <ShieldCheck className="w-6 h-6" /> }
    ],
    process: [
      { step: "01", title: "Color Selection", desc: "Choose from our premium catalog." },
      { step: "02", title: "Preparation", desc: "Taping edges & covering furniture." },
      { step: "03", title: "Painting", desc: "Professional double-coat application." },
      { step: "04", title: "Cleanup", desc: "Removing tapes & leaving it spotless." }
    ],
    pricing: [
      { plan: "Studio/1BHK", price: "$199", features: ["Standard Colors", "Minor Crack Repair", "1 Day Completion"], isPopular: false },
      { plan: "Villa/3BHK", price: "$699", features: ["Custom Colors", "Premium Finish", "Ceiling Included"], isPopular: true },
      { plan: "Exterior", price: "Custom", features: ["Weatherproof Paint", "Scaffolding Setup", "10-Year Warranty"], isPopular: false }
    ],
    faqs: [
      { q: "Do you supply the paint?", a: "Yes, we bring top-tier paints like Jotun or Benjamin Moore, or we can use yours." },
      { q: "Do I need to move furniture?", a: "No, our team will move heavy furniture to the center and cover it safely." }
    ]
  },

  // 6. HANDYMAN SERVICES
  "handyman-services": {
    title: "Expert Handyman Services",
    subtitle: "Quick & Reliable Fixes",
    description: "From leaky faucets to assembling IKEA furniture, our skilled handymen are equipped to handle all your home maintenance and repair needs.",
    includes: [
      { title: "Plumbing Fixes", desc: "Leaks, blocks, and installations.", icon: <Droplets className="w-6 h-6" /> },
      { title: "Electrical Work", desc: "Lights, switches, and wiring.", icon: <Sparkles className="w-6 h-6" /> },
      { title: "Carpentry", desc: "Door hinges, cabinets, and wood repair.", icon: <Hammer className="w-6 h-6" /> },
      { title: "Assembly", desc: "Furniture and equipment setup.", icon: <Wrench className="w-6 h-6" /> }
    ],
    process: [
      { step: "01", title: "Request", desc: "Tell us what needs fixing." },
      { step: "02", title: "Dispatch", desc: "A pro arrives with a full toolkit." },
      { step: "03", title: "Repair", desc: "Fast and efficient fixing." },
      { step: "04", title: "Testing", desc: "Ensuring everything works perfectly." }
    ],
    pricing: [
      { plan: "Basic Fix", price: "$49", features: ["Up to 1 Hour", "Minor Plumbing/Electrical", "Drilling & Hanging"], isPopular: false },
      { plan: "Half Day", price: "$149", features: ["Up to 4 Hours", "Multiple Tasks", "Furniture Assembly"], isPopular: true },
      { plan: "Full Day", price: "$289", features: ["Up to 8 Hours", "Major Repairs", "Complete House Setup"], isPopular: false }
    ],
    faqs: [
      { q: "Do you charge for materials?", a: "Our rates cover labor. Any specific spare parts or materials required are billed separately at cost." },
      { q: "Are your handymen certified?", a: "Yes, we only dispatch trained and background-checked technicians for safety and quality." }
    ]
  }
};