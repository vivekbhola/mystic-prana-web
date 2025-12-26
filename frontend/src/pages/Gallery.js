import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Calendar, MapPin } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const galleryImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwxfHx5b2dhfGVufDB8fHx8MTc1OTY0ODc0Nnww&ixlib=rb-4.1.0&q=85",
      category: "meditation",
      title: "Morning Meditation Session",
      description: "Peaceful morning meditation in our sanctuary space",
      date: "October 2024"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwyfHx5b2dhfGVufDB8fHx8MTc1OTY0ODc0Nnww&ixlib=rb-4.1.0&q=85",
      category: "healing",
      title: "Energy Healing Session",
      description: "Individual energy healing session with chakra balancing",
      date: "September 2024"
    },
    {
      id: 3,
      src: "https://images.pexels.com/photos/917732/pexels-photo-917732.jpeg",
      category: "community",
      title: "Group Healing Circle",
      description: "Community gathering for collective healing and support",
      date: "August 2024"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwzfHxzcGlyaXR1YWx8ZW58MHx8fHwxNzU5NjQ4NzIxfDA&ixlib=rb-4.1.0&q=85",
      category: "spiritual",
      title: "Sacred Space Ceremony",
      description: "Blessing ceremony for our new healing sanctuary",
      date: "July 2024"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwxfHx5b2dhfGVufDB8fHx8MTc1OTY0ODc0Nnww&ixlib=rb-4.1.0&q=85",
      category: "meditation",
      title: "Sunset Yoga Flow",
      description: "Evening yoga and meditation practice outdoors",
      date: "June 2024"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwyfHx5b2dhfGVufDB8fHx8MTc1OTY0ODc0Nnww&ixlib=rb-4.1.0&q=85",
      category: "healing",
      title: "Chakra Balancing Workshop",
      description: "Educational workshop on chakra alignment and healing",
      date: "May 2024"
    },
    {
      id: 7,
      src: "https://images.pexels.com/photos/917732/pexels-photo-917732.jpeg",
      category: "community",
      title: "Wellness Retreat Day",
      description: "Full day wellness retreat with meditation and healing",
      date: "April 2024"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwzfHxzcGlyaXR1YWx8ZW58MHx8fHwxNzU5NjQ4NzIxfDA&ixlib=rb-4.1.0&q=85",
      category: "spiritual",
      title: "Crystal Healing Ceremony",
      description: "Sacred ceremony using healing crystals and sound",
      date: "March 2024"
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwxfHx5b2dhfGVufDB8fHx8MTc1OTY0ODc0Nnww&ixlib=rb-4.1.0&q=85",
      category: "meditation",
      title: "Mindfulness Workshop",
      description: "Introduction to mindfulness and present moment awareness",
      date: "February 2024"
    }
  ];

  const categories = [
    { value: 'all', label: 'All Photos' },
    { value: 'meditation', label: 'Meditation' },
    { value: 'healing', label: 'Healing Sessions' },
    { value: 'community', label: 'Community' },
    { value: 'spiritual', label: 'Spiritual Ceremonies' }
  ];

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const navigate = (direction) => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1;
    }
    
    setSelectedImage(filteredImages[newIndex]);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section 
        className="relative py-32 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(45, 87, 57, 0.85) 0%, rgba(74, 124, 89, 0.75) 100%), url('https://images.unsplash.com/photo-1518495973542-4542c06a5843?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwzfHxzcGlyaXR1YWx8ZW58MHx8fHwxNzU5NjQ4NzIxfDA&ixlib=rb-4.1.0&q=85')`
        }}
        data-testid="gallery-hero-section"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading font-bold text-5xl md:text-6xl text-white mb-6 fade-in">
            Our 
            <span className="bg-gradient-to-r from-green-200 to-green-100 bg-clip-text text-transparent">
              Gallery
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed slide-up">
            Moments of transformation, healing, and spiritual connection captured 
            during our sessions and community gatherings.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="section-padding-sm bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-12">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  variant={selectedCategory === category.value ? "default" : "outline"}
                  className={`px-6 py-2 rounded-full transition-all duration-300 ${
                    selectedCategory === category.value
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'border-green-600 text-green-600 hover:bg-green-50'
                  }`}
                  data-testid={`category-filter-${category.value}`}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredImages.map((image, index) => (
              <Card 
                key={image.id}
                className="card group cursor-pointer hover:scale-105 transition-all duration-300 overflow-hidden"
                onClick={() => openModal(image)}
                data-testid={`gallery-image-${image.id}`}
              >
                <CardContent className="p-0 relative">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={image.src} 
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="font-heading font-semibold text-lg mb-2">
                        {image.title}
                      </h3>
                      <p className="text-sm text-green-100 mb-2">
                        {image.description}
                      </p>
                      <div className="flex items-center text-xs text-green-200">
                        <Calendar className="w-4 h-4 mr-1" />
                        {image.date}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-4xl text-green-800 mb-6">
              Our Journey in Numbers
            </h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300">
                <span className="text-3xl font-bold text-green-600">500+</span>
              </div>
              <h3 className="font-semibold text-green-800 mb-2">Healing Sessions</h3>
              <p className="text-green-600 text-sm">Individual & group sessions completed</p>
            </div>
            
            <div className="group">
              <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300">
                <span className="text-3xl font-bold text-green-600">150+</span>
              </div>
              <h3 className="font-semibold text-green-800 mb-2">Community Members</h3>
              <p className="text-green-600 text-sm">Active participants in our programs</p>
            </div>
            
            <div className="group">
              <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300">
                <span className="text-3xl font-bold text-green-600">50+</span>
              </div>
              <h3 className="font-semibold text-green-800 mb-2">Workshops Held</h3>
              <p className="text-green-600 text-sm">Educational and healing workshops</p>
            </div>
            
            <div className="group">
              <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300">
                <span className="text-3xl font-bold text-green-600">7+</span>
              </div>
              <h3 className="font-semibold text-green-800 mb-2">Years of Service</h3>
              <p className="text-green-600 text-sm">Dedicated to spiritual wellness</p>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
          data-testid="gallery-modal"
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-300"
              data-testid="close-modal"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate('prev');
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-300"
              data-testid="prev-image"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate('next');
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-300"
              data-testid="next-image"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
            
            <div className="bg-white rounded-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <img 
                src={selectedImage.src} 
                alt={selectedImage.title}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
              <div className="p-6">
                <h3 className="font-heading font-bold text-2xl text-green-800 mb-2">
                  {selectedImage.title}
                </h3>
                <p className="text-green-600 mb-4">
                  {selectedImage.description}
                </p>
                <div className="flex items-center text-sm text-green-500">
                  <Calendar className="w-4 h-4 mr-2" />
                  {selectedImage.date}
                  <MapPin className="w-4 h-4 ml-4 mr-2" />
                  Mystic Prana Healing Center
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
