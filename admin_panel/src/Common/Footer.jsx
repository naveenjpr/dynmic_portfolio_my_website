import React from "react"
import { FaArrowUpLong } from "react-icons/fa6"

export default function Footer() {
  return (
    <>
      <div className="w-[100%] HeaderImage b-[30px]">
        <h1 className="text-[35px] text-white text-center font-[800] py-[30px]">
          Publish your passions, your way
        </h1>
        <p className="text-white text-center text-[20px]">
          Create a unique and beautiful blog easily.
        </p>
        <button className="bg-[#ff8000] rounded-sm uppercase font-bold text-xs md:text-sm p-2 mx-auto flex text-white mt-[30px] mb-[10px]">
          Create Your Blog
        </button>
        <div className="md:text-xs text-[23px]	 leading-10  my-4 text-center	">
          <i>
            <span className="text-white mt-[5px] text-[24px]">
              Discover storytelling through our captivating bl
            </span>
          </i>
        </div>
        <div className="w-[100%] border-[1px] border-[solid] border-[black] mt-[50px]"></div>

        <div className="w-[95%] mx-auto py-[20px] flex  items-center justify-between">
          <div className="">
            <h1 class="text-[#45ce55] text-[24px] text-center font-extrabold">
              Blog-<span class="text-[#ff4d00]">st</span>
            </h1>
          </div>
          <h1 className="text-white sm:text-[20px] text-[19px] font-[700] text-center sm:p-[0px] px-[5px]">
            Stay Connected with Blogst
          </h1>
          <div>
            <svg class="animate-bounce w-6 h-6">
              <FaArrowUpLong className="text-white" />
            </svg>
          </div>
        </div>
      </div>
    </>
  )
}
