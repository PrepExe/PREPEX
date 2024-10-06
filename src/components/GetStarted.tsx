import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { ReactNode } from 'react';

// Function to create subtle random rotation for text
const SubtleRandomText = ({ children, className = "" }: { children: ReactNode, className?: string }) => {
  const rotation = Math.random() * 4 - 2; // Subtle rotation
  return (
    <span 
      className={`inline-block transform ${className}`} 
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {children}
    </span>
  );
};

// Function to create subtle scribble lines for the background
const SubtleScribbleLine = () => (
  <svg className="absolute z-0 opacity-10" style={{
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    transform: `rotate(${Math.random() * 360}deg)`,
    width: `${Math.random() * 150 + 50}px`,
    height: `${Math.random() * 75 + 25}px`,
  }}>
    <path 
      d={`M0,${Math.random() * 50} Q${Math.random() * 75},${Math.random() * 75} ${Math.random() * 150},${Math.random() * 50}`} 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    />
  </svg>
);

// Function to vary font size, style, and weight for text
const RandomSubtleText = ({ text }: { text: ReactNode }) => {
  const fontSize = Math.random() > 0.5 ? 'text-lg' : 'text-xs';
  const fontWeight = Math.random() > 0.7 ? 'font-bold' : 'font-light';
  const fontStyle = Math.random() > 0.5 ? 'italic' : 'normal';

  // Set the restricted region with a 10px safe zone around the main content
  const topOffset = Math.random() * 100;
  const leftOffset = Math.random() * 100;

  const top = topOffset > 40 && topOffset < 60 ? `${topOffset + 10}%` : `${topOffset}%`; // Adjust for 10px safety
  const left = leftOffset > 40 && leftOffset < 60 ? `${leftOffset + 10}%` : `${leftOffset}%`; // Adjust for 10px safety

  return (
    <span className={`absolute z-0 text-gray-400 opacity-60 handwriting ${fontSize} ${fontWeight} ${fontStyle}`} style={{
      top: top,  // 10px safe zone
      left: left,
      transform: `rotate(${Math.random() * 15 - 5}deg)`,
    }}>
      {text}
    </span>
  );
};

export function GetStarted() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-white text-gray-800">
      {/* Subtle scribble lines */}
      {[...Array(30)].map((_, i) => <SubtleScribbleLine key={i} />)}

      {[
        "Innovate", "Explore", "Create", "Discover", "Learn", "Design", "Imagine", "Build", "Grow", "Achieve", "Develop", "Master", "Understand", "Advance", "Progress", "Excel", "Enhance", "Improve", "Skill", "Knowledge", "Mentor", "Coach", "Guide", "Instruct", "Educate", "Train", "Practice", "Study", "Analyze", "Research", "Solve", "Think",
        "console.log('Hello, world!');", "E = mc^2", "π ≈ 3.14159", "∫ f(x) dx = F(x) + C", "<div>Hello, HTML!</div>", "Voltage = Current × Resistance", "Resistor ->", "<Button>Click Me</Button>", "<script>alert('Boo!')</script>", "class Foo extends Bar {}", "Voltage Divider Rule", "F = ma", "Pythagoras: a² + b² = c²", "let x = 42;", "<div id='fun'>Coding!</div>", "5V Power Supply", "Binary", "101010", "<CPU>Processor</CPU>", "return True;", "Current Flow ->"
      ].map((text, i) => (
        <RandomSubtleText key={i} text={text} />
      ))}

      {/* Header with Logo and Nav */}
      <header className="px-8 lg:px-12 h-20 flex items-center relative z-10">
        <div className="absolute top-4 left-8 z-10">
          <Link href="/">
            <Image src='/PREPEX.png' alt="PREPEX Logo" width={60} height={60} className="transform hover:rotate-3 transition-transform" />
          </Link>
        </div>
        <nav className="ml-auto flex gap-4 z-10">
          <Link
            href="/password/login"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Sign In
          </Link>
          <Link
            href="/password/signup"
            className="inline-flex h-10 items-center justify-center rounded-md border border-primary px-4 py-2 text-sm font-medium text-primary shadow-sm transition-colors hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Sign Up
          </Link>
        </nav>
      </header>
      
      <main className="flex-1 flex items-center justify-center relative z-10 px-8 py-16">
        <div className="w-full max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_500px] items-center">
            <div className="flex flex-col justify-center space-y-6">
              <h1 className="text-5xl font-bold tracking-tight mb-4">
                <SubtleRandomText>Welcome To PREPEX</SubtleRandomText> <SubtleRandomText className="text-primary">Learning Zone</SubtleRandomText>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Unleash your potential with our innovative learning approach. Combine creativity and education for a unique learning experience.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/password/signup"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  Get Started
                </Link>
                <Link
                  href="/learn-more"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-gray-300 bg-white px-6 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative mx-auto" style={{ transform: "rotate(-4deg)" }}>
              <Image
                src="/PREPEX.png"
                width={400}
                height={400}
                alt="PREPEX Creative Learning"
                className="rounded-xl shadow-lg"
              />
              <div className="absolute -top-3 -right-3 w-8 h-8 z-20">
                <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-sm"></div>
                <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-red-600 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
