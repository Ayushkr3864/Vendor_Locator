import React from 'react'

function Featurescard({ Para, Heading }) {
  return (
    <>
      <div className="bg-[#112240]/80 backdrop-blur-md border border-[#1d3557] rounded-bl-2xl rounded-tr-2xl shadow-lg p-8 text-center hover:scale-105 transition">
        <h4 className="text-xl font-semibold text-cyan-300 mb-4">{Heading}</h4>
        <p className="text-gray-200">{Para}</p>
      </div>
    </>
  );
}

export default Featurescard