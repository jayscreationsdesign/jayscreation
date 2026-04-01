"use client"

export function Testimonials() {
  return (
    <section className="py-16 bg-[#F5F0EB]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-jc-text text-center mb-12">
          Témoignages Clients
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Marie L.", event: "Mariage", rating: 5 },
            { name: "Sophie M.", event: "Baptême", rating: 5 },
            { name: "Thomas R.", event: "Anniversaire", rating: 5 }
          ].map((testimonial, i) => (
            <div key={i} className="bg-jc-surface p-6 rounded-xl border-jc-border">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <span key={j} className="text-[#8B4513]">★</span>
                ))}
              </div>
              <p className="text-jc-muted mb-4 italic">
                "Service exceptionnel et créations magnifiques. 
                Exactement ce que je voulais pour mon {testimonial.event.toLowerCase()} !"
              </p>
              <div className="font-semibold text-jc-text">
                {testimonial.name}
              </div>
              <div className="text-sm text-jc-muted">
                {testimonial.event}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
