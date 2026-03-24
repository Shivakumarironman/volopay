import Image from "next/image";

export default function LeftSection() {
    return (
        <div className="w-1/2 sm:block hidden">
            <div className="relative w-max-[500px]">
                <div className="absolute left-20 top-20">
                    <Image
                        src="/star.svg"
                        alt="star-img"
                        width={70}
                        height={70}
                    />
                </div>
                <div className="h-130 rounded-b-full bg-[#e1e1fe] w-125 mx-auto">
                    <Image src="/visa.png" alt="visa-img" width={500} height={500} />
                </div>
            </div>
            <div className="w-max-[600px] mx-auto flex flex-col justify-center items-center mt-10 pb-20">
                <h1 className="text-[#4b4efc] text-6xl font-medium text-center leading-tight w-[700px] ">
                    Fresh Interface and better usability
                </h1>
                <p className="text-gray-700 font-medium text-center mt-10">Optimised to enhance your experience at every touchpoint</p>
            </div>
        </div>
    );
}