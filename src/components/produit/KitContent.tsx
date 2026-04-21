"use client";

interface KitContentProps {
  product?: any;
}

export default function KitContent({ product }: KitContentProps) {
  const kitItems = [
    "Invitation (A5·PDF)",
    "Étiquettes cadeaux (x8/A4)",
    "Marque-places (x10/A4)",
    "Menu/Programme (A5·PDF)",
    "Banderole Happy Bday",
    "Sachet bonbons",
    "Toppers gâteau (x6)",
    "Affiche déco (A4·PDF)"
  ];

  return (
    <div className="w-full py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 
          className="text-center text-xl font-semibold mb-8"
          style={{ letterSpacing: '1px', color: '#3C2415' }}
        >
          Contenu du kit
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {kitItems.map((item, index) => (
            <div 
              key={index}
              className="p-4 text-center text-sm font-medium rounded-lg transition-all hover:shadow-md"
              style={{ 
                backgroundColor: '#FAF7F2', 
                border: '1px solid #D4A574', 
                borderRadius: '7px',
                color: '#3C2415'
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
