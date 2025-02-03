// server/api/destination.ts
import { defineEventHandler, getQuery } from 'h3';

const destinations = [
  { id: 1, title: 'Paris', description: 'City of Love', images: [
      '/assets/images/a1.jpg',
      '/assets/images/a2.jpg',
      '/assets/images/a3.jpg'
    ] 
  },
  { id: 2, title: 'Dubai', description: 'The Big Apple', images: [
      '/assets/images/a4.jpg',
      '/assets/images/a5.jpg',
      '/assets/images/a6.jpg'
    ] 
  },
  { id: 3, title: 'Tokyo', description: 'Vibrant Metropolis', images: [
      '/assets/images/a7.jpg',
      '/assets/images/a8.jpg',
      '/assets/images/a9.jpg'
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
