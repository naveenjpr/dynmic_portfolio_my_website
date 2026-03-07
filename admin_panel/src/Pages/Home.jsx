import React from "react"
import Header from "../Common/Header"
import Sidebar from "../Middle-Section/Sidebar"

export default function Home() {
  return (
    <>
      <Header />

      <div className="grid grid-cols-[30%_auto]">
        <div>
          <Sidebar />

        </div>
        <div>
          hello
        </div>
      </div>
    </>
  )
}
