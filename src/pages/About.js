// About.js
import React from 'react';
import { Code, Users, Shield } from 'lucide-react';

function FeatureCard({ title, description, icon: Icon }) {
  return (
    <div className="relative group">
      {/* Gradient border */}
      <div className="absolute -inset-[1px] rounded-lg bg-gradient-to-r from-[rgba(253,144,0,1)] to-[rgba(254,227,130,1)] opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {/* Content */}
      <div className="relative p-6 bg-primary-background rounded-lg h-full">
        <div className="p-2 bg-secondary-background rounded-lg w-fit">
          <Icon size={24} className="text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-text-primary mt-4">{title}</h3>
        <p className="text-text-secondary mt-2">{description}</p>
      </div>
    </div>
  );
}

function About() {
  const features = [
    {
      title: "Built for Developers",
      description: "Designed with modern development practices and tools in mind.",
      icon: Code
    },
    {
      title: "Team Collaboration",
      description: "Enhanced features for team productivity and communication.",
      icon: Users
    },
    {
      title: "Enterprise Security",
      description: "Advanced security measures to protect your data.",
      icon: Shield
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-text-primary">About Our Platform</h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          We're building the next generation of tools for developers and teams. 
          Our platform combines powerful features with an intuitive interface.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>

      {/* Team Section */}
      <div className="mt-16">
        <div className="bg-primary-background border border-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-text-primary mb-4">Our Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((member) => (
              <div key={member} className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[rgba(253,144,0,1)] to-[rgba(254,227,130,1)]" />
                <div>
                  <h4 className="text-text-primary font-medium">Team Member {member}</h4>
                  <p className="text-text-secondary text-sm">Position {member}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;