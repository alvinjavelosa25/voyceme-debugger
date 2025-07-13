import Image from "next/image";
import { Code, Cloud, Smartphone } from "lucide-react"; // Example Lucide icons

export default function About() {
  return (
    <div>
      <section className="sm:mt-6 lg:mt-8 mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="my-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 flex gap-3 flex-col lg:flex-row">
          <div className="sm:text-center lg:text-left flex-1">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-800 sm:text-5xl md:text-6xl">
              <span className="block xl:inline text-gray-500">About This Project</span>
              <span className="block text-indigo-600 xl:inline">Weather App Demo</span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              This page demonstrates a modern weather app built with Next.js, Tailwind CSS, and OpenWeatherMap API. 
              It features beautiful UI, live weather data, and a clean, responsive layout.
            </p>
            <ul className="mt-6 space-y-2 text-gray-700 text-base list-none pl-0">
              <li className="flex items-center gap-2 text-gray-500">
                <Code className="w-5 h-5 text-indigo-500" />
                Template-driven and developer friendly
              </li>
              <li className="flex items-center gap-2 text-gray-500">
                <Cloud className="w-5 h-5 text-blue-400" />
                Simple REST API integration
              </li>
              <li className="flex items-center gap-2 text-gray-500">
                <Smartphone className="w-5 h-5 text-green-500" />
                Responsive and accessible design
              </li>
            </ul>
            <div className="mt-6">
              <a
                href="/thank-you"
                className="inline-block px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-800 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
              >
                Thank You
              </a>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center my-4">
            <Image
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxjb21wdXRlcnxlbnwwfDB8fHwxNjkxODE2NjY3fDA&ixlib=rb-4.0.3&q=80&w=1080"
              className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full rounded-xl shadow-xl ring-1 ring-gray-400/10"
              alt="About Weather App"
              width={500}
              height={500}
              priority
            />
          </div>
        </div>
      </section>
    </div>
  );
}