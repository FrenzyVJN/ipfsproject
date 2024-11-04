'use client'
import FileUpload from './file-upload';
import FileFetch from './file-fetch';
import { motion } from 'framer-motion';
import { HeroHighlight } from '@/components/ui/hero-highlight';

export default function IPFSPortal() {
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
        className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto"
      >
        Welcome to the IPFS Portal
      </motion.h1>
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">IPFS Portal</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <FileUpload />
            <FileFetch />
          </div>
        </div>
      </div>
    </HeroHighlight>
  );
}
