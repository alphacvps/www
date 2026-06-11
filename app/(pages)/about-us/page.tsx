"use client";

import React from "react";

const AboutTactical: React.FC = () => {
  return (
    <main className="min-h-screen bg-[#060606] font-mono selection:bg-red-600 selection:text-white p-6 md:p-12 lg:p-20">
      <div className="max-w-4xl mx-auto">
        <header className="mb-24">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-4">
            MINIMALISM <br />
            <span className="opacity-40">IS SECURITY.</span>
          </h1>
        </header>

        <section className="space-y-16 text-sm md:text-base leading-relaxed max-w-2xl">
          <div className="space-y-6">
            <h2 className="text-white font-bold uppercase tracking-widest text-xs border-b border-white/10 pb-2 w-fit">
              01. Security Through Simplicity
            </h2>

            <p className="opacity-80">
              We are a community focused on developing cyber security solutions
              built around clarity, precision, and operational control. Our
              philosophy rejects unnecessary complexity in favor of systems that
              are understandable, auditable, and maintainable over time. In a
              digital landscape dominated by bloated software stacks and opaque
              infrastructures, we deliberately choose restraint.
            </p>

            <p className="opacity-80">
              Every additional dependency, abstraction layer, or automated
              feature increases the attack surface. Complexity creates blind
              spots. Blind spots become vulnerabilities. For this reason, we
              design software where every component serves a clear and verifiable
              purpose. Minimalism is not aesthetics; it is a defensive strategy.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-white font-bold uppercase tracking-widest text-xs border-b border-white/10 pb-2 w-fit">
              02. Radical Transparency
            </h2>

            <p className="opacity-80">
              We believe real security can only exist when systems can be fully
              inspected and understood. Hidden logic and inaccessible code do
              not create trust — they merely outsource trust to third parties.
              Our approach prioritizes transparency, deterministic behavior, and
              direct control over the execution environment.
            </p>

            <p className="opacity-80">
              The tools we create are intended for technical users,
              professionals, researchers, and operators who require reliability
              without compromise. Instead of simplifying software by concealing
              its internals, we expose architecture and behavior as clearly as
              possible, allowing users to validate, adapt, and extend systems
              according to their operational needs.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-white font-bold uppercase tracking-widest text-xs border-b border-white/10 pb-2 w-fit">
              03. Engineering Discipline
            </h2>

            <p className="opacity-80">
              Building secure minimalist software requires more discipline than
              adding endless features. Removing the unnecessary is a continuous
              engineering process that demands precision, consistency, and deep
              understanding of system behavior. We optimize for robustness,
              predictability, and long-term maintainability instead of market
              trends or feature inflation.
            </p>

            <p className="opacity-80">
              Our mission is to demonstrate that essential architecture is not a
              limitation but the foundation of sustainable security. Strong
              systems are not those with the most functionality, but those that
              remain comprehensible under pressure, auditable under scrutiny, and
              resilient under attack.
            </p>
          </div>

          <div className="pt-12 border-t border-white/5">
            <p className="text-xl font-bold uppercase italic tracking-tight text-white">
              "Reduce complexity. Reduce attack surface. Preserve control."
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AboutTactical;
