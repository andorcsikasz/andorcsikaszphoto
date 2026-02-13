import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  HardHat,
  Hammer,
  Wrench,
  Paint,
  Sparkle,
  ArrowLeft,
  Coffee,
  Pizza,
  Cat,
} from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { Link } from "wouter";

interface UnderConstructionProps {
  title?: string;
  message?: string;
  icon?: "hardhat" | "hammer" | "wrench" | "paint" | "sparkle";
}

const iconMap = {
  hardhat: HardHat,
  hammer: Hammer,
  wrench: Wrench,
  paint: Paint,
  sparkle: Sparkle,
};

const funnyMessages = [
  "Our hamsters are running on their wheels to build this page! 🐹",
  "We're teaching our AI to code this feature... it's learning, slowly! 🤖",
  "This page is currently in the oven. Check back when it's fully baked! 🍞",
  "Our developers are caffeinating as we speak! ☕",
  "Hold tight! We're assembling the IKEA furniture for this feature! 🔧",
  "This feature is marinating in awesomeness sauce! 🍕",
  "Our cat walked on the keyboard and deleted everything. We're fixing it! 🐱",
  "Currently downloading more RAM for this page... 99% complete! 💾",
  "The intern accidentally unplugged the server. BRB! 🔌",
  "This page is taking a power nap. Wake it up soon! 😴",
];

export default function UnderConstruction({
  title = "Under Construction",
  message,
  icon = "hardhat",
}: UnderConstructionProps) {
  const IconComponent = iconMap[icon];
  const randomMessage = message || funnyMessages[Math.floor(Math.random() * funnyMessages.length)];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full"
      >
        <Card className="border-0 shadow-2xl overflow-hidden">
          <CardContent className="p-0">
            {/* Animated construction stripe banner */}
            <div className="h-8 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]"
                 style={{
                   backgroundImage: 'repeating-linear-gradient(45deg, #fbbf24 0, #fbbf24 40px, #000 40px, #000 80px)',
                   animation: 'stripeScroll 2s linear infinite'
                 }}
            />

            <div className="p-12 text-center">
              {/* Animated icon */}
              <motion.div
                animate={{
                  rotate: [0, -10, 10, -10, 0],
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
                className="inline-block mb-6"
              >
                <div className="h-32 w-32 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-xl">
                  <IconComponent className="h-16 w-16 text-white" weight="duotone" />
                </div>
              </motion.div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {title}
              </h1>

              {/* Funny message */}
              <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
                {randomMessage}
              </p>

              {/* Fun stats */}
              <div className="grid grid-cols-3 gap-4 mb-8 max-w-md mx-auto">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-4 bg-purple-50 rounded-lg"
                >
                  <Coffee className="h-8 w-8 mx-auto mb-2 text-purple-600" weight="duotone" />
                  <div className="text-2xl font-bold text-purple-600">247</div>
                  <div className="text-xs text-muted-foreground">Coffees</div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-4 bg-orange-50 rounded-lg"
                >
                  <Pizza className="h-8 w-8 mx-auto mb-2 text-orange-600" weight="duotone" />
                  <div className="text-2xl font-bold text-orange-600">42</div>
                  <div className="text-xs text-muted-foreground">Pizzas</div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-4 bg-pink-50 rounded-lg"
                >
                  <Cat className="h-8 w-8 mx-auto mb-2 text-pink-600" weight="duotone" />
                  <div className="text-2xl font-bold text-pink-600">3</div>
                  <div className="text-xs text-muted-foreground">Cat Breaks</div>
                </motion.div>
              </div>

              {/* Progress bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>Construction Progress</span>
                  <span>42%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "42%" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  * The actual percentage is completely made up 😉
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600">
                  <Link href="/">
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Back to Home
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/properties">
                    Browse Properties
                  </Link>
                </Button>
              </div>

              {/* Easter egg */}
              <p className="text-xs text-muted-foreground mt-8 italic">
                💡 Pro tip: While you wait, why not check out our amazing properties?
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Floating tool icons */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-10 left-10 text-orange-400 opacity-20"
        >
          <Hammer className="h-16 w-16" weight="duotone" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, 15, 0],
            rotate: [0, -5, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute bottom-10 right-10 text-purple-400 opacity-20"
        >
          <Wrench className="h-12 w-12" weight="duotone" />
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes stripeScroll {
          0% { background-position: 0 0; }
          100% { background-position: 80px 0; }
        }
      `}</style>
    </div>
  );
}

// Pre-configured page variants
export function CreateProfilePage() {
  return (
    <UnderConstruction
      title="Profile Creator Coming Soon!"
      message="Our AI is learning how to match you with the perfect flatmates! Teaching machines is harder than teaching cats tricks. 🤖😺"
      icon="sparkle"
    />
  );
}

export function FindRoommatesPage() {
  return (
    <UnderConstruction
      title="Roommate Finder Loading..."
      message="We're training our compatibility algorithm on thousands of pizza topping preferences! Pineapple debates incoming! 🍕"
      icon="sparkle"
    />
  );
}

export function ListPropertyPage() {
  return (
    <UnderConstruction
      title="List Your Property (Soon!)"
      message="We're building the perfect form. Currently arguing about whether 'cozy' means 'small' or 'charming'. 📝"
      icon="paint"
    />
  );
}

export function HelpCenterPage() {
  return (
    <UnderConstruction
      title="Help Center"
      message="Ironically, we need help building the help center. The paradox is not lost on us! 📚"
      icon="wrench"
    />
  );
}

export function ContactPage() {
  return (
    <UnderConstruction
      title="Contact Us"
      message="We're installing our quantum email receiver. Until then, try sending a carrier pigeon! 🐦"
      icon="hammer"
    />
  );
}

export function PrivacyPage() {
  return (
    <UnderConstruction
      title="Privacy Policy"
      message="Our lawyers are still arguing about Oxford commas. Legal stuff takes time! ⚖️"
      icon="hardhat"
    />
  );
}

export function TermsPage() {
  return (
    <UnderConstruction
      title="Terms of Service"
      message="Translating legal jargon into human language... Progress: 0.01% 📜"
      icon="hardhat"
    />
  );
}
