import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, Heart, Eye, Filter, Sparkles, Leaf } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const WellnessAccessories = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [accessories] = useState([
    {
      id: 1,
      name: "Aura Spray",
      category: "aura-clearing",
      price: "₹600",
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwzfHxzcGlyaXR1YWx8ZW58MHx8fHwxNzU5NjQ4NzIxfDA&ixlib=rb-4.1.0&q=85",
      description: "An instant mist to clear stagnant, low-vibrational energy from your personal space and aura.",
      rating: 4.9,
      reviews: 142,
      inStock: true
    },
    {
      id: 2,
      name: "Chakra Healing Crystal Set",
      category: "crystals",
      price: "$89.99",
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwzfHxzcGlyaXR1YWx8ZW58MHx8fHwxNzU5NjQ4NzIxfDA&ixlib=rb-4.1.0&q=85",
      description: "Complete set of 7 chakra stones for energy alignment and healing.",
      rating: 4.8,
      reviews: 156,
      inStock: true
    },
    {
      id: 3,
      name: "Meditation Cushion & Mat Set",
      category: "meditation",
      price: "$125.00",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwxfHx5b2dhfGVufDB8fHx8MTc1OTY0ODc0Nnww&ixlib=rb-4.1.0&q=85",
      description: "Comfortable meditation set for deeper spiritual practice.",
      rating: 4.9,
      reviews: 89,
      inStock: true
    },
    {
      id: 4,
      name: "Essential Oil Diffuser",
      category: "aromatherapy",
      price: "$65.00",
      image: "https://images.pexels.com/photos/917732/pexels-photo-917732.jpeg",
      description: "Ultrasonic aromatherapy diffuser for creating sacred spaces.",
      rating: 4.7,
      reviews: 203,
      inStock: true
    },
    {
      id: 5,
      name: "Singing Bowl Set",
      category: "sound-healing",
      price: "$145.00",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwyfHx5b2dhfGVufDB8fHx8MTc1OTY0ODc0Nnww&ixlib=rb-4.1.0&q=85",
      description: "Handcrafted Tibetan singing bowls for sound healing sessions.",
      rating: 5.0,
      reviews: 67,
      inStock: false
    },
    {
      id: 6,
      name: "Yoga & Meditation Bundle",
      category: "meditation",
      price: "$199.99",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwxfHx5b2dhfGVufDB8fHx8MTc1OTY0ODc0Nnww&ixlib=rb-4.1.0&q=85",
      description: "Complete yoga and meditation kit for home practice.",
      rating: 4.6,
      reviews: 124,
      inStock: true
    },
    {
      id: 7,
      name: "Sage & Palo Santo Kit",
      category: "cleansing",
      price: "$35.00",
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwzfHxzcGlyaXR1YWx8ZW58MHx8fHwxNzU5NjQ4NzIxfDA&ixlib=rb-4.1.0&q=85",
      description: "Sacred cleansing bundle for purifying spaces and energy.",
      rating: 4.4,
      reviews: 78,
      inStock: true
    }
  ]);

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'crystals', label: 'Crystals & Stones' },
    { value: 'meditation', label: 'Meditation' },
    { value: 'aromatherapy', label: 'Aromatherapy' },
    { value: 'sound-healing', label: 'Sound Healing' },
    { value: 'cleansing', label: 'Space Cleansing' }
  ];

  const filteredAccessories = selectedCategory === 'all' 
    ? accessories 
    : accessories.filter(item => item.category === selectedCategory);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`} 
      />
    ));
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section 
        className="relative py-32 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(45, 87, 57, 0.85) 0%, rgba(74, 124, 89, 0.75) 100%), url('https://images.unsplash.com/photo-1518495973542-4542c06a5843?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwzfHxzcGlyaXR1YWx8ZW58MHx8fHwxNzU5NjQ4NzIxfDA&ixlib=rb-4.1.0&q=85')`
        }}
        data-testid="wellness-accessories-hero"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading font-bold text-5xl md:text-6xl text-white mb-6 fade-in">
            Wellness 
            <span className="bg-gradient-to-r from-green-200 to-green-100 bg-clip-text text-transparent">
              Accessories
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed slide-up">
            Sacred tools and accessories to support your spiritual journey and enhance 
            your healing practices at home.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="section-padding-sm bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
            <div className="mb-4 sm:mb-0">
              <h2 className="font-heading font-bold text-2xl text-green-800">Our Collection</h2>
              <p className="text-green-600">Curated accessories for your spiritual practice</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-green-600" />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAccessories.map((item) => (
              <Card 
                key={item.id} 
                className="card group hover:scale-105 transition-all duration-300 overflow-hidden"
                data-testid={`accessory-${item.id}`}
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <button className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-300">
                        <Heart className="w-5 h-5 text-green-600" />
                      </button>
                    </div>
                    {!item.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-3">
                      <h3 className="font-heading font-semibold text-xl text-green-800 mb-2 group-hover:text-green-700 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-green-600 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          {renderStars(item.rating)}
                        </div>
                        <span className="text-sm text-green-600">
                          ({item.reviews} reviews)
                        </span>
                      </div>
                      <span className="font-bold text-xl text-green-800">
                        {item.price}
                      </span>
                    </div>
                    
                    <div className="flex space-x-3">
                      <Button 
                        className={`flex-1 font-semibold transition-all duration-300 ${
                          item.inStock 
                            ? 'bg-green-600 hover:bg-green-700 text-white' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        disabled={!item.inStock}
                        data-testid={`add-to-cart-${item.id}`}
                      >
                        <ShoppingBag className="mr-2 w-4 h-4" />
                        {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="px-4 border-green-600 text-green-600 hover:bg-green-50"
                        data-testid={`quick-view-${item.id}`}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-4xl text-green-800 mb-6">
              Shop by Category
            </h2>
            <p className="text-lg text-green-600 max-w-2xl mx-auto">
              Explore our carefully curated collections designed to support different aspects 
              of your spiritual and wellness journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {categories.slice(1, 4).map((category, index) => (
              <Card 
                key={category.value}
                className="card group cursor-pointer hover:scale-105 transition-all duration-300"
                onClick={() => setSelectedCategory(category.value)}
                data-testid={`category-${category.value}`}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300">
                    {index === 0 && <Sparkles className="w-8 h-8 text-green-600" />}
                    {index === 1 && <Heart className="w-8 h-8 text-green-600" />}
                    {index === 2 && <Leaf className="w-8 h-8 text-green-600" />}
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-green-800 mb-3">
                    {category.label}
                  </h3>
                  <p className="text-green-600 mb-4">
                    {index === 0 && "Healing crystals and gemstones for energy work"}
                    {index === 1 && "Tools for deeper meditation and mindfulness"}
                    {index === 2 && "Essential oils and diffusers for sacred spaces"}
                  </p>
                  <Button 
                    variant="outline" 
                    className="border-green-600 text-green-600 hover:bg-green-50"
                  >
                    Explore Collection
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-padding bg-gradient-to-r from-green-800 to-green-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-4xl text-white mb-6">
            Stay Connected
          </h2>
          <p className="text-xl text-green-100 mb-8 leading-relaxed">
            Get updates on new arrivals, spiritual practices, and exclusive offers 
            for our wellness community.
          </p>
          <Link to="/contact">
            <Button 
              size="lg" 
              className="bg-white text-green-800 hover:bg-green-50 px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Join Our Community
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default WellnessAccessories;
