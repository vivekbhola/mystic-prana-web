import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    service_interest: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({
      ...prev,
      service_interest: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API}/contact`, formData);
      
      if (response.status === 200) {
        setIsSubmitted(true);
        toast.success('Message sent successfully! We\'ll get back to you soon.');
        
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          service_interest: ''
        });
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error('Failed to send message. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6 text-green-600" />,
      title: "Visit Us",
      details: [
        "123 Serenity Lane",
        "Wellness District",
        "Peaceful City, PC 12345"
      ]
    },
    {
      icon: <Phone className="w-6 h-6 text-green-600" />,
      title: "Call Us",
      details: [
        "+91-7353715159",
        "+91-9982932666"
      ]
    },
    {
      icon: <Mail className="w-6 h-6 text-green-600" />,
      title: "Email Us",
      details: [
        "info@mysticprana.com",
        "bookings@mysticprana.com",
        "support@mysticprana.com"
      ]
    },
    {
      icon: <Clock className="w-6 h-6 text-green-600" />,
      title: "Hours",
      details: [
        "Mon-Fri: 9:00 AM - 7:00 PM",
        "Saturday: 10:00 AM - 6:00 PM",
        "Sunday: 12:00 PM - 5:00 PM"
      ]
    }
  ];

  const services = [
    "Energy Healing Sessions",
    "Group Meditation",
    "Chakra Balancing",
    "Wellness Consultation",
    "Other/General Inquiry"
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section 
        className="relative py-32 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(45, 87, 57, 0.85) 0%, rgba(74, 124, 89, 0.75) 100%), url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwyfHx5b2dhfGVufDB8fHx8MTc1OTY0ODc0Nnww&ixlib=rb-4.1.0&q=85')`
        }}
        data-testid="contact-hero-section"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading font-bold text-5xl md:text-6xl text-white mb-6 fade-in">
            Connect With 
            <span className="bg-gradient-to-r from-green-200 to-green-100 bg-clip-text text-transparent">
              Your Healing
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed slide-up">
            Ready to begin your journey to wellness? Reach out to us and let's start 
            your transformation together.
          </p>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="section-padding bg-gradient-to-b from-green-50 to-white" data-testid="contact-form-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="scale-in">
              <Card className="card border-0 shadow-2xl">
                <CardContent className="p-8">
                  {isSubmitted ? (
                    <div className="text-center py-8" data-testid="success-message">
                      <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                      <h3 className="font-heading font-semibold text-2xl text-green-800 mb-4">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-green-600 leading-relaxed">
                        Thank you for reaching out. We'll get back to you within 24 hours 
                        to discuss your healing journey.
                      </p>
                    </div>
                  ) : (
                    <>
                      <h2 className="font-heading font-bold text-3xl text-green-800 mb-6">
                        Send Us a Message
                      </h2>
                      
                      <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-green-800 mb-2">
                              Full Name *
                            </label>
                            <Input
                              id="name"
                              name="name"
                              type="text"
                              required
                              value={formData.name}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                              placeholder="Your full name"
                              data-testid="name-input"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-green-800 mb-2">
                              Email Address *
                            </label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              required
                              value={formData.email}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                              placeholder="your@email.com"
                              data-testid="email-input"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-sm font-semibold text-green-800 mb-2">
                            Phone Number
                          </label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="(555) 123-4567"
                            data-testid="phone-input"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="service_interest" className="block text-sm font-semibold text-green-800 mb-2">
                            Service Interest
                          </label>
                          <Select onValueChange={handleSelectChange} data-testid="service-select">
                            <SelectTrigger className="w-full px-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500">
                              <SelectValue placeholder="Select a service (optional)" />
                            </SelectTrigger>
                            <SelectContent>
                              {services.map((service, index) => (
                                <SelectItem key={index} value={service}>
                                  {service}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <label htmlFor="subject" className="block text-sm font-semibold text-green-800 mb-2">
                            Subject *
                          </label>
                          <Input
                            id="subject"
                            name="subject"
                            type="text"
                            required
                            value={formData.subject}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="How can we help you?"
                            data-testid="subject-input"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="message" className="block text-sm font-semibold text-green-800 mb-2">
                            Message *
                          </label>
                          <Textarea
                            id="message"
                            name="message"
                            required
                            rows={5}
                            value={formData.message}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                            placeholder="Tell us about your healing goals or any questions you have..."
                            data-testid="message-textarea"
                          />
                        </div>
                        
                        <Button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-lg transition-all duration-300 hover:shadow-lg disabled:opacity-50"
                          data-testid="submit-button"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="loading-spinner mr-2" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="mr-2 w-5 h-5" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </form>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="fade-in">
              <div className="space-y-8">
                <div>
                  <h2 className="font-heading font-bold text-3xl text-green-800 mb-6">
                    Get In Touch
                  </h2>
                  <p className="text-lg text-green-600 leading-relaxed">
                    We're here to support you on your healing journey. Whether you have questions 
                    about our services, want to schedule a session, or simply need guidance, 
                    don't hesitate to reach out.
                  </p>
                </div>

                <div className="grid gap-6">
                  {contactInfo.map((info, index) => (
                    <Card 
                      key={index} 
                      className="card border-0 hover:scale-102 transition-all duration-300"
                      data-testid={`contact-info-${index}`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            {info.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold text-green-800 text-lg mb-2">
                              {info.title}
                            </h3>
                            <div className="space-y-1">
                              {info.details.map((detail, detailIndex) => (
                                <p key={detailIndex} className="text-green-600">
                                  {detail}
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Emergency Contact */}
                <Card className="card border-2 border-green-200 bg-green-50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-green-800 text-lg mb-3">
                      Need Immediate Support?
                    </h3>
                    <p className="text-green-600 mb-4">
                      If you're experiencing a spiritual or emotional crisis, please reach out 
                      to our emergency support line.
                    </p>
                    <Button 
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold"
                      data-testid="emergency-contact-btn"
                    >
                      <Phone className="mr-2 w-4 h-4" />
                      Emergency Support
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-padding-sm bg-white" data-testid="map-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl text-green-800 mb-4">
              Find Our Sanctuary
            </h2>
            <p className="text-lg text-green-600">
              Located in the heart of the wellness district, our center is easily accessible 
              and surrounded by peaceful energy.
            </p>
          </div>
          
          <div className="bg-green-100 rounded-3xl h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-green-800 text-xl mb-2">
                Interactive Map Coming Soon
              </h3>
              <p className="text-green-600">
                123 Serenity Lane, Wellness District<br/>
                Peaceful City, PC 12345
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
