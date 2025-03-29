import React, { useState, useEffect } from "react";
import ServiceCard from "@/components/Home/OurServices/ServiceCard";

export default function OurServices() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("/data/services.json")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((error) => console.error("Error fetching services:", error));
  }, []);

  return (
    <div className="w-full bg-[var(--dark-cyan)]">
      <section className="mx-auto max-w-[1300px] text-center py-[50px] px-[20px] lg:py-[40px] lg:px-[15px] md:py-[30px] md:px-[10px]">
        <div className="centered-title">
          <h2 id="services" className="text-[2.5rem] section-title lg:text-[2rem] md:text-[1.8rem] font-bold">
            Our Services
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-[20px] lg:gap-[15px] md:flex-col md:items-center">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>
    </div>
  );
}