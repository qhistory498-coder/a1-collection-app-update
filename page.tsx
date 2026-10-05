'use client';
import React, { useState } from 'react';

export default function Page() {
  const [currentOutfit, setCurrentOutfit] = useState({
    name: 'Navy Blue & Grey',
    model: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=500&q=80',
    hanger: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=500&q=80'
  });

  const [pincode, setPincode] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState<string | null>(null);

  const checkDelivery = () => {
    if (pincode.length === 6) {
      setDeliveryStatus('✅ Delivery available by Tomorrow, COD Available');
    } else {
      setDeliveryStatus('❌ Please enter a valid 6-digit pincode');
    }
  };

  const outfits = [
    {
      name: 'Navy Blue & Grey',
      model: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=500&q=80',
      hanger: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=500&q=80',
      thumb: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Royal Maroon',
      model: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=500&q=80',
      hanger: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=500&q=80',
      thumb: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Jet Black',
      model: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=500&q=80',
      hanger: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=500&q=80',
      thumb: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=150&q=80'
    }
  ];

  return (
    <div className="bg-gray-50 text-gray-800 font-sans pb-24 min-h-screen">
      
      {/* Custom Styles for Glow and 360 Spin Effect */}
      <style jsx global>{`
        @keyframes glowPulse {
          0% { box-shadow: 0 0 8px rgba(234, 179, 8, 0.7), 0 0 20px rgba(234, 179, 8, 0.5); }
          50% { box-shadow: 0 0 20px rgba(250, 204, 21, 1), 0 0 40px rgba(234, 179, 8, 0.9); }
          100% { box-shadow: 0 0 8px rgba(234, 179, 8, 0.7), 0 0 20px rgba(234, 179, 8, 0.5); }
        }
        .glowing-yellow {
          background: linear-gradient(135deg, #fde047 0%, #eab308 50%, #ca8a04 100%);
          animation: glowPulse 2s infinite ease-in-out;
        }
        .spin-badge {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex items-center justify-between px-3 py-2.5 bg-white border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <span className="glowing-yellow text-gray-950 font-black italic px-2.5 py-0.5 text-xs rounded-md shadow-md border border-yellow-200">A1</span>
            <span className="font-extrabold text-gray-900 text-sm tracking-wide">A1 Collection</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-bold bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full border border-yellow-300">🌍 International Store</span>
          </div>
        </div>

        {/* Live Stock Urgency Bar */}
        <div className="bg-red-50 border-b border-red-200 px-3 py-1 text-center text-[11px] font-bold text-red-700 flex items-center justify-center gap-1.5">
          <span>🔥</span> <span>Hurry! Only 3 items left in stock. High demand right now!</span>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white px-3 py-2 border-b border-gray-200 flex items-center justify-between text-xs font-medium text-gray-700">
          <div className="flex-1 bg-gray-100 px-3 py-1.5 rounded-full flex items-center space-x-2 mr-3 border border-yellow-300 shadow-inner">
            <span className="text-yellow-600">✨</span>
            <input type="text" readOnly value="men character 360 outfit view" className="bg-transparent w-full focus:outline-none text-gray-800 font-medium" />
          </div>
          <div className="flex space-x-3 text-gray-700 font-bold">
            <span className="text-amber-600">Sort</span>
            <span className="text-amber-600">Filter</span>
          </div>
        </div>
      </header>

      {/* Main Showcase */}
      <main className="max-w-md mx-auto bg-white shadow-sm">
        
        {/* Large Character & Hanger Preview Section */}
        <div className="relative bg-gradient-to-b from-yellow-50/60 to-white p-4 border-b border-gray-200">
          <div className="absolute top-6 left-6 z-20 bg-black/80 text-yellow-400 text-[10px] font-black px-2.5 py-1 rounded-full border border-yellow-500 shadow-lg flex items-center gap-1">
            <span className="spin-badge inline-block">🔄</span> 360° VIEW
          </div>

          <div className="grid grid-cols-2 gap-3 h-80">
            <div className="bg-white rounded-xl border-2 border-yellow-400 overflow-hidden shadow-lg flex items-center justify-center relative">
              <img src={currentOutfit.model} alt="Model Outfit" className="h-full w-full object-cover transition-all duration-500 hover:scale-105" />
              <span className="absolute bottom-2 left-2 glowing-yellow text-gray-950 text-[10px] px-2.5 py-0.5 rounded-full font-bold shadow">Model (360° Ready)</span>
            </div>
            
            <div className="bg-white rounded-xl border-2 border-yellow-400 overflow-hidden shadow-lg flex items-center justify-center relative">
              <img src={currentOutfit.hanger} alt="Hanger Outfit" className="h-full w-full object-cover transition-all duration-500 hover:scale-105" />
              <span className="absolute bottom-2 left-2 glowing-yellow text-gray-950 text-[10px] px-2.5 py-0.5 rounded-full font-bold shadow">On Hanger</span>
            </div>
          </div>

          {/* Color Thumbnails Carousel */}
          <div className="mt-4">
            <p className="text-xs font-bold text-gray-700 mb-2">Selected Color: <span className="text-amber-700 font-extrabold underline">{currentOutfit.name}</span></p>
            <div className="flex space-x-2.5 overflow-x-auto pb-1">
              {outfits.map((item, index) => (
                <div 
                  key={index} 
                  onClick={() => setCurrentOutfit(item)}
                  className={`w-14 h-16 rounded-xl flex-shrink-0 overflow-hidden cursor-pointer shadow-md transition-all duration-200 ${currentOutfit.name === item.name ? 'border-2 border-yellow-500 scale-105 ring-4 ring-yellow-300' : 'border border-gray-300 opacity-80'}`}
                >
                  <img src={item.thumb} alt={item.name} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing, Ratings & Details */}
        <div className="p-4 border-b border-gray-200">
          <span className="text-[11px] text-amber-700 uppercase tracking-widest font-extrabold bg-yellow-100 px-2 py-0.5 rounded border border-yellow-300">A1 International Collection</span>
          <h1 className="text-base font-bold text-gray-900 mt-1.5">Men Premium Cotton Blend 360° Outfit Set</h1>
          
          {/* Customer Rating Badge */}
          <div className="flex items-center space-x-2 mt-2">
            <span className="bg-green-700 text-white text-xs font-black px-2 py-0.5 rounded flex items-center gap-1">
              4.8 ★
            </span>
            <span className="text-xs text-gray-500 font-medium">(2,450 Verified Ratings & 412 Reviews)</span>
          </div>

          <div className="flex items-center space-x-2.5 mt-2.5">
            <span className="text-2xl font-black text-gray-900">₹498</span>
            <span className="text-xs text-gray-400 line-through">₹999</span>
            <span className="text-xs text-green-700 font-bold bg-green-50 px-2 py-0.5 rounded border border-green-200">50% OFF</span>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-2 mt-3.5 py-2.5 border-y border-gray-100 text-center">
            <div className="bg-gray-50 p-1.5 rounded-lg border border-gray-200">
              <p className="text-[10px] font-bold text-gray-800">🔄 7 Days</p>
              <p className="text-[9px] text-gray-500">Easy Return</p>
            </div>
            <div className="bg-gray-50 p-1.5 rounded-lg border border-gray-200">
              <p className="text-[10px] font-bold text-gray-800">🛡️ 100% Original</p>
              <p className="text-[9px] text-gray-500">Verified Quality</p>
            </div>
            <div className="bg-gray-50 p-1.5 rounded-lg border border-gray-200">
              <p className="text-[10px] font-bold text-gray-800">💵 Cash on</p>
              <p className="text-[9px] text-gray-500">Delivery Available</p>
            </div>
          </div>

          {/* Pincode Delivery Checker Section */}
          <div className="mt-3.5 bg-gray-50 p-3 rounded-xl border border-gray-200">
            <p className="text-xs font-bold text-gray-800 mb-1.5">Delivery & Services</p>
            <div className="flex space-x-2">
              <input 
                type="text" 
                placeholder="Enter Pincode (e.g. 110001)" 
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-yellow-500"
              />
              <button 
                onClick={checkDelivery}
                className="bg-gray-900 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-800"
              >
                Check
              </button>
            </div>
            {deliveryStatus && (
              <p className="text-[11px] font-semibold mt-2 text-green-700">{deliveryStatus}</p>
            )}
          </div>
          
          {/* Wow Deal Offer Banner */}
          <div className="mt-3.5 glowing-yellow rounded-xl p-3 text-xs shadow-md border border-yellow-300 text-gray-950 font-medium">
            <div className="flex items-center justify-between font-black mb-1">
              <span>⚡ INTERNATIONAL WOW DEAL</span>
              <span className="text-[11px] underline cursor-pointer bg-white/70 px-2 py-0.5 rounded text-gray-900">Apply offers</span>
            </div>
            <p className="text-gray-900 text-[11px] font-semibold">Extra ₹25 off with A1 Member Rewards & SBI Credit Card</p>
          </div>

          {/* Size Selector */}
          <div className="mt-4">
            <div className="flex justify-between items-center text-xs font-semibold mb-2">
              <span className="text-gray-700">Select Size</span>
              <span className="text-amber-700 font-bold underline">Size Chart</span>
            </div>
            <div className="flex space-x-2.5">
              {['S', 'M', 'L', 'XL', 'XXL'].map((size, idx) => (
                <button key={idx} className={`w-10 h-10 rounded-full text-xs font-bold flex items-center justify-center transition-all ${size === 'L' ? 'glowing-yellow text-gray-950 shadow-md border border-yellow-300 scale-105' : 'border border-gray-300 text-gray-700 hover:border-yellow-500'}`}>
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="p-4 bg-gray-50/50 border-b border-gray-200">
          <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">Top Customer Reviews</h2>
          <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm text-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-gray-900">Rahul Sharma</span>
              <span className="bg-green-600 text-white text-[10px] px-1.5 py-0.2 rounded font-bold">5 ★</span>
            </div>
            <p className="text-gray-600 text-[11px]">"Fabric quality is amazing and the 360 view helped a lot in choosing the exact color. Super fast delivery!"</p>
          </div>
        </div>

      </main>

      {/* Bottom Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex h-14 z-50 max-w-md mx-auto shadow-2xl">
        <button className="w-1/2 bg-gray-900 text-white text-xs font-bold flex items-center justify-center space-x-1.5 border-r border-gray-800 hover:bg-gray-800">
          <span>🛒 ADD TO CART</span>
        </button>
        <button className="w-1/2 glowing-yellow text-gray-950 text-xs font-black flex items-center justify-center space-x-1.5 tracking-wide shadow-inner">
          <span>⚡ BUY NOW</span>
        </button>
      </div>

    </div>
  );
}
