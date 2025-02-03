import { defineEventHandler } from 'h3';

const destinations = [
  { id: 1, title: 'Paris', description: 'City of Love', image: '/assets/images/a8.jpg' },
  { id: 2, title: 'Dubai', description: 'A dazzling fusion of modern architecture.', image: '/assets/images/a9.jpg', },
  { id: 3, title: 'Tokyo', description: 'Vibrant Metropolis', image: '/assets/images/a10.jpg', },
];

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  if (query.q) {
    return destinations.filter((dest) =>
      dest.title.toLowerCase().includes(query.q.toLowerCase())
    );
  }
  return destinations;
});