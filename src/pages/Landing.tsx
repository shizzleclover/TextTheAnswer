
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Award, Users, Calendar, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const Landing = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);
  
  useEffect(() => {
    // Demo welcome toast
    setTimeout(() => {
      toast('👋 Welcome to Text the Answer!', {
        description: 'The ultimate quiz platform',
      });
    }, 1500);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="font-montserrat text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-imperial to-cherry-blossom">
            TextTheAnswer
          </div>
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-6">
              <Link to="/" className="font-medium text-gray-900 hover:text-imperial transition-colors">Home</Link>
              <Link to="/#features" className="font-medium text-gray-600 hover:text-imperial transition-colors">Features</Link>
              <Link to="/#testimonials" className="font-medium text-gray-600 hover:text-imperial transition-colors">Testimonials</Link>
              <Link to="/#pricing" className="font-medium text-gray-600 hover:text-imperial transition-colors">Pricing</Link>
            </nav>
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-imperial hover:bg-imperial/90">Sign Up</Button>
              </Link>
            </div>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
          {isOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 py-4">
              <nav className="flex flex-col space-y-4 px-4">
                <Link to="/" className="font-medium text-gray-900 hover:text-imperial transition-colors" onClick={() => setIsOpen(false)}>Home</Link>
                <Link to="/#features" className="font-medium text-gray-600 hover:text-imperial transition-colors" onClick={() => setIsOpen(false)}>Features</Link>
                <Link to="/#testimonials" className="font-medium text-gray-600 hover:text-imperial transition-colors" onClick={() => setIsOpen(false)}>Testimonials</Link>
                <Link to="/#pricing" className="font-medium text-gray-600 hover:text-imperial transition-colors" onClick={() => setIsOpen(false)}>Pricing</Link>
                <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">Sign In</Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-imperial hover:bg-imperial/90">Sign Up</Button>
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
      
      <main>
        {/* Hero Section */}
        <section className="py-12 md:py-24 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 animate-fade-in">
                <div className="inline-block bg-imperial/10 text-imperial font-medium rounded-full px-4 py-1 text-sm">
                  Test Your Knowledge Daily
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-montserrat leading-tight">
                  Challenge Yourself with <span className="text-imperial">Interactive Quizzes</span>
                </h1>
                <p className="text-xl text-gray-600">
                  Join thousands of players for daily quizzes and multiplayer challenges. Learn new things and compete with friends.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/register">
                    <Button size="lg" className="bg-imperial hover:bg-imperial/90">
                      Get Started — It's Free
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button size="lg" variant="outline">
                      Sign In
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-8 w-8 rounded-full bg-gray-300 border-2 border-white overflow-hidden">
                        <div className={`h-full w-full bg-gradient-to-br from-imperial to-cherry-blossom opacity-${(i * 2) + 1}0`}></div>
                      </div>
                    ))}
                  </div>
                  <span>Join over 10,000+ players</span>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-dutch-white/30 to-carolina-blue/30 rounded-xl transform -rotate-3 scale-95 -z-10"></div>
                <div className="bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden">
                  <div className="bg-imperial/10 px-4 py-3 border-b border-gray-200 flex items-center">
                    <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500 mr-4"></div>
                    <div className="text-sm font-medium">TextTheAnswer Quiz</div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-8">
                      <div>
                        <div className="font-medium mb-3">Which planet is known as the Red Planet?</div>
                        <div className="space-y-2">
                          <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:border-imperial/30 hover:bg-imperial/5">Venus</button>
                          <button className="w-full p-3 text-left bg-green-50 border border-green-300 rounded-lg">Mars ✓</button>
                          <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:border-imperial/30 hover:bg-imperial/5">Jupiter</button>
                          <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:border-imperial/30 hover:bg-imperial/5">Saturn</button>
                        </div>
                      </div>
                      <div className="bg-dutch-white/50 border border-dutch-white rounded-lg p-4 text-sm">
                        <div className="font-semibold mb-1">Explanation:</div>
                        <p>Mars is called the Red Planet because it appears reddish in color due to iron oxide (rust) on its surface.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-montserrat mb-4">Why Choose Text the Answer?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Our platform offers a variety of features to make learning fun and engaging.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-imperial/10 text-imperial mb-4">
                  <Calendar className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Daily Challenges</h3>
                <p className="text-gray-600">New quiz questions every day to test your knowledge across various topics.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-carolina-blue/10 text-carolina-blue mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Multiplayer Mode</h3>
                <p className="text-gray-600">Challenge friends and other players in real-time competitive quizzes.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-cherry-blossom/10 text-cherry-blossom mb-4">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Leaderboards</h3>
                <p className="text-gray-600">Compete for top rankings and show off your quiz mastery to others.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-yinmn-blue/10 text-yinmn-blue mb-4">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Learn & Improve</h3>
                <p className="text-gray-600">Detailed explanations help you understand topics better with each question.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-imperial to-cherry-blossom text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold font-montserrat mb-6">Ready to Challenge Yourself?</h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Join thousands of players today and start your quiz journey. It's free to get started!
            </p>
            <Link to="/register">
              <Button size="lg" variant="secondary" className="font-medium">
                Create Free Account
              </Button>
            </Link>
          </div>
        </section>
        
        {/* Testimonials */}
        <section id="testimonials" className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-montserrat mb-4">What Our Users Say</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Don't just take our word for it. Here's what players think about Text the Answer.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-carolina-blue/20 flex items-center justify-center text-carolina-blue font-semibold mr-3">
                    JD
                  </div>
                  <div>
                    <div className="font-medium">Jane Doe</div>
                    <div className="text-sm text-gray-500">Daily Quiz Champion</div>
                  </div>
                </div>
                <p className="text-gray-600">
                  "I love the daily quizzes! They've become part of my morning routine, and I've learned so much about different topics."
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-imperial/20 flex items-center justify-center text-imperial font-semibold mr-3">
                    MS
                  </div>
                  <div>
                    <div className="font-medium">Mike Smith</div>
                    <div className="text-sm text-gray-500">Multiplayer Enthusiast</div>
                  </div>
                </div>
                <p className="text-gray-600">
                  "The multiplayer mode is super fun! I challenge my friends every weekend, and we have a blast competing against each other."
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-cherry-blossom/20 flex items-center justify-center text-imperial font-semibold mr-3">
                    AT
                  </div>
                  <div>
                    <div className="font-medium">Alex Thompson</div>
                    <div className="text-sm text-gray-500">Premium Member</div>
                  </div>
                </div>
                <p className="text-gray-600">
                  "The premium membership is totally worth it. No ads, more questions, and the ability to create custom multiplayer games is awesome!"
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Pricing */}
        <section id="pricing" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-montserrat mb-4">Simple, Transparent Pricing</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Choose the plan that works best for you
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
                {/* Education Plan */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-1">
                      <GraduationCap className="h-5 w-5 text-blue-500" />
                      <h3 className="text-lg font-semibold">Student</h3>
                    </div>
                    <p className="text-gray-500 mb-4">For students and educators</p>
                    <div className="mb-4">
                      <span className="text-3xl font-bold">$4.99</span>
                      <span className="text-gray-500">/month</span>
                    </div>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>All free features</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Study material scanner</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Educational content packs</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>50% off annual plan</span>
                      </li>
                    </ul>
                    <Link to="/register">
                      <Button className="w-full bg-blue-500 hover:bg-blue-600">
                        Get Student Plan
                      </Button>
                    </Link>
                  </div>
                </div>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-1">Free</h3>
                  <p className="text-gray-500 mb-4">Get started with basic features</p>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">$0</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Daily quizzes (limited)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Join public multiplayer games</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Basic leaderboard access</span>
                    </li>
                  </ul>
                  <Link to="/register">
                    <Button className="w-full" variant="outline">
                      Sign Up Free
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="bg-white rounded-xl border-2 border-imperial overflow-hidden shadow-lg scale-105 relative">
                <div className="absolute top-0 inset-x-0 bg-imperial text-white text-center text-sm py-1 font-medium">
                  Most Popular
                </div>
                <div className="p-6 pt-10">
                  <h3 className="text-lg font-semibold mb-1">Premium Monthly</h3>
                  <p className="text-gray-500 mb-4">Everything you need</p>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">$4.99</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Unlimited daily quizzes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Create custom multiplayer games</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Ad-free experience</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Premium question packs</span>
                    </li>
                  </ul>
                  <Link to="/register">
                    <Button className="w-full bg-imperial hover:bg-imperial/90">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-1">Premium Annual</h3>
                  <p className="text-gray-500 mb-4">Best value, save 33%</p>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">$39.99</span>
                    <span className="text-gray-500">/year</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>All Premium Monthly features</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Priority access to new features</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Exclusive annual member badge</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Premium support</span>
                    </li>
                  </ul>
                  <Link to="/register">
                    <Button className="w-full" variant="outline">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="font-montserrat text-xl font-bold text-white mb-4">TextTheAnswer</div>
              <p className="mb-4">The ultimate quiz platform for knowledge enthusiasts and trivia lovers.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Features</h3>
              <ul className="space-y-2">
                <li><Link to="/#" className="hover:text-white transition-colors">Daily Quiz</Link></li>
                <li><Link to="/#" className="hover:text-white transition-colors">Multiplayer</Link></li>
                <li><Link to="/#" className="hover:text-white transition-colors">Leaderboards</Link></li>
                <li><Link to="/#" className="hover:text-white transition-colors">Premium Features</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/#" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/#" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/#" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link to="/#" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/#" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/#" className="hover:text-white transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div>&copy; {new Date().getFullYear()} Text the Answer. All rights reserved.</div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="/#" className="hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="/#" className="hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="/#" className="hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
