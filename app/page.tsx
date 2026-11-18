import { Registry } from "@/components/Registry";
import { FutureCapability } from "@/components/FutureCapability";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { Shift } from "@/components/Shift";
import { ProductMockups } from "@/components/ProductMockups";
import { Workforce } from "@/components/Workforce";
import { Guardrails } from "@/components/Guardrails";
import { Infrastructure } from "@/components/Infrastructure";
import { Security } from "@/components/Security";
import { Vision } from "@/components/Vision";
import { Beta } from "@/components/Beta";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Manifesto />
        <Registry />
        <Shift />
        <FutureCapability>
          <ProductMockups />
        </FutureCapability>
        <FutureCapability>
          <Workforce />
        </FutureCapability>
        <FutureCapability>
          <Guardrails />
        </FutureCapability>
        <FutureCapability>
          <Infrastructure />
        </FutureCapability>
        <FutureCapability>
          <Security />
        </FutureCapability>
        <FutureCapability>
          <Vision />
        </FutureCapability>
        <Beta />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
