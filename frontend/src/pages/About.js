import React from 'react';
import { Heart, Sparkles, Users, Award, Compass, Leaf } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

const About = () => {
  const values = [
    {
      icon: <Heart className="w-8 h-8 text-green-600" />,
      title: "Compassionate Care",
      description: "Every session is guided by deep empathy and understanding for your unique healing journey."
    },
    {
      icon: <Sparkles className="w-8 h-8 text-green-600" />,
      title: "Ancient Wisdom",
      description: "We honor time-tested healing traditions while embracing modern wellness approaches."
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: "Community Connection",
      description: "Healing happens best in community. We foster connections that support your growth."
    },
    {
      icon: <Compass className="w-8 h-8 text-green-600" />,
      title: "Spiritual Guidance",
      description: "Navigate your spiritual path with wisdom, patience, and personalized support."
    }
  ];

  const team = [
    {
      name: "Elena Sharma",
      role: "Founder & Master Healer",
      description: "With over 15 years of experience in energy healing and meditation, Elena founded Mystic Prana to create a sanctuary for spiritual wellness.",
      specialties: ["Reiki Master", "Chakra Balancing", "Meditation Guide"]
    },
    {
      name: "David Chen",
      role: "Wellness Practitioner",
      description: "David brings a unique blend of Eastern and Western healing approaches, specializing in holistic wellness and energy therapy.",
      specialties: ["Energy Therapy", "Wellness Consultation", "Holistic Health"]
    },
    {
      name: "Sarah Martinez",
      role: "Group Facilitator",
      description: "Sarah creates sacred spaces for community healing, leading our group meditation and wellness workshops with gentle wisdom.",
      specialties: ["Group Meditation", "Workshop Leadership", "Community Building"]
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section 
        className="relative py-32 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(45, 87, 57, 0.85) 0%, rgba(74, 124, 89, 0.75) 100%), url('https://images.unsplash.com/photo-1506126613408-eca07ce68773?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwxfHx5b2dhfGVufDB8fHx8MTc1OTY0ODc0Nnww&ixlib=rb-4.1.0&q=85')`
        }}
        data-testid="about-hero-section"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading font-bold text-5xl md:text-6xl text-white mb-6 fade-in">
            Our Story of 
            <span className="bg-gradient-to-r from-green-200 to-green-100 bg-clip-text text-transparent">
              Healing
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed slide-up">
            Founded on the belief that everyone deserves access to healing and spiritual wellness, 
            Mystic Prana is more than a center—it's a community of souls on a journey to wholeness.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-gradient-to-b from-green-50 to-white" data-testid="mission-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="scale-in">
              <img 
                src="https://images.pexels.com/photos/917732/pexels-photo-917732.jpeg" 
                alt="Group meditation session" 
                className="rounded-3xl shadow-2xl w-full h-96 object-cover image-overlay"
                data-testid="mission-image"
              />
            </div>
            
            <div className="fade-in">
              <h2 className="font-heading font-bold text-4xl md:text-5xl text-green-800 mb-6">
                Our Mission
              </h2>
              
              <p className="text-lg text-green-600 mb-6 leading-relaxed">
                At Mystic Prana, we believe that healing is not just about addressing symptoms—it's about 
                awakening the inherent wisdom and power within each individual. Our mission is to provide 
                a sacred space where ancient healing traditions meet modern wellness practices.
              </p>
              
              <p className="text-lg text-green-600 mb-8 leading-relaxed">
                We are dedicated to supporting your journey of self-discovery, spiritual growth, and 
                holistic healing through personalized care, community connection, and time-honored 
                healing modalities.
              </p>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-800 text-lg">Rooted in Nature</h3>
                  <p className="text-green-600">Embracing the healing power of natural wisdom</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-white" data-testid="values-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-green-800 mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-green-600 max-w-3xl mx-auto leading-relaxed">
              These principles guide everything we do, from individual sessions to community gatherings.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card 
                key={index} 
                className="card text-center group hover:scale-105 transition-all duration-300"
                data-testid={`value-${index}`}
              >
                <CardContent className="p-8">
                  <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300">
                      {value.icon}
                    </div>
                  </div>
                  
                  <h3 className="font-heading font-semibold text-xl text-green-800 mb-4">
                    {value.title}
                  </h3>
                  
                  <p className="text-green-600 leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-gradient-to-b from-green-50 to-green-100" data-testid="team-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-green-800 mb-6">
              Meet Our Healers
            </h2>
            <p className="text-xl text-green-600 max-w-3xl mx-auto leading-relaxed">
              Our experienced practitioners are dedicated to supporting your healing journey with 
              compassion, wisdom, and expertise.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card 
                key={index} 
                className="card group hover:scale-102 transition-all duration-300 bg-white"
                data-testid={`team-member-${index}`}
              >
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                      <span className="text-white font-bold text-2xl font-heading">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    
                    <h3 className="font-heading font-semibold text-2xl text-green-800 mb-2">
                      {member.name}
                    </h3>
                    
                    <p className="text-green-600 font-medium mb-4">
                      {member.role}
                    </p>
                  </div>
                  
                  <p className="text-green-600 mb-6 leading-relaxed">
                    {member.description}
                  </p>
                  
                  <div>
                    <h4 className="font-semibold text-green-800 mb-3">Specialties:</h4>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {member.specialties.map((specialty, specialtyIndex) => (
                        <span 
                          key={specialtyIndex}
                          className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-gradient-to-r from-green-800 to-green-700" data-testid="about-cta-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <Award className="w-16 h-16 text-green-200 mx-auto mb-6" />
          </div>
          
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-white mb-6">
            Experience the Difference
          </h2>
          
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join hundreds of clients who have discovered profound healing and transformation 
            through our compassionate, personalized approach to wellness.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-green-200">Clients Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">15+</div>
              <div className="text-green-200">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">98%</div>
              <div className="text-green-200">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
