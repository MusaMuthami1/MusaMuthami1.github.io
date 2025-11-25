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
              Hi! I&apos;m <span className="[font-weight:700]">Musa Mwange</span>,
              a <span className="[font-weight:700]">Cybersecurity Specialist</span> and{" "}
              <span className="[font-weight:700]">Frontend Developer</span> who bridges the gap between secure technology and exceptional user experiences. I specialize in{" "}
              <span className="[font-weight:700]">penetration testing</span>,{" "}
              <span className="[font-weight:700]">vulnerability assessment</span>,
              and building secure web applications that prioritize both{" "}
              <span className="[font-weight:700]">security</span> and{" "}
              <span className="[font-weight:700]">usability</span>.
            </p>
          </div>

          <div className="text-center">
            <h2 className="text-xl md:text-2xl xl:text-3xl font-bold tracking-wider mb-3 md:mb-4">
              HIRE ME
            </h2>
            <p className="text-sm lg:text-base xl:text-md leading-relaxed max-w-3xl mx-auto">
              I&apos;m available for cybersecurity consulting and web development opportunities. If
              you need a security-focused developer to secure or build your product,
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
