// Centralized image data for better management and lazy loading
// Images are ordered by priority - most important first
export const baseArtworkImages = [
  "https://i.ibb.co/WvDdnrrp/ba50688142d1.jpg",
  "https://i.ibb.co/kgs0nvH0/b663bb4fcdd5.jpg", 
  "https://i.ibb.co/1tfb4qTq/1753870691007.jpg",
  "https://i.ibb.co/hRF9fSgq/IMG-20250710-133728.jpg",
  "https://i.ibb.co/5g7k8VTJ/4ae89184da7e.jpg",
  "https://i.ibb.co/tM7Z9mXc/4ee7930e6f86.jpg",
  "https://i.ibb.co/HLdJDyP2/770cb2e47d9d.jpg",
  "https://i.ibb.co/TqvgmCQL/eb8f3507b6a6.jpg",
  "https://i.ibb.co/hJZLG60Z/c64f6f4adcec.jpg",
  "https://i.ibb.co/67YkzZH5/1000077583.jpg",
  "https://i.ibb.co/GQT1152P/1000076355.jpg",
  "https://i.ibb.co/wN8gm9Zh/1000077393.jpg",
  "https://i.ibb.co/Y7MkyNRm/Screenshot-20250710-193546.png",
  "https://i.ibb.co/mF6VsCY5/96f7ff59210a.png",
  "https://i.ibb.co/cc5kPhJf/bbbe857c0f6f.png"
];

// Critical images that should be preloaded
export const criticalImages = [
  baseArtworkImages[0], // First artwork image
  heroBackgroundImage
];

export const reviewImages = [
  "https://i.ibb.co/LXMnjMLz/IMG-20250915-171938-11zon.jpg",
  "https://i.ibb.co/hxqkWzyk/IMG-20250915-132944-11zon.jpg",
  "https://i.ibb.co/b5WmDsgm/IMG-20250915-133022-11zon.jpg",
  "https://i.ibb.co/qLYnPNPD/IMG-20250915-130155-11zon.jpg",
  "https://i.ibb.co/fYJz2x2j/IMG-20250915-132857-11zon.jpg",
  "https://i.ibb.co/67Fh2bGj/IMG-20250915-130115-11zon.jpg",
  "https://i.ibb.co/wFPN7RDg/Screenshot-2025-09-16-13-58-31-33-6012fa4d4ddec268fc5c7112cbb265e7-11zon.jpg"
];

export const prizeDistributionImages = [
  "https://i.ibb.co/GvxDtkMB/IMG-20250914-WA0061-1-11zon.jpg",
  "https://i.ibb.co/dsLXSzc5/IMG-20250914-WA0034-11zon.jpg",
  "https://i.ibb.co/6Jf9VgW9/IMG-20250914-WA0065-11zon.jpg",
  "https://i.ibb.co/gFjJ0nrD/IMG-20250915-133301-11zon.jpg",
  "https://i.ibb.co/hFtJFDNM/IMG-20250914-WA0024-11zon.jpg",
  "https://i.ibb.co/PRq5Y0T/IMG-20250914-WA0028-11zon.jpg",
  "https://i.ibb.co/RxbjbPt/IMG-20250914-WA0026-11zon-2.jpg"
];

// Preload only the hero background image for faster initial render
export const heroBackgroundImage = "https://i.ibb.co/fz9nV0sg/4fe133328b5c.jpg";