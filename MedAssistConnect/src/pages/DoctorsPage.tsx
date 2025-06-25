import React, { useState } from 'react';
import { MessageCircle, Calendar, Star, Award, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  experience: string;
  rating: number;
  image: string;
  isRetired: boolean;
  description: string;
  location: string;
}

const mockDoctors: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiology',
    experience: 'Practicing – 3 years',
    rating: 4.8,
    image: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=400',
    isRetired: false,
    description: 'Specialized in preventive cardiology and heart disease management.',
    location: 'New York, NY'
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialization: 'Pediatrics',
    experience: 'Practicing – 2 years',
    rating: 4.9,
    image: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=400',
    isRetired: false,
    description: 'Passionate about child healthcare and developmental pediatrics.',
    location: 'Los Angeles, CA'
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    specialization: 'Dermatology',
    experience: 'Practicing – 4 years',
    rating: 4.7,
    image: 'https://images.pexels.com/photos/5327904/pexels-photo-5327904.jpeg?auto=compress&cs=tinysrgb&w=400',
    isRetired: false,
    description: 'Expert in cosmetic and medical dermatology treatments.',
    location: 'Miami, FL'
  },
  {
    id: 4,
    name: 'Dr. Robert Thompson',
    specialization: 'Internal Medicine',
    experience: 'Retired – 35 years',
    rating: 4.9,
    image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
    isRetired: true,
    description: 'Former Chief of Internal Medicine with decades of experience.',
    location: 'Boston, MA'
  },
  {
    id: 5,
    name: 'Dr. Margaret Davis',
    specialization: 'Gynecology',
    experience: 'Retired – 28 years',
    rating: 4.8,
    image: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400',
    isRetired: true,
    description: 'Specialized in women\'s health and reproductive medicine.',
    location: 'Chicago, IL'
  },
  {
    id: 6,
    name: 'Dr. James Wilson',
    specialization: 'Orthopedics',
    experience: 'Retired – 42 years',
    rating: 4.9,
    image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400',
    isRetired: true,
    description: 'Renowned orthopedic surgeon with expertise in joint replacement.',
    location: 'Seattle, WA'
  }
];

export const DoctorsPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'young' | 'retired'>('all');

  const filteredDoctors = mockDoctors.filter(doctor => {
    if (filter === 'young') return !doctor.isRetired;
    if (filter === 'retired') return doctor.isRetired;
    return true;
  });

  const DoctorCard: React.FC<{ doctor: Doctor }> = ({ doctor }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
      <div className="relative">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-48 object-cover"
        />
        {doctor.isRetired && (
          <div className="absolute top-4 right-4 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium flex items-center">
            <Award className="h-4 w-4 mr-1" />
            Retired Expert
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{doctor.name}</h3>
        <p className="text-sky-600 font-semibold mb-2">{doctor.specialization}</p>
        
        <div className="flex items-center mb-3">
          <Clock className="h-4 w-4 text-gray-500 mr-2" />
          <span className="text-gray-600 text-sm">{doctor.experience}</span>
        </div>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(doctor.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="ml-2 text-gray-600 text-sm">({doctor.rating})</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4">{doctor.description}</p>
        <p className="text-gray-500 text-sm mb-4">{doctor.location}</p>
        
        <div className="flex space-x-2">
          <button className="flex-1 bg-sky-500 hover:bg-sky-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center">
            <MessageCircle className="h-4 w-4 mr-2" />
            Message
          </button>
          <Link
            to="/appointments"
            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Book
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Doctor</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with experienced young doctors and retired specialists who care about your health
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              filter === 'all'
                ? 'bg-sky-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            All Doctors
          </button>
          <button
            onClick={() => setFilter('young')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              filter === 'young'
                ? 'bg-emerald-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Young Doctors
          </button>
          <button
            onClick={() => setFilter('retired')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              filter === 'retired'
                ? 'bg-purple-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Retired Doctors
          </button>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.map(doctor => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No doctors found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};