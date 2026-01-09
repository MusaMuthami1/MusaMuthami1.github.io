"use client";
import React from "react";
import Link from "next/link";

const MeetMe = () => {
  return (
    <section
      id="meet-me"
      className="flex items-center justify-center h-full w-full overflow-auto"
      suppressHydrationWarning
    >
      <div className="w-full h-full mx-auto max-w-4xl p-2.5 pl-4 md:p-10 flex items-center md:justify-center " suppressHydrationWarning>
        <div className="space-y-12 md:space-y-16">
          <div className="text-center">
            <h2 className="text-xl md:text-2xl xl:text-3xl font-bold tracking-wider mb-3 md:mb-4">
              ABOUT ME
            </h2>
            <p className="text-sm lg:text-base xl:text-md leading-relaxed max-w-3xl mx-auto ">
              Hi! I&apos;m <span className="[font-weight:700]">Musa Muthami</span>,
              a <span className="[font-weight:700]">Software Developer at SafeTek Solutions</span>.
              I specialize in building{" "}
              <span className="[font-weight:700]">mobile applications</span> with{" "}
              <span className="[font-weight:700]">Flutter</span>,{" "}
              <span className="[font-weight:700]">web applications</span> with{" "}
              <span className="[font-weight:700]">Next.js</span>, and{" "}
              <span className="[font-weight:700]">USSD solutions</span>.
              I create innovative apps that deliver exceptional user experiences.
            </p>
          </div>

          <div className="text-center">
            <h2 className="text-xl md:text-2xl xl:text-3xl font-bold tracking-wider mb-3 md:mb-4">
              HIRE ME
            </h2>
            <p className="text-sm lg:text-base xl:text-md leading-relaxed max-w-3xl mx-auto">
              I&apos;m available for software development opportunities. If
              you need a skilled developer to build your mobile app, web application, or USSD solution,
              feel free to connect.
              <Link
                href="https://mail.google.com/mail/u/0/?fs=1&to=musamwange2@gmail.com&tf=cm"
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-3 font-bold underline [text-decoration-thickness:1px]"
              >
                musamwange2@gmail.com
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetMe;
