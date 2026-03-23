import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import MainLayout from './components/layout/MainLayout';
import Home from "./pages/Home/Home";
import AboutPage from './pages/About/About';
import ServiceDetail from './pages/Services/ServiceDetail';
import BlogDetail from './pages/Blog/BlogDetail';
import NotFound from './pages/NotFound/NotFound';
import Contact from './pages/Contact/Contact';
import Blog from './pages/Blog/Blog';
import TechnicalServices from './pages/Technicalservice/TechnicalServices';
import TechnicalDetail from './pages/Technicalservice/TechnicalDetail';


// admin 

import AdminDashboard from './admin/modules/Dashboard/AdminDashboard';
import AdminLayout from './admin/layout/AdminLayout';
import AdminLogin from './admin/auth/AdminLogin';
import ProtectedRoute from './admin/routes/ProtectedRoute';
import HomePageOverview from './admin/modules/Home/HomePageOverview';
import HeroEditor from './admin/modules/Home/HeroEditor';
import AboutEditor from './admin/modules/Home/AboutEditor';
import ServiceEditor from './admin/modules/Home/ServiceEditor';
import PopularEditor from './admin/modules/Home/PopularEditor';
import WhyChooseEditor from './admin/modules/Home/WhyChooseEditor';
import FAQEditor from './admin/modules/Home/FAQEditor';
import TestimonialsEditor from './admin/modules/Home/TestimonialsEditor';
import GoogleReviewsEditor from './admin/modules/Home/GoogleReviewsEditor';
import CtaEditor from './admin/modules/Home/CtaEditor';
import DynamicEditor from './admin/components/DynamicEditor';
import AboutPageOverview from './admin/modules/About/AboutPageOverview';
import AboutHeroEditor from './admin/modules/About/AboutHeroEditor';
import AboutMissionEditor from './admin/modules/About/AboutMissionEditor';
import AboutValuesEditor from './admin/modules/About/AboutValuesEditor';
import AboutTimelineEditor from './admin/modules/About/AboutTimelineEditor';
import AboutTeamEditor from './admin/modules/About/AboutTeamEditor';
import ContactPageOverview from './admin/modules/Contact/ContactPageOverview';
import ContactHeroEditor from './admin/modules/Contact/ContactHeroEditor';
import ContactFormEditor from './admin/modules/Contact/ContactFormEditor';
import ContactInfoEditor from './admin/modules/Contact/ContactInfoEditor';
import ContactMapEditor from './admin/modules/Contact/ContactMapEditor';
import BlogManagerEditor from './admin/modules/Blog/BlogManagerEditor';
import BlogPageOverview from './admin/modules/Blog/BlogPageOverview';
import BlogHeroEditor from './admin/modules/Blog/BlogHeroEditor';
import BlogPostsEditor from './admin/modules/Blog/BlogPostsEditor';
import BlogCategoriesEditor from './admin/modules/Blog/BlogCategoriesEditor';
import BlogSEOEditor from './admin/modules/Blog/BlogSEOEditor';
import BlogDetailEditor from './admin/modules/Blog/BlogDetailEditor';
// Dummy Pages
const Login = () => <div className="flex h-screen items-center justify-center bg-gray-100">Login Page (No Header/Footer)</div>;

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          {/* home Routes */}

          <Route path="/" element={<MainLayout><Home /></MainLayout>} />

          {/* About Routes */}

          <Route path="/about" element={<MainLayout><AboutPage /></MainLayout>} />

          {/* Service Routes */}
          <Route path="/services/:serviceId" element={<MainLayout><ServiceDetail /></MainLayout>} />

          {/* Contact Routes */}
          <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />

          {/* Blog Routes */}
          <Route path="/blog" element={<MainLayout><Blog /></MainLayout>} />

          {/* Single Blog Article Route */}
          <Route path="/blog/:slug" element={<MainLayout><BlogDetail /></MainLayout>} />

          {/* Technical Route */}
          <Route path="/technical" element={<MainLayout><TechnicalServices /></MainLayout>} />
          <Route path="/technical-services/:serviceId" element={<MainLayout><TechnicalDetail /></MainLayout>} />

          {/* --Auth Pages --- */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<div>Register Page</div>} />

          {/* 404 ROUTE */}
          <Route path="*" element={<NotFound />} />

          {/* ADMIN LOGIN */}
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* SECURE ADMIN ROUTES */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />

              {/* CMS ROUTES of homepage */}
              <Route path="pages/home" element={<HomePageOverview />} />
              <Route path="pages/home/hero" element={<HeroEditor />} />
              <Route path="pages/home/about" element={<AboutEditor />} />
              <Route path="pages/home/services" element={<ServiceEditor />} />
              <Route path="pages/home/popular" element={<PopularEditor />} />
              <Route path="pages/home/why-us" element={<WhyChooseEditor />} />
              <Route path="pages/home/faq" element={<FAQEditor />} />
              <Route path="pages/home/testimonials" element={<TestimonialsEditor />} />
              <Route path="pages/home/cta" element={<CtaEditor />} />
              <Route path="pages/home/reviews" element={<GoogleReviewsEditor />} />
              <Route path="/admin/pages/home/:moduleName" element={<DynamicEditor />} />


              {/* CMS ROUTES of aboutpage */}


              <Route path="pages/about" element={<AboutPageOverview />} />
              <Route path="pages/about/hero" element={<AboutHeroEditor />} />
              <Route path="pages/about/mission" element={<AboutMissionEditor />} />
              <Route path="pages/about/values" element={<AboutValuesEditor />} />
              <Route path="pages/about/timeline" element={<AboutTimelineEditor />} />
              <Route path="pages/about/team" element={<AboutTeamEditor />} />
              <Route path="pages/about/why-us" element={<WhyChooseEditor />} />
              <Route path="/admin/pages/about/:moduleName" element={<DynamicEditor />} />

              {/* CMS ROUTES of aboutpage */}

              <Route path="pages/contact" element={<ContactPageOverview />} />
              <Route path="pages/contact/hero" element={<ContactHeroEditor />} />
              <Route path="pages/contact/info" element={<ContactInfoEditor />} />
              <Route path="pages/contact/form" element={<ContactFormEditor />} />
              <Route path="pages/contact/map" element={<ContactMapEditor />} />
              <Route path="/admin/pages/contact/:moduleName" element={<DynamicEditor />} />


              {/* CMS ROUTES of aboutpage */}

              <Route path="pages/blog" element={<BlogPageOverview />} />
              <Route path="pages/blog/hero" element={<BlogHeroEditor />} />
              <Route path="pages/blog/posts" element={<BlogPostsEditor />} />
              <Route path="pages/blog/categories" element={<BlogCategoriesEditor />} />
              <Route path="pages/blog/seo" element={<BlogSEOEditor />} />
              <Route path="pages/blog/detail" element={<BlogDetailEditor />} />
              <Route path="/admin/pages/blog/:moduleName" element={<DynamicEditor />} />
            </Route>
          </Route>


        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;