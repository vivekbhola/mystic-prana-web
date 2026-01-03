import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, Users, Award, Compass, Leaf, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

const About = () => {
  const values = [
    {
      icon: <Sparkles className="w-8 h-8 text-green-600" />,
      title: "Energy Alignment",
      description: "Maintaining high vibrational practices that uplift, cleanse, and elevate every seeker."
    },
    {
      icon: <Heart className="w-8 h-8 text-green-600" />,
      title: "Gratitude as a Way of Being",
      description: "Celebrating the little moments, the big breakthroughs, and everything in between."
    },
    {
      icon: <Compass className="w-8 h-8 text-green-600" />,
      title: "Spiritual Discipline",
      description: "Honoring practices with consistency, devotion, and integrity."
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: "Collective Healing",
      description: "Creating a safe and compassionate space where every soul feels held and supported."
    },
    {
      icon: <Leaf className="w-8 h-8 text-green-600" />,
      title: "Seva (Selfless Service)",
      description: "Serving without expectation and becoming a channel of purity, love, and the guru's teachings."
    },
    {
      icon: <Award className="w-8 h-8 text-green-600" />,
      title: "Growth of the Soul",
      description: "Every circle, meditation, and gathering is dedicated to evolving into the highest version of ourselves."
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
            About 
            <span className="bg-gradient-to-r from-green-200 to-green-100 bg-clip-text text-transparent">
              Mystic Prana
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed slide-up">
            A sacred space dedicated to inner transformation, emotional balance, and energetic harmony.
          </p>
        </div>
      </section>

      {/* About Mystic Prana Section */}
      <section className="section-padding bg-gradient-to-b from-green-50 to-white" data-testid="about-mystic-prana-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="scale-in">
              <img 
                src="https://images.pexels.com/photos/917732/pexels-photo-917732.jpeg" 
                alt="Group meditation session" 
                className="rounded-3xl shadow-2xl w-full h-96 object-cover image-overlay"
                data-testid="about-image"
              />
            </div>
            
            <div className="fade-in">
              <h2 className="font-heading font-bold text-4xl md:text-5xl text-green-800 mb-6">
                Our Sacred Space
              </h2>
              
              <p className="text-lg text-green-600 mb-6 leading-relaxed">
                Mystic Prana is a sacred space dedicated to inner transformation, emotional balance, and energetic harmony. 
                Rooted in ancient wisdom and enriched with modern healing modalities, we bring together practices that 
                nurture the mind, soothe the heart, and realign the energy system.
              </p>
              
              <p className="text-lg text-green-600 mb-6 leading-relaxed">
                Our community was created for those seeking more than just relief — for those who wish to understand themselves 
                deeply, heal consciously, and grow with intention. Through meditation, breathwork, holistic healing techniques, 
                and energy-based therapies, we support individuals in rediscovering their natural state of balance and wellbeing.
              </p>

              <p className="text-lg text-green-600 mb-8 leading-relaxed">
                At Mystic Prana, we believe healing is multidimensional. It is emotional, mental, physical, and energetic — 
                and each layer deserves care, attention, and compassion. We honour every seeker's journey, creating a space 
                where presence becomes healing, energy becomes guidance, and transformation becomes a lived experience.
              </p>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-800 text-lg">A Place of Homecoming</h3>
                  <p className="text-green-600">Where transformation becomes a lived experience</p>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* Our Vision Section */}
      <section className="section-padding bg-white" data-testid="vision-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-green-800 mb-6">
              Our Vision
            </h2>
            <p className="text-xl text-green-600 max-w-3xl mx-auto leading-relaxed">
              A welcoming sanctuary for every seeker where healing becomes approachable and transformative.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <Card className="card border-0 shadow-2xl bg-gradient-to-br from-green-50 to-white">
              <CardContent className="p-12">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <Compass className="w-10 h-10 text-green-600" />
                  </div>
                </div>
                
                <p className="text-lg text-green-700 leading-relaxed mb-6 text-center">
                  We envision Mystic Prana as a welcoming sanctuary for every seeker — a place where the mind finds clarity, 
                  the heart feels safe, and the energy system is gently restored. A space where healing isn't intimidating 
                  or complicated, but approachable, heartfelt, and transformative in everyday life.
                </p>
                
                <p className="text-lg text-green-700 leading-relaxed mb-6 text-center">
                  Here, every practice — from meditation and breathwork to energy alignment and holistic healing — is designed 
                  to help you reconnect with your true self, release what no longer serves you, and rediscover balance, 
                  peace, and inner strength.
                </p>
                
                <p className="text-lg text-green-700 leading-relaxed text-center">
                  We imagine a community where seekers of all paths feel drawn to explore, grow, and evolve — supported by 
                  guidance, warmth, and shared intention. At Mystic Prana, we aim to make the path of self-discovery and 
                  healing relatable, inspiring, and deeply personal — so that every individual leaves feeling more aligned, 
                  present, and connected to the light within.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="section-padding bg-gradient-to-b from-green-50 to-white" data-testid="mission-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-green-800 mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-green-600 max-w-3xl mx-auto leading-relaxed">
              Creating a sacred, transformative space grounded in compassion and conscious presence.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <Card className="card border-0 shadow-2xl bg-white">
              <CardContent className="p-12">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <Heart className="w-10 h-10 text-green-600" />
                  </div>
                </div>
                
                <p className="text-lg text-green-700 leading-relaxed text-center">
                  At Mystic Prana, our mission is to create a sacred, transformative space where every seeker feels seen, 
                  supported, and connected to their inner light. Through meditation, mindful practices, energy alignment, 
                  and community gatherings, we guide individuals back to stillness — where true healing and clarity reside.
                </p>
                
                <div className="w-16 h-1 bg-green-300 mx-auto my-8"></div>
                
                <p className="text-lg text-green-700 leading-relaxed text-center">
                  Grounded in sewa, compassion, and conscious presence, we aim to nurture a community that grows together 
                  with sincerity, devotion, and authenticity. Our mission is to help each person awaken their highest potential, 
                  embody inner harmony, and live with awareness, gratitude, and purpose.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mentor Section */}
      <section className="section-padding bg-gradient-to-b from-green-50 to-green-100" data-testid="mentor-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-green-800 mb-6">
              Meet Our Mentor
            </h2>
            <p className="text-xl text-green-600 max-w-3xl mx-auto leading-relaxed">
              Guided by wisdom, compassion, and over 7 years of transformative healing experience, 
              our mentor creates a sacred space for your spiritual journey.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="card group hover:scale-102 transition-all duration-300 bg-white overflow-hidden">
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Photo Section */}
                  <div className="relative bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center p-12">
                    <div className="text-center">
                      <div className="w-64 h-64 mx-auto mb-6 rounded-full overflow-hidden shadow-2xl group-hover:scale-105 transition-transform duration-300 border-4 border-white bg-white">
                        <img 
                          src="https://customer-assets.emergentagent.com/job_prana-wellness/artifacts/8v0uvn64_Unknown.jpeg"
                          alt="Mahima Rathore - Founder & Principal Spiritual Energy Healer"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-indigo-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                        </div>
                        <p className="text-green-600 text-sm font-medium">Chakra Alignment Specialist</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-8 lg:p-12">
                    <div className="h-full flex flex-col">
                      <div className="mb-6">
                        <h3 className="font-heading font-bold text-3xl text-green-800 mb-2">
                          Mahima Rathore
                        </h3>
                        <p className="text-green-600 font-semibold text-lg mb-1">
                          Founder & Principal Spiritual Energy Healer
                        </p>
                        <p className="text-green-500 text-sm">
                          Certified Energy Healer & Trainer • 7+ Years Experience
                        </p>
                      </div>
                      
                      <div className="flex-1">
                        <p className="text-green-600 mb-6 leading-relaxed">
                          Known for her deeply intuitive approach, Mahima provides transformative healing 
                          experiences that blend energy healing, aura scanning, meditation, and holistic wellness. 
                          Her heart-centered guidance helps individuals restore balance, clarity, and inner light.
                        </p>
                        
                        <p className="text-green-600 mb-6 leading-relaxed">
                          With over 7 years of guiding souls, Mahima is attuned and compassionate, helping 
                          individuals awaken their true potential and live with harmony and purpose. She ensures 
                          every person can heal at their own pace with love, integrity, and presence.
                        </p>
                        
                        <div className="mb-6">
                          <h4 className="font-semibold text-green-800 mb-3">Core Specialties:</h4>
                          <div className="grid grid-cols-2 gap-2">
                            <span className="px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium text-center">
                              Energy Healing
                            </span>
                            <span className="px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium text-center">
                              Aura Scanning
                            </span>
                            <span className="px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium text-center">
                              Chakra Analysis
                            </span>
                            <span className="px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium text-center">
                              Meditation Guide
                            </span>
                            <span className="px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium text-center">
                              Inner Transformation
                            </span>
                            <span className="px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium text-center">
                              Spiritual Wellness
                            </span>
                          </div>
                        </div>
                        
                        <div className="border-t border-green-200 pt-4">
                          <p className="text-green-700 italic text-sm leading-relaxed">
                            "Every soul has the capacity for profound healing and transformation. 
                            My role is simply to hold sacred space and guide you back to your own inner wisdom."
                          </p>
                          <p className="text-green-600 text-xs mt-2">— Mahima Rathore</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Experience the Difference */}
      <section className="section-padding bg-gradient-to-r from-green-800 to-green-700" data-testid="about-cta-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="mb-8">
              <Award className="w-16 h-16 text-green-200 mx-auto mb-6" />
            </div>
            
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-white mb-6">
              Experience the Difference
            </h2>
            
            <p className="text-xl text-green-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              Mystic Prana is more than a healing center—it is a sanctuary. What sets us apart is our 
              commitment to creating experiences that are transformative and deeply personal.
            </p>
          </div>

          {/* Key Differentiators */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 bg-opacity-20 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Heart className="w-10 h-10 text-green-200" />
              </div>
              <h3 className="font-heading font-semibold text-2xl text-white mb-4">
                Personalized
              </h3>
              <p className="text-green-100 leading-relaxed">
                Every session is tailored to your emotional and energetic needs.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 bg-opacity-20 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-green-200" />
              </div>
              <h3 className="font-heading font-semibold text-2xl text-white mb-4">
                Integrative
              </h3>
              <p className="text-green-100 leading-relaxed">
                We blend ancient healing wisdom with practical tools for daily life.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 bg-opacity-20 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Users className="w-10 h-10 text-green-200" />
              </div>
              <h3 className="font-heading font-semibold text-2xl text-white mb-4">
                Safe & Supportive
              </h3>
              <p className="text-green-100 leading-relaxed">
                A judgment-free space where your journey is honored.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 bg-opacity-20 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Compass className="w-10 h-10 text-green-200" />
              </div>
              <h3 className="font-heading font-semibold text-2xl text-white mb-4">
                Transformative
              </h3>
              <p className="text-green-100 leading-relaxed">
                Designed not just for relief, but for lasting inner change.
              </p>
            </div>
          </div>

          {/* Inspirational Quote */}
          <div className="text-center bg-white bg-opacity-10 backdrop-blur-sm rounded-3xl p-8 md:p-12">
            <div className="max-w-4xl mx-auto">
              <blockquote className="text-2xl md:text-3xl font-heading font-light text-white leading-relaxed mb-6">
                "Here at Mystic Prana, every breath restores balance, every moment uplifts the soul, 
                and every heartbeat ignites your inner light."
              </blockquote>
              
              <div className="w-20 h-1 bg-green-300 mx-auto mb-6"></div>
              
              <p className="text-lg text-green-100 mb-8">
                Whether you seek peace, clarity, emotional release, or a deeper connection with yourself, 
                begin your transformation from the very first moment.
              </p>
              
              <Link to="/contact">
                <Button 
                  size="lg" 
                  className="bg-white text-green-800 hover:bg-green-50 px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  data-testid="begin-transformation-btn"
                >
                  Begin Your Transformation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
