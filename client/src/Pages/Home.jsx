import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  XCircle, 
  Server, 
  Code, 
  Database, 
  Terminal, 
  Globe, 
  ShieldCheck, 
  FileCheck, 
  Menu, 
  X 
} from 'lucide-react';
import { getServerStatus } from '@/services/api.services';


const Home = () => {
  const [serverStatus, setServerStatus] = useState({ status: 'checking', lastChecked: null });
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const checkServerStatus = async () => {
    setLoading(true);
    try {
      const status = await getServerStatus();
      if(status.success){
        setServerStatus({ status: 'online', lastChecked: new Date().toISOString() });
      } else {
        setServerStatus({ status: 'offline', lastChecked: new Date().toISOString() });
      }
    } catch (error) {
      setServerStatus({ status: 'error', lastChecked: new Date().toISOString() });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check status immediately on load
    checkServerStatus();
    
    // Set up interval to check every 10 minutes
    const interval = setInterval(checkServerStatus, 600000); // 10 minutes in milliseconds
    
    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const features = [
    { 
      name: 'Node.js & React.js', 
      description: 'Fully configured for both server and client-side development with optimized performance', 
      icon: <Code className="h-10 w-10" /> 
    },
    { 
      name: 'MongoDB', 
      description: 'Pre-configured database setup with scalable architecture for data management', 
      icon: <Database className="h-10 w-10" /> 
    },
    { 
      name: 'Docker & Docker Compose', 
      description: 'Simplified containerization and orchestration for consistent deployment', 
      icon: <Terminal className="h-10 w-10" /> 
    },
    { 
      name: 'ESLint & Prettier', 
      description: 'Ensures code quality, consistency and automatic formatting for clean codebase', 
      icon: <FileCheck className="h-10 w-10" /> 
    },
    { 
      name: 'Husky & Commitlint', 
      description: 'Git hooks and conventional commit messages for quality control', 
      icon: <ShieldCheck className="h-10 w-10" /> 
    },
    { 
      name: 'ShadCN UI', 
      description: 'Pre-configured for a modern and customizable UI experience with Tailwind CSS', 
      icon: <Globe className="h-10 w-10" /> 
    }
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-800 to-green-600 text-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <div className="bg-white p-2 rounded-full">
                <ShieldCheck className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Halal India</h1>
                <p className="text-green-100 text-sm">Accreditation Services</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-white hover:text-green-200 font-medium">Home</a>
              <a href="#" className="text-white hover:text-green-200 font-medium">Services</a>
              <a href="#" className="text-white hover:text-green-200 font-medium">About</a>
              <a href="#" className="text-white hover:text-green-200 font-medium">Contact</a>
            </nav>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={toggleMobileMenu}
                className="text-white focus:outline-none"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
            
            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <div className="absolute top-20 left-0 right-0 bg-green-700 shadow-md md:hidden z-50">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  <a href="#" className="block px-3 py-2 text-white hover:bg-green-600 rounded-md">Home</a>
                  <a href="#" className="block px-3 py-2 text-white hover:bg-green-600 rounded-md">Services</a>
                  <a href="#" className="block px-3 py-2 text-white hover:bg-green-600 rounded-md">About</a>
                  <a href="#" className="block px-3 py-2 text-white hover:bg-green-600 rounded-md">Contact</a>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 opacity-60"></div>
        <div className="absolute inset-0 bg-[url('/api/placeholder/1200/800')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-green-100 text-green-800 mb-6 px-3 py-1 text-sm">Trusted Certification</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
              Independent Verification for Quality Standards
            </h2>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Halal India Accreditation provides formal, independent verification that programs and institutions 
              meet established quality standards and are competent to carry out specific conformity assessment tasks.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all">
                Get Accredited
              </Button>
              <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 rounded-full px-8 py-6 text-lg font-medium">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-green-600">500+</p>
              <p className="text-gray-600 mt-2">Certified Organizations</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-green-600">30+</p>
              <p className="text-gray-600 mt-2">Countries Covered</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-green-600">15+</p>
              <p className="text-gray-600 mt-2">Years Experience</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-green-600">100%</p>
              <p className="text-gray-600 mt-2">Compliance Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Server Status Section */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">System Status</h2>
            <p className="text-gray-600 mt-2">Real-time monitoring of our accreditation services</p>
          </div>
          
          <div className="max-w-md mx-auto">
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-slate-50 border-b">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Server className="h-5 w-5 text-slate-700" /> 
                  Server Status
                </CardTitle>
                <CardDescription>Live status updated every 10 minutes</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {serverStatus.status === 'online' && (
                      <>
                        <div className="bg-green-100 p-2 rounded-full">
                          <CheckCircle className="h-6 w-6 text-green-500" />
                        </div>
                        <div>
                          <Badge className="bg-green-500 hover:bg-green-600">Online</Badge>
                          <p className="text-sm text-gray-500 mt-1">All systems operational</p>
                        </div>
                      </>
                    )}
                    {serverStatus.status === 'offline' && (
                      <>
                        <div className="bg-red-100 p-2 rounded-full">
                          <XCircle className="h-6 w-6 text-red-500" />
                        </div>
                        <div>
                          <Badge className="bg-red-500 hover:bg-red-600">Offline</Badge>
                          <p className="text-sm text-gray-500 mt-1">Services unavailable</p>
                        </div>
                      </>
                    )}
                    {serverStatus.status === 'checking' && (
                      <>
                        <div className="bg-yellow-100 p-2 rounded-full">
                          <Server className="h-6 w-6 text-yellow-500" />
                        </div>
                        <div>
                          <Badge className="bg-yellow-500 hover:bg-yellow-600">Checking</Badge>
                          <p className="text-sm text-gray-500 mt-1">Verifying system status</p>
                        </div>
                      </>
                    )}
                    {serverStatus.status === 'error' && (
                      <>
                        <div className="bg-orange-100 p-2 rounded-full">
                          <XCircle className="h-6 w-6 text-orange-500" />
                        </div>
                        <div>
                          <Badge className="bg-orange-500 hover:bg-orange-600">Connection Error</Badge>
                          <p className="text-sm text-gray-500 mt-1">Unable to check status</p>
                        </div>
                      </>
                    )}
                  </div>
                  {serverStatus.lastChecked && (
                    <div className="text-sm text-gray-500">
                      Last checked:<br/>{new Date(serverStatus.lastChecked).toLocaleTimeString()}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="bg-slate-50 border-t">
                <Button 
                  onClick={checkServerStatus} 
                  disabled={loading}
                  className="w-full bg-slate-700 hover:bg-slate-800 text-white"
                >
                  {loading ? 'Checking...' : 'Check Status Now'}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-green-100 text-green-800 mb-4">Technology</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Powered by Modern Tech Stack</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Built with cutting-edge technologies for reliability, scalability and performance</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all h-full">
                <div className="h-1 bg-gradient-to-r from-green-400 to-green-600"></div>
                <CardHeader className="pb-2">
                  <div className="flex flex-col items-center text-center mb-2">
                    <div className="bg-green-50 p-4 rounded-full mb-4 text-green-600">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-800">{feature.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-700 to-green-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Accredited?</h2>
            <p className="text-green-100 mb-10 text-lg">
              Join hundreds of organizations that trust Halal India for their accreditation needs. 
              Our expert team is ready to guide you through the certification process.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-white text-green-700 hover:bg-green-100 rounded-full px-8 py-6 text-lg font-medium">
                Apply Now
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-green-800 rounded-full px-8 py-6 text-lg font-medium">
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8">
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-white p-1 rounded-full">
                  <ShieldCheck className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-white">Halal India</h3>
              </div>
              <p className="text-gray-400 mb-6">
                Independent accreditation services ensuring quality standards and compliance across industries.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Services</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Halal Certification</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Food Safety</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Quality Management</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Laboratory Accreditation</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Our Team</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">News & Events</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg className="h-5 w-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span className="text-gray-400">123 Business Avenue, New Delhi, India</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="h-5 w-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span className="text-gray-400">contact@halalindia.org</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="h-5 w-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <span className="text-gray-400">+91 123 456 7890</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Halal India Accreditation. All rights reserved.</p>
              <div className="flex gap-4 md:justify-end">
                <a href="#" className="text-gray-500 hover:text-gray-400 text-sm">Privacy Policy</a>
                <a href="#" className="text-gray-500 hover:text-gray-400 text-sm">Terms of Service</a>
                <a href="#" className="text-gray-500 hover:text-gray-400 text-sm">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;