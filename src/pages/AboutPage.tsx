import React from "react";

const categories = [
  {
    title: "Personal Stories",
    description: "Share your thoughts, journeys, and life experiences.",
    image:
      "https://thewritelife.com/wp-content/uploads/2019/10/personal-narrative-examples.jpg",
  },
  {
    title: "Technology & AI",
    description: "Write about innovations, coding, and emerging tech trends.",
    image:
      "https://www.shutterstock.com/image-photo/ai-tech-businessman-show-virtual-600nw-2253228203.jpg",
  },
  {
    title: "Art & Culture",
    description: "Explore creativity, literature, music, and more.",
    image: "https://media.sciencephoto.com/f0/24/24/07/f0242407-800px-wm.jpg",
  },
  {
    title: "Health & Wellness",
    description: "Tips, journeys, and insights on living a balanced life.",
    image:
      "https://appinventiv.com/wp-content/uploads/2021/07/wellness-industry-future.png",
  },
  {
    title: "Education & Career",
    description:
      "Guides, tips, and resources to learn and grow professionally.",
    image:
      "https://www.pandasecurity.com/en/mediacenter/src/uploads/2016/07/schoolchildren-using-mobile-phone-at-classroom.jpg",
  },
  {
    title: "Environment & Society",
    description: "Thoughts and research on global change and awareness.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTas32UhE8WdNqg_AqXyOVbcoT16cHqtZ6VjA&s",
  },
];

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white text-gray-800 font-sans">
      {/* Header */}
      <div className="bg-[#EAF0FF] py-20 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4 text-black">About WriteVerse</h1>
        <p className="text-lg max-w-2xl mx-auto">
          WriteVerse is a welcoming space for writers and readers to connect,
          share, and grow. Whether you're penning your first story or exploring
          new ideas, you're home here.
        </p>
      </div>

      {/* Vision Section */}
      <div className="py-16 px-6 md:px-20 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-4 text-black">
              Our Vision
            </h2>
            <p className="text-gray-600 text-lg">
              We believe everyone has a story worth telling. Our mission is to
              empower creators by providing them with an intuitive platform,
              supportive community, and tools to amplify their voices.
            </p>
          </div>
          <img
            src="https://imageio.forbes.com/specials-images/imageserve/5dcdc6972c886a0007ec25f0/African-American-woman-standing-and-talking-at-briefing/960x0.jpg?format=jpg&width=960"
            alt="Vision"
            className="w-full rounded-lg shadow-md"
          />
        </div>
      </div>

      {/* Category Cards Section */}
      <div className="bg-gray-50 py-20 px-6 md:px-20">
        <div className="max-w-7xl mx-auto text-center mb-10">
          <h2 className="text-3xl font-bold mb-4 text-black">
            What People Write About
          </h2>
          <p className="text-gray-600 text-lg">
            Explore popular categories our community loves to write about.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md transform hover:scale-105 transition duration-300 cursor-pointer"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-black">
                  {cat.title}
                </h3>
                <p className="text-gray-600 text-sm">{cat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community Section */}
      <div className="bg-gray-50 py-16 px-6 md:px-20">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <img
            src="https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/2d/da/d7/a5/e4/v1_E11/E115NBH5.JPG?w=500&cf_fit=scale-down&mark-alpha=18&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark4.png&q=85&format=auto&s=8a4546c4c013cc8a47af3f352bc37c1c68683ee282a4d1d924c153c1c5da2bf8"
            alt="Community"
            className="w-full rounded-lg shadow-md"
          />
          <div>
            <h2 className="text-3xl font-semibold mb-4 text-black">
              Community First
            </h2>
            <p className="text-gray-600 text-lg">
              From thoughtful writers to engaged readers, our platform thrives
              on meaningful connections. You’ll find inspiration, feedback, and
              a sense of belonging with every interaction.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-[#EAF0FF] py-16 text-center px-4">
        <h2 className="text-3xl font-bold mb-4 text-black">
          Join the WriteVerse Journey
        </h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Start writing, connect with readers, and become part of something
          creative and powerful. Your words matter.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default AboutPage;
