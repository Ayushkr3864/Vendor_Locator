import React from 'react'

function Error() {
  return (
    <>
      <div className="w-full mt-32 md:mt-20 h-full py-50 flex justify-center  bg-[#c2c3fd]">
        <div className="bg-white flex flex-col items-center  rounded ">
          <h1 className="text-9xl font-bold text-[#a78bfa]">404</h1>
          
           
            <h1 className="text-6xl font-semibold py-8">oops! Page not found</h1>
        
        </div>
      </div>
    </>
  );
}

export default Error