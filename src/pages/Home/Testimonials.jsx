import React from 'react';
import { Star, Sparkles, Quote, ChevronRight, CheckCircle } from 'lucide-react';

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: 'Ahmed Khan',
      role: 'Villa Owner',
      comment: 'Amazing cleaning. My villa looks brand new. Professional team!',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: 2,
      name: 'Sarah W.',
      role: 'Office Manager',
      comment: 'TRICKSY transformed our workspace. Eco-friendly & fast.',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: 3,
      name: 'Rahul Sharma',
      role: 'Property Head',
      comment: 'Unmatched quality. TRICKSY is on another level of service.',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: 4,
      name: 'Priya Das',
      role: 'Home Owner',
      comment: 'Finally a service that values time and quality equally!',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
  ];

  return (
    <section className="py-12 bg-white flex items-center min-h-[500px]">
      <div className="max-w-7xl mx-auto px-6 w-full">
        
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Side: Heavy Typography (Fills visual space) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-600 border border-primary-100">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-[10px] font-black uppercase tracking-tighter">Verified Reviews</span>
            </div>
            
            <h2 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[0.85] tracking-tighter">
              People <br/> <span className="text-primary-500 italic">Love</span> <br/> Tricksy.
            </h2>

            <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/40?u=${i}`} className="w-8 h-8 rounded-full border-2 border-white shadow-sm" alt="" />
                ))}
              </div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">5.0 Rating • 2k+ Clients</p>
            </div>
          </div>

          {/* Right Side: Compact Bento Grid (Zero-waste space) */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            {reviews.map((item, idx) => (
              <div 
                key={item.id} 
                className={`p-5 rounded-[2rem] border transition-all duration-300 group
                  ${idx === 0 ? 'bg-slate-900 text-white border-slate-800' : 'bg-slate-50 border-slate-100 hover:bg-white hover:shadow-xl'}`}
              >
                <div className="flex justify-between items-start mb-3">
                   <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 fill-current ${idx === 0 ? 'text-primary-400' : 'text-primary-500'}`} />
                    ))}
                  </div>
                  <Quote className={`w-6 h-6 opacity-20 group-hover:opacity-100 transition-opacity ${idx === 0 ? 'text-white' : 'text-primary-500'}`} />
                </div>

                <p className={`text-sm font-bold leading-tight mb-4 tracking-tight ${idx === 0 ? 'text-slate-200' : 'text-slate-700'}`}>
                  "{item.comment}"
                </p>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img src={item.image} className="w-8 h-8 rounded-xl object-cover ring-2 ring-primary-500/10" alt="" />
                    <CheckCircle className="absolute -bottom-1 -right-1 w-3 h-3 text-blue-500 bg-white rounded-full p-0.5" />
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="text-xs font-black truncate">{item.name}</h4>
                    <p className={`text-[9px] uppercase font-bold tracking-widest truncate ${idx === 0 ? 'text-primary-400' : 'text-slate-400'}`}>
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Bar: Actionable but tiny */}
        <div className="mt-10 flex justify-between items-center py-4 border-t border-slate-50">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Built for the best properties</p>
          <button className="flex items-center gap-2 text-xs font-black uppercase text-primary-600 hover:gap-3 transition-all">
            See All Stories <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;