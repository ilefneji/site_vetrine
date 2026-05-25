import Image from "next/image"

export function HeroBanner() {
  return (
    <section className="w-full bg-[#FDE8D8] px-4 py-12 md:px-8 md:py-16">
      <div className="relative mx-auto w-full max-w-[85%] overflow-hidden rounded-2xl">
        {/* Background Image */}
        <div className="relative h-[400px] w-full md:h-[500px] lg:h-[550px]">
          <Image
            src="/images/construction-worker.jpg"
            alt="Construction worker with tablet looking upward"
            fill
            className="object-cover grayscale"
            priority
          />
          
          {/* Orange Circle Overlay */}
          <div className="absolute left-0 top-1/2 z-10 flex h-[240px] w-[240px] -translate-x-[15%] -translate-y-1/2 flex-col items-center justify-center rounded-full bg-[#E07B2A] md:h-[280px] md:w-[280px] lg:h-[320px] lg:w-[320px]">
            {/* Custom iP Logo */}
            <div className="mb-3 flex items-end">
              <svg
                viewBox="0 0 60 60"
                fill="none"
                className="h-12 w-12 md:h-14 md:w-14 lg:h-16 lg:w-16"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Stylized "i" as a person figure */}
                <circle cx="15" cy="10" r="6" fill="white" />
                <rect x="11" y="20" width="8" height="30" rx="2" fill="white" />
                
                {/* Stylized "P" */}
                <path
                  d="M30 15 L30 50 M30 15 L45 15 C52 15 52 32 45 32 L30 32"
                  stroke="white"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>
            
            {/* Text inside circle */}
            <p className="px-6 text-center text-sm font-bold italic leading-tight text-white md:text-base lg:px-8">
              Réinventer la gestion
              <br />
              des projets de
              <br />
              construction .
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
