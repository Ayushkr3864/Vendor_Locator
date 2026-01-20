import React from 'react'

function About() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-50">
        {[
          {
            title: "500+ Vendors",
            desc: "A growing list of trusted vendors across categories.",
          },
          {
            title: "Smart Search",
            desc: "Find vendors instantly with location & category filters.",
          },
          {
            title: "Trusted Reviews",
            desc: "Real feedback to help you make better decisions.",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-[#112240]/70 backdrop-blur-md border border-[#1d3557] p-6 rounded-xl shadow-md"
          >
            <h3 className="text-2xl font-bold text-cyan-300 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-200 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default About