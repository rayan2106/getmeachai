import Image from "next/image";
import { jsx } from "react/jsx-runtime";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center text-white h-[44vh] gap-4">
        <div className="font-bold text-5xl flex justify-center items-center">Buy Me a Chai <span className=""><img src="tea.gif" alt="" width={64} /></span></div>
        <p>A crowd funding platform for creators. Get funded by your fans and followers. start now!</p>

        <div>
          <Link href="/login">
            <button className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here</button>
          </Link>
          <Link href="/about">
            <button className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button>
          </Link>
        </div>
      </div>

      <div className="bg-white h-1 opacity-15">
      </div>

      <div className="text-white container mx-auto py-10">
        <h2 className="text-2xl font-bold text-center mb-14">Your Fans can buy you a Chai</h2>
        <div className="flex gap-5 justify-around">
          <div className="item space-y-3 flex flex-col items-center justify-center ">
            <img className="bg-slate-400 p-2 rounded-sm" src="man.gif" alt="" width={88} />
            <p>Fans want to help you</p>
            <p>Your fans are available for you to help you</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center ">
            <img className="bg-slate-400 p-2 rounded-sm" src="coin.gif" alt="" width={88} />
            <p>Fans want to help you</p>
            <p>Your fans are available for you to help you</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center ">
            <img className="bg-slate-400 p-2 rounded-sm" src="group.gif" alt="" width={88} />
            <p>Fans want to help you</p>
            <p>Your fans are available for you to help you</p>
          </div>
        </div>
      </div>

      <div className="bg-white h-1 opacity-15">
      </div>

      <div className="text-white container mx-auto py-10 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-center mb-14">Learn More about us!!</h2>


        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/QtaorVNAwbI?si=7zldfMYWF43dTuFn"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>


    </>
  );
}
