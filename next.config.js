/** @type {import('next').NextConfig} */
module.exports = {
    images: {
      formats: ["image/avif", "image/webp"],
      remotePatterns: [
        {
          protocol: "https",
          hostname: "lh3.googleusercontent.com",
          port: "",
          pathname: "/a/**",
        },
      ],
    },
  };