// Blinko Web Site Customization Settings
// Edit this file to update APK download links, statistics counters, and founder profiles.

export const CONFIG = {
  // App Download Links
  downloads: {
    customer: {
      apkUrl: "https://phochhcgggsbczfytyuw.supabase.co/storage/v1/object/public/apks/blinko-customer.apk", // Served from Supabase Storage
      playStoreUrl: "#" // Replace with real Google Play Store link for customer
    },
    vendor: {
      apkUrl: "https://phochhcgggsbczfytyuw.supabase.co/storage/v1/object/public/apks/blinko-vendor.apk", // Served from Supabase Storage
      playStoreUrl: "#" // Replace with real Google Play Store link for vendor
    },
    delivery: {
      apkUrl: "https://phochhcgggsbczfytyuw.supabase.co/storage/v1/object/public/apks/blinko-delivery.apk", // Served from Supabase Storage
      playStoreUrl: "#" // Replace with real Google Play Store link for delivery
    }
  },

  // Business Performance Statistics
  stats: {
    vendors: "20+",
    cities: "10+",
    ordersDelivered: "100+"
  },

  // Founder Information
  founder: {
    name: "Trinayan Mahanta",
    photoUrl: "/assets/ceo.jpeg",
    title: "Founder & CEO, Blinko",
    bio: "Passionate entrepreneur committed to revolutionizing hyperlocal trade in India. Built Blinko from the ground up to empower local neighborhood stores and bring seamless delivery to millions of families across the nation.",
    quote: "Our mission is simple: to make local retail instant, reliable, and rewarding for vendors and consumers alike."
  }
};
