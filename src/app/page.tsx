


export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* <AviatorGame/> */}
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-600">Zero Fm</h1>
          <nav>
            <a href="#" className="text-gray-600 hover:text-blue-600 mx-4">Home</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 mx-4">Projects</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 mx-4">About</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 mx-4">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-600 text-white">
        <div className="container mx-auto px-6 py-16 text-center">
          <h2 className="text-4xl font-bold mb-4">Bring Your Ideas to Life</h2>
          <p className="text-xl mb-8">Fund your project with the power of the crowd.</p>
          <a href="#" className="bg-white text-blue-600 px-8 py-3 font-semibold rounded-full shadow-lg hover:bg-gray-200">Get Started</a>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white">
        <div className="container mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm2 0v10h12V5H4zm1 2h2v2H5V7zm0 3h2v2H5v-2zm3-3h2v2H8V7zm0 3h2v2H8v-2zm3-3h2v2h-2V7zm0 3h2v2h-2v-2zm3-3h2v2h-2V7zm0 3h2v2h-2v-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Create a Project</h3>
              <p className="text-gray-600">Sign up and create your fundraising project with ease.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M12.293 9.293a1 1 0 011.414 0L16 11.586V4a1 1 0 10-2 0v6.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 10-1.414-1.414L12 11.586 9.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 10-1.414-1.414L12 11.586 9.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 10-1.414-1.414L12 11.586 9.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 10-1.414-1.414L12 11.586 9.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 10-1.414-1.414L12 11.586 9.707 9.293z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Share Your Story</h3>
              <p className="text-gray-600">Tell the world about your project and attract backers.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17 9V7H9v2H7v6h2v2h8v-2h2V9h-2zM9 11h2v2H9v-2zm4 2h2v-2h-2v2zM9 9h2V7H9v2zm4-2h2v2h-2V7zM7 9v2h2V9H7zm0 4h2v2H7v-2zm8-2h2v2h-2v-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Reach Your Goal</h3>
              <p className="text-gray-600">Raise funds and turn your ideas into reality.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
  <div className="container mx-auto px-6 py-16">
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">How It Works</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="text-center">
        <div className="bg-blue-100 text-blue-600 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm2 0v10h12V5H4zm1 2h2v2H5V7zm0 3h2v2H5v-2zm3-3h2v2H8V7zm0 3h2v2H8v-2zm3-3h2v2h-2V7zm0 3h2v2h-2v-2zm3-3h2v2h-2V7zm0 3h2v2h-2v-2z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Create a Project</h3>
        <p className="text-gray-600">Sign up and create your fundraising project with ease.</p>
      </div>
      <div className="text-center">
        <div className="bg-blue-100 text-blue-600 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path d="M12.293 9.293a1 1 0 011.414 0L16 11.586V4a1 1 0 10-2 0v6.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 10-1.414-1.414L12 11.586 9.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 10-1.414-1.414L12 11.586 9.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Share Your Story</h3>
        <p className="text-gray-600">Tell the world about your project and attract backers.</p>
      </div>
      <div className="text-center">
        <div className="bg-blue-100 text-blue-600 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17 9V7H9v2H7v6h2v2h8v-2h2V9h-2zM9 11h2v2H9v-2zm4 2h2v-2h-2v2zM9 9h2V7H9v2zm4-2h2v2h-2V7zM7 9v2h2V9H7zm0 4h2v2H7v-2zm8-2h2v2h-2v-2z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Reach Your Goal</h3>
        <p className="text-gray-600">Raise funds and turn your ideas into reality.</p>
      </div>
    </div>
  </div>
</section>
<section className="bg-gray-50 py-16">
  <div className="container mx-auto px-6 text-center">
    <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Features</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="bg-blue-600 text-white w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 3a1 1 0 000 2h14a1 1 0 100-2H3zM4 7a1 1 0 100 2h12a1 1 0 100-2H4zm-1 5a1 1 0 100 2h14a1 1 0 100-2H3zm1 4a1 1 0 100 2h12a1 1 0 100-2H4z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">User-Friendly</h3>
        <p className="text-gray-600">Easy to navigate and use for all types of users.</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="bg-blue-600 text-white w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 3a1 1 0 100 2h12a1 1 0 100-2H4zm1 4a1 1 0 000 2h10a1 1 0 000-2H5zm-1 5a1 1 0 000 2h12a1 1 0 000-2H4zm0 4a1 1 0 100 2h10a1 1 0 000-2H4z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Customizable</h3>
        <p className="text-gray-600">Tailor the platform to fit your needs.</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="bg-blue-600 text-white w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 4a1 1 0 011-1h10a1 1 0 011 1v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm10 2H6v6h8V6zm0 8H6v2h8v-2z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure</h3>
        <p className="text-gray-600">Your data is protected with top-notch security.</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="bg-blue-600 text-white w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 3a1 1 0 100 2h2a1 1 0 100-2H9zm2 2h2a1 1 0 000-2h-2a1 1 0 100 2zM3 8a1 1 0 011-1h10a1 1 0 110 2H4a1 1 0 01-1-1zM2 11a1 1 0 011-1h14a1 1 0 100-2H3a1 1 0 100 2h14a1 1 0 100 2H3a1 1 0 100 2h14a1 1 0 100-2H3a1 1 0 100 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Responsive</h3>
        <p className="text-gray-600">Optimized for all devices, big and small.</p>
      </div>
    </div>
  </div>
</section>


      {/* Featured Projects */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Project Card */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src="https://via.placeholder.com/400x200" alt="Project" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Project Title</h3>
              <p className="text-gray-600 mb-4">A brief description of the project.</p>
              <a href="#" className="text-blue-600 hover:underline">Learn More</a>
            </div>
          </div>
          {/* Repeat the above Project Card for more projects */}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-100">
        <div className="container mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">What People Are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial Card */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <p className="text-gray-600 mb-4">This platform helped me turn my idea into a reality. I couldn&ldquo;t have done it without the support from the community!</p>
              <h3 className="text-lg font-semibold text-gray-800">Jane Doe</h3>
              <p className="text-gray-500 text-sm">Founder, Project A</p>
            </div>
            {/* Repeat for more testimonials */}
            
          </div>
        </div>
      </section>
      <section className="bg-gray-100">
  <div className="container mx-auto px-6 py-16">
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">What People Are Saying</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <p className="text-gray-600 mb-4">This platform helped me turn my idea into a reality. I couldn&lsquo;t have done it without the support from the community!</p>
        <h3 className="text-lg font-semibold text-gray-800">Jane Doe</h3>
        <p className="text-gray-500 text-sm">Founder, Project A</p>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <p className="text-gray-600 mb-4">An amazing platform that connected me with thousands of backers. I highly recommend it.</p>
        <h3 className="text-lg font-semibold text-gray-800">John Smith</h3>
        <p className="text-gray-500 text-sm">Creator, Project B</p>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <p className="text-gray-600 mb-4">The best way to fund your dreams. A user-friendly platform with great results.</p>
        <h3 className="text-lg font-semibold text-gray-800">Emily Johnson</h3>
        <p className="text-gray-500 text-sm">Founder Project C</p>
      </div>
    </div>
  </div>
</section>
<section className="bg-white py-16">
  <div className="container mx-auto px-6 text-center">
    <h2 className="text-3xl font-bold text-gray-800 mb-8">Pricing Plans</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Basic</h3>
        <p className="text-gray-600 mb-8">$10 / month</p>
        <ul className="text-gray-600 mb-8">
          <li className="mb-2">Feature 1</li>
          <li className="mb-2">Feature 2</li>
          <li className="mb-2">Feature 3</li>
        </ul>
        <a href="#" className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700">Choose Plan</a>
      </div>
      <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Standard</h3>
        <p className="mb-8">$20 / month</p>
        <ul className="mb-8">
          <li className="mb-2">Feature 1</li>
          <li className="mb-2">Feature 2</li>
          <li className="mb-2">Feature 3</li>
          <li className="mb-2">Feature 4</li>
        </ul>
        <a href="#" className="bg-white text-blue-600 px-6 py-2 rounded-full hover:bg-gray-100">Choose Plan</a>
      </div>
      <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Premium</h3>
        <p className="text-gray-600 mb-8">$30 / month</p>
        <ul className="text-gray-600 mb-8">
          <li className="mb-2">Feature 1</li>
          <li className="mb-2">Feature 2</li>
          <li className="mb-2">Feature 3</li>
          <li className="mb-2">Feature 4</li>
          <li className="mb-2">Feature 5</li>
        </ul>
        <a href="#" className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700">Choose Plan</a>
      </div>
    </div>
  </div>
</section>


      {/* Call to Action Section */}
      <section className="bg-blue-600 text-white">
        <div className="container mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Own Project?</h2>
          <p className="text-xl mb-8">Join us today and bring your ideas to life.</p>
          <a href="#" className="bg-white text-blue-600 px-8 py-3 font-semibold rounded-full shadow-lg hover:bg-gray-200">Get Started</a>
        </div>
      </section>
      <section className="bg-blue-600 py-16">
  <div className="container mx-auto px-6 text-center text-white">
    <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
    <p className="text-xl mb-8">Subscribe to our newsletter and never miss an update.</p>
    <div className="flex justify-center">
      <input
        type="email"
        placeholder="Enter your email"
        className="p-3 rounded-l-lg text-gray-700 w-2/3 md:w-1/3"
      />
      <button className="bg-white text-blue-600 px-6 py-3 rounded-r-lg font-semibold hover:bg-gray-200">
        Subscribe
      </button>
    </div>
  </div>
</section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-6 py-8 text-center">
          <p className="text-sm">&copy; 2024 CrowdFund. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
