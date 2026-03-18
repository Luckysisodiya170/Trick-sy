import handy from "../assets/serviceimage/image.png"; 
import Electric from "../assets/serviceimage/electric.png"; 
import plumbing from "../assets/serviceimage/plumbing.png"; 
import curtain from "../assets/Technical/curtain.png"
import wall from "../assets/Technical/walll.png"
import marble from "../assets/Technical/polish.png"

export const technicalServices = [
  {
    id: 'handyman-services',
    title: 'Handyman Services',
    desc: 'Furniture assembly, TV mounting, drilling, and general home repairs.',
    image: handy,
    tags: ['Furniture', 'Mounting', 'Fixing'],
    features: ['Furniture Assembly', 'TV & Art Mounting', 'Hanging & Drilling', 'Hinge & Lock Repair', 'General Maintenance']
  },
  {
    id: 'electrical-services',
    title: 'Electrical Services',
    desc: 'Safe and reliable electrical wiring, switchboard repairs, and installations.',
    image: Electric,
    tags: ['Wiring', 'Repairs', '24/7'],
    features: ['Full Home Rewiring', 'DB Dressing', 'Chandelier Installation', 'Short Circuit Fix', 'Switchboard Repair']
  },
  {
    id: 'plumbing',
    title: 'Plumbing Solutions',
    desc: 'Quick fixes for leaks, pipe bursts, blockages, and new fittings.',
    image: plumbing,
    tags: ['Leaks', 'Drainage', 'Fittings'],
    features: ['Leakage Detection', 'Pipe Burst Repair', 'Drainage Cleaning', 'Sanitary Ware Fixing', 'Water Heater Repair']
  },
  {
    id: 'marble-polishing',
    title: 'Marble Polishing',
    desc: 'Restore the shine of your floors with our premium diamond polishing.',
    image: marble,
    tags: ['Floor Care', 'Diamond Polish'],
    features: ['Diamond Polishing', 'Stain Removal', 'Crack Filling', 'Grout Cleaning', 'Floor Buffing']
  },
  {
    id: 'wallpaper-fixing',
    title: 'Wallpaper Fixing',
    desc: 'Professional wallpaper installation with seamless finishing.',
    image: wall,
    tags: ['Interior', 'Seamless'],
    features: ['Wallpaper Installation', 'Old Paper Removal', 'Wall Leveling', 'Custom Mural Fixing', 'Edge Trimming']
  },
  {
    id: 'curtain-installation',
    title: 'Curtain Installation',
    desc: 'Perfectly aligned curtain rod fixing and motorized track installation.',
    image: curtain,
    tags: ['Rods', 'Blinds', 'Motorized'],
    features: ['Rod & Rail Fixing', 'Motorized Track Setup', 'Blinds Installation', 'Roman Shades Setup', 'Steam Ironing']
  }
];