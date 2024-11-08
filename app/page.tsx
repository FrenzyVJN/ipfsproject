"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export default function HeroHighlightDemo() {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push("/file-upload");
  };

  return (
    <HeroHighlight>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className=" text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
      >
        Securely store your files with <Highlight className="text-black dark:text-white">DeDrive</Highlight>—a decentralized cloud solution. Enjoy true data ownership today!
      </motion.h1>
      <Button className="mx-auto flex p-4" onClick={handleButtonClick}>
        Get Started
      </Button>
    </HeroHighlight>
  );
}
