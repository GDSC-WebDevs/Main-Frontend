
import Link from "next/link"
import Image from "next/image"
import NavUtils from "./NavUtils"

export default function Navbar() {
    return (
        <div className="w-screen bg-[#292929] pb-1">
            <div className="w-[94%] max-w-[110rem] flex xl:h-20 items-center justify-between mx-auto">
                <div className="flex justify-center items-center w-full xl:w-auto ">
                    <Link className="flex xl:flex-row flex-row-reverse xl:justify-center justify-between w-full xl:w-auto items-center " href='/'>
                        <NavUtils/>
                        <div className="flex justify-center items-center gap-3">
                            <Image quality={100} src="GDSCicon.svg" width={61} height={10} alt="image"></Image>
                            GDSC_NITC
                        </div>
                    </Link>
                </div>
                <div className="xl:flex gap-5 items-center mx-3 hidden">
                    <div className="rounded-3xl bg-[#2F2F2F] text-lg h-14 items-center flex justify-around gap-4 px-5 text-[#A8A8A8] ">
                        <Link className="hover:bg-[#222222] hover:py-2 hover:px-4 hover:rounded-3xl w-24 flex justify-center transition-all ease-in-out duration-500" href='/'>Home</Link>
                        <Link className="hover:bg-[#222222] hover:py-2 hover:px-1 hover:rounded-3xl w-28 flex justify-center transition-all ease-in-out duration-500" href='/about'>About Us</Link>
                        <Link className="hover:bg-[#222222] hover:py-2 hover:px-4 hover:rounded-3xl w-24 flex justify-center transition-all ease-in-out duration-500" href='/events'>Events</Link>
                        <Link className="hover:bg-[#222222] hover:py-2 hover:px-4 hover:rounded-3xl w-24 flex justify-center transition-all ease-in-out duration-500" href='/teams'>Teams</Link>
                        <Link className="hover:bg-[#222222] hover:py-2 hover:px-4 hover:rounded-3xl w-24 flex justify-center transition-all ease-in-out duration-500" href='/gallery'>Gallery</Link>
                    </div>
                    <Link className="rounded-full bg-[#292929] flex justify-center items-center gap-2 h-full shadow-[0px_0px_5px_1px_#FFFFFF4D] py-3 px-4 hover:shadow-[0px_0px_10px_2px_#FFFFFF4D] transition-all ease-in-out duration-200" href='/contact'>Contact Us <span className="font-semibold">&#8599;</span></Link>
                </div>
            </div>
        </div>
    )
}
