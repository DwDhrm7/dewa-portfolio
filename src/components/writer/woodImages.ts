// Unsplash photos (Unsplash License), resolved from their /download redirects.
const unsplash = (id: string, w = 2000) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

export const woodImages = {
  // Walnut bookshelves in a dim room
  library: unsplash("1750040970096-31907e42d6a5"),
  // Lamp, typewriter, leather-bound books
  study: unsplash("1681301865120-7c74657dc01a"),
  // Typewriter and notebook on a dark desk
  desk: unsplash("1752137666154-34d38ba92dd7"),
};
