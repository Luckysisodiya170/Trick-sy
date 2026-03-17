// src/data/technicalData.js
import handy from "../assets/serviceimage/image.png"; // Handyman
import Electric from "../assets/serviceimage/electric.png"; // Electrical
import plumbing from "../assets/serviceimage/plumbing.png"; // Plumbing
import curtain from "../assets/Technical/curtain.png"
import wall from "../assets/Technical/walll.png"
import marble from "../assets/Technical/polish.png"


export const technicalServices = [
  {
    id: 'handyman-services',
    title: 'Handyman Services',
    desc: 'Furniture assembly, TV mounting, drilling, and general home repairs.',
    image: handy,
    tags: ['Furniture', 'Mounting', 'Fixing']
  },
  {
    id: 'electrical-services',
    title: 'Electrical Services',
    desc: 'Safe and reliable electrical wiring, switchboard repairs, and installations.',
    image: Electric,
    tags: ['Wiring', 'Repairs', '24/7']
  },
  {
    id: 'plumbing',
    title: 'Plumbing Solutions',
    desc: 'Quick fixes for leaks, pipe bursts, blockages, and new fittings.',
    image: plumbing,
    tags: ['Leaks', 'Drainage', 'Fittings']
  },
  {
    id: 'marble-polishing',
    title: 'Marble Polishing',
    desc: 'Restore the shine of your floors with our premium diamond polishing.',
    image: marble, // Replace with local if available
    tags: ['Floor Care', 'Diamond Polish']
  },
  {
    id: 'wallpaper-fixing',
    title: 'Wallpaper Fixing',
    desc: 'Professional wallpaper installation with seamless finishing.',
    image: wall,
    tags: ['Interior', 'Seamless']
  },
  {
    id: 'curtain-installation',
    title: 'Curtain Installation',
    desc: 'Perfectly aligned curtain rod fixing and motorized track installation.',
    image: curtain,
    tags: ['Rods', 'Blinds', 'Motorized']
  }
];