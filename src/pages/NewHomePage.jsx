import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Sidebar from '../components/Sidebar';

const NewHomePage = () => {
  const features = [
    {
      title: 'Community Engagement',
      description: 'Building stronger connections between government and the people we serve through transparent communication and regular town halls.',
      image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      link: '/programs/community-support'
    },
    {
      title: 'Policy Innovation',
      description: 'Developing forward-thinking solutions to address the challenges facing Colorado District 2 today and tomorrow.',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      link: '/about/mission'
    },
    {
      title: 'Civic Education',
      description: 'Empowering citizens with knowledge and resources to participate fully in the democratic process.',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      link: '/resources'
    }
  ];

  const recentNews = [
    {
      title: 'Expanding Healthcare Access in Rural Communities',
      date: 'March 15, 2024',
      excerpt: 'New initiative aims to bring essential healthcare services to underserved areas of Colorado District 2.',
      link: '/media/news/healthcare-access'
    },
    {
      title: 'Infrastructure Investment Update',
      date: 'March 10, 2024',
      excerpt: 'Progress report on road improvements and broadband expansion projects across the district.',
      link: '/media/news/infrastructure-update'
    },
    {
      title: 'Youth Leadership Program Launch',
      date: 'March 5, 2024',
      excerpt: 'Introducing opportunities for young people to engage in civic leadership and community service.',
      link: '/media/news/youth-leadership'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <Hero />

      {/* Main Content */}
      <div className="py-16 bg-white">
        <div className="container-custom">
          <div className="lg:grid lg:grid-cols-3 lg:gap-12">
            {/* Main Content Column */}
            <div className="lg:col-span-2">

              {/* Introduction Section */}
              <section className="mb-16">
                <h2 className="text-3xl font-heading font-bold text-navy mb-6">
                  Welcome to Our Community
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We are committed to serving the people of Colorado District 2 with integrity,
                    transparency, and dedication. Our mission is to build stronger communities through
                    effective governance, inclusive policies, and meaningful engagement with constituents.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    From Boulder to the Eastern Plains, we work every day to ensure that every voice
                    is heard and every community has the resources it needs to thrive. Together, we
                    can build a brighter future for all Coloradans.
                  </p>
                </div>
              </section>

              {/* Key Features Grid */}
              <section className="mb-16">
                <h2 className="text-3xl font-heading font-bold text-navy mb-8 text-center">
                  Our Core Values
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {features.map((feature, index) => (
                    <div key={index} className="card group hover:shadow-lg transition-shadow duration-200">
                      <div className="aspect-w-16 aspect-h-9 mb-4">
                        <img
                          src={feature.image}
                          alt={feature.title}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                      <h3 className="text-xl font-heading font-bold text-navy mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {feature.description}
                      </p>
                      <Link
                        to={feature.link}
                        className="text-accent-blue hover:text-blue-700 font-medium transition-colors duration-200 group-hover:underline"
                      >
                        Learn More →
                      </Link>
                    </div>
                  ))}
                </div>
              </section>

              {/* Recent News Section */}
              <section className="mb-16">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-heading font-bold text-navy">
                    Latest Updates
                  </h2>
                  <Link
                    to="/media/news"
                    className="text-accent-blue hover:text-blue-700 font-medium transition-colors duration-200"
                  >
                    View All News →
                  </Link>
                </div>

                <div className="space-y-6">
                  {recentNews.map((article, index) => (
                    <article key={index} className="card hover:shadow-lg transition-shadow duration-200">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-heading font-bold text-navy">
                          <Link
                            to={article.link}
                            className="hover:text-accent-blue transition-colors duration-200"
                          >
                            {article.title}
                          </Link>
                        </h3>
                        <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                          {article.date}
                        </span>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </article>
                  ))}
                </div>
              </section>

              {/* Call to Action */}
              <section className="text-center py-12 bg-light-gray rounded-xl">
                <h2 className="text-3xl font-heading font-bold text-navy mb-4">
                  Ready to Get Involved?
                </h2>
                <p className="text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Your voice matters. Join us in building a stronger, more inclusive community
                  for all residents of Colorado District 2.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/contact"
                    className="btn-primary"
                  >
                    Contact Our Office
                  </Link>
                  <Link
                    to="/programs/volunteering"
                    className="btn-secondary"
                  >
                    Volunteer Opportunities
                  </Link>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="mt-16 lg:mt-0">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewHomePage;