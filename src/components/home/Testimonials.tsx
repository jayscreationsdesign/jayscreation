"use client"

export function Testimonials() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#2C2C2C] text-center mb-12">
          Témoignages Clients
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Marie L.", event: "Mariage", rating: 5 },
            { name: "Sophie M.", event: "Baptême", rating: 5 },
            { name: "Thomas R.", event: "Anniversaire", rating: 5 }
          ].map((testimonial, i) => (
            <div key={i} className="bg-[#FAF7F2] p-6 rounded-xl">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <span key={j} className="text-[#C8A96E]">★</span>
                ))}
              </div>
              <p className="text-[#6B6B6B] mb-4 italic">
                "Service exceptionnel et créations magnifiques. 
                Exactement ce que je voulais pour mon {testimonial.event.toLowerCase()} !"
              </p>
              <div className="font-semibold text-[#2C2C2C]">
                {testimonial.name}
              </div>
              <div className="text-sm text-[#6B6B6B]">
                {testimonial.event}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
