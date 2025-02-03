// server/api/destination.ts
import { defineEventHandler, getQuery } from 'h3';

const destinations = [
  { id: 1, title: 'Paris', description: 'City of Love', images: [
      '/assets/images/a1.jpg',
      '/assets/images/a2.jpg',
      '/assets/images/a3.jpg'
    ] 
  },
  { id: 2, title: 'New York', description: 'The Big Apple', images: [
      '/assets/images/a4.jpg',
      '/assets/images/a5.jpg',
      '/assets/images/a6.jpg'
    ] 
  },
  { id: 3, title: 'Tokyo', description: 'Vibrant Metropolis', images: [
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=500',
      'https://images.unsplash.com/photo-1521318291230-cd4a6b5f3146?w=500',
      'https://images.unsplash.com/photo-1494499486952-786d09a7c6b5?w=500'
    ] 
  },
];

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  if (query.q) {
    // Search the destinations for a match
    const filteredDestinations = destinations.filter(dest =>
      dest.title.toLowerCase().includes(query.q.toLowerCase())
    );


    // If we find matching destinations, return their images
    if (filteredDestinations.length) {
      return filteredDestinations.map(dest => ({
        title: dest.title,
        description: dest.description,
        images: dest.images.slice(0, 4),  // Limit to 4 images
      }));
    } else {
      return { message: 'No destinations found.' };
    }

  }
  // If no query is passed, return all destinations
  return destinations;
});
