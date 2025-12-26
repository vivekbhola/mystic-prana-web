import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Users, Star, ArrowRight, Phone, Mail } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${API}/services`);
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const testimonials = [
    {
      name: "Sarah Johnson",
      text: "The energy healing session transformed my life. I found peace I never knew existed.",
      rating: 5
    },
    {
      name: "Michael Chen",
      text: "Group meditation here created a sense of community and healing I deeply needed.",
      rating: 5
    },
    {
      name: "Emma Rodriguez",
      text: "Chakra balancing helped me reconnect with my inner self. Truly life-changing.",
      rating: 5
    }
  ];

  const features = [
    {
      icon: <Sparkles className="w-8 h-8 text-green-600" />,
      title: "Energy Healing",
      description: "Restore balance and harmony through ancient healing practices"
    },
    {
      icon: <Heart className="w-8 h-8 text-green-600" />,
      title: "Holistic Wellness",
      description: "Nurture your mind, body, and spirit with personalized care"
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: "Community Healing",
      description: "Connect with others on their journey to spiritual growth"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(45, 87, 57, 0.85) 0%, rgba(74, 124, 89, 0.75) 35%, rgba(156, 175, 136, 0.65) 100%), url('https://images.unsplash.com/photo-1518495973542-4542c06a5843?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwzfHxzcGlyaXR1YWx8ZW58MHx8fHwxNzU5NjQ4NzIxfDA&ixlib=rb-4.1.0&q=85')`
        }}
        data-testid="hero-section"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="fade-in">
            <h1 className="hero-title font-heading font-bold text-5xl md:text-7xl text-white mb-6 leading-tight">
              Awaken Your 
              <span className="bg-gradient-to-r from-green-200 to-green-100 bg-clip-text text-transparent">
                Inner Light
              </span>
            </h1>
            
            <p className="hero-subtitle text-xl md:text-2xl text-green-100 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
              Discover the transformative power of energy healing and meditation at Mystic Prana. 
              Your journey to balance and spiritual wellness begins here.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center slide-up">
              <Link to="/contact">
                <Button 
                  size="lg" 
                  className="bg-white text-green-800 hover:bg-green-50 px-8 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-green-200/50 hover:scale-105 transition-all duration-300"
                  data-testid="get-started-btn"
                >
                  Begin Your Journey
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              
              <Link to="/about">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-white border-white hover:bg-white hover:text-green-800 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105"
                  data-testid="learn-more-btn"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-gradient-to-b from-green-50 to-white" data-testid="features-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title font-heading font-bold text-4xl md:text-5xl text-green-800 mb-6">
              Healing Modalities
            </h2>
            <p className="text-xl text-green-600 max-w-3xl mx-auto leading-relaxed">
              Experience holistic wellness through our carefully curated healing practices, 
              designed to nurture your complete well-being.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="card group hover:scale-105 transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm"
                data-testid={`feature-${index}`}
              >
                <CardContent className="p-8 text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="font-heading font-semibold text-2xl text-green-800 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-green-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-white" data-testid="services-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title font-heading font-bold text-4xl md:text-5xl text-green-800 mb-6">
              Our Services
            </h2>
            <p className="text-xl text-green-600 max-w-3xl mx-auto leading-relaxed">
              Personalized healing experiences tailored to your unique spiritual journey and wellness goals.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="loading-spinner" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <Card 
                  key={service.id} 
                  className="card group hover:scale-102 transition-all duration-300"
                  data-testid={`service-${index}`}
                >
                  <CardContent className="p-8">
                    <div className="mb-4">
                      <h3 className="font-heading font-semibold text-2xl text-green-800 group-hover:text-green-700 transition-colors">
                        {service.name}
                      </h3>
                    </div>
                    
                    <p className="text-green-600 mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <div className="mb-6">
                      <span className="text-sm text-green-500 font-medium">
                        Duration: {service.duration}
                      </span>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-green-800 mb-2">Benefits:</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.benefits.map((benefit, benefitIndex) => (
                          <span 
                            key={benefitIndex}
                            className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <Link to="/contact">
                      <Button 
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-full transition-all duration-300 hover:shadow-lg"
                        data-testid={`book-${service.name.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        Book This Service
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section 
        className="section-padding bg-cover bg-center bg-fixed relative"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(45, 87, 57, 0.9) 0%, rgba(74, 124, 89, 0.85) 100%), url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwyfHx5b2dhfGVufDB8fHx8MTc1OTY0ODc0Nnww&ixlib=rb-4.1.0&q=85')`
        }}
        data-testid="testimonials-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title font-heading font-bold text-4xl md:text-5xl text-white mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              Real stories of transformation and healing from our community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="bg-white/95 backdrop-blur-sm border-0 hover:bg-white transition-all duration-300 hover:scale-105"
                data-testid={`testimonial-${index}`}
              >
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <blockquote className="text-green-700 mb-6 leading-relaxed italic">
                    "{testimonial.text}"
                  </blockquote>
                  
                  <div className="font-semibold text-green-800">
                    {testimonial.name}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="section-padding bg-gradient-to-r from-green-800 to-green-700" data-testid="cta-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-white mb-6">
            Ready to Begin Your Healing Journey?
          </h2>
          
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Take the first step towards balance, peace, and spiritual wellness. 
            Your transformation awaits.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/contact">
              <Button 
                size="lg" 
                className="bg-white text-green-800 hover:bg-green-50 px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                data-testid="contact-us-btn"
              >
                <Phone className="mr-2 w-5 h-5" />
                Contact Us
              </Button>
            </Link>
            
            <a href="mailto:info@mysticprana.com">
              <Button 
                variant="outline" 
                size="lg" 
                className="text-white border-white hover:bg-white hover:text-green-800 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105"
                data-testid="email-us-btn"
              >
                <Mail className="mr-2 w-5 h-5" />
                Email Us
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
