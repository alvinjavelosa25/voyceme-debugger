import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>



<section className="sm:mt-6 lg:mt-8 mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    <div className="my-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 flex gap-3 lg:flex-justify lg:flex flex-col lg:flex-row">
        <div className="sm:text-center lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-800 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Welcome to the </span>
                <span className="block text-indigo-600 xl:inline">Bug Bash!</span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              Now that you've got this page working click the about the bash link to learn more
            </p>
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="max-w-7xl mx-auto">
                    <div className="relative group cursor-pointer">
                        <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-violet-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200">
                        </div>
                        <Link className="relative px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6" href="/about">
                            <div className="space-y-2">
                                <p className="text-slate-800">
                                    About the bash
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
      
        <div className="lg:inset-y-0 lg:right-0 lg:w-1/2 my-4">
            <Image src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            alt="Picture of the author"
            width={500} height={500}
            priority
            />
        </div>
    </div>

</section>


    </div>
  );
}
