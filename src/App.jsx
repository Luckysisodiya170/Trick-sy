import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Layouts
import MainLayout from './components/layout/MainLayout';

// User Pages
import Home from "./pages/Home/Home";
import AboutPage from './pages/About/About';
// import Services from './pages/Services/Services'; 
import ServiceDetail from './pages/Services/ServiceDetail';
import TechnicalServices from './pages/Technicalservice/TechnicalServices';
import TechnicalDetail from './pages/Technicalservice/TechnicalDetail';
import Blog from './pages/Blog/Blog';
import BlogDetail from './pages/Blog/BlogDetail';
import Contact from './pages/Contact/Contact';
import NotFound from './pages/NotFound/NotFound';

// Admin Auth & Layout
import AdminLayout from './admin/layout/AdminLayout';
import AdminLogin from './admin/auth/AdminLogin';
import ProtectedRoute from './admin/routes/ProtectedRoute';
import AdminDashboard from './admin/modules/Dashboard/AdminDashboard';
import DynamicEditor from './admin/components/DynamicEditor';

// Admin Modules - Home
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

// Admin Modules - About
import AboutPageOverview from './admin/modules/About/AboutPageOverview';
import AboutHeroEditor from './admin/modules/About/AboutHeroEditor';
import AboutMissionEditor from './admin/modules/About/AboutMissionEditor';
import AboutValuesEditor from './admin/modules/About/AboutValuesEditor';
import AboutTimelineEditor from './admin/modules/About/AboutTimelineEditor';
import AboutTeamEditor from './admin/modules/About/AboutTeamEditor';

// Admin Modules - Contact
import ContactPageOverview from './admin/modules/Contact/ContactPageOverview';
import ContactHeroEditor from './admin/modules/Contact/ContactHeroEditor';
import ContactFormEditor from './admin/modules/Contact/ContactFormEditor';
import ContactInfoEditor from './admin/modules/Contact/ContactInfoEditor';
import ContactMapEditor from './admin/modules/Contact/ContactMapEditor';

// Admin Modules - Blog
import BlogPageOverview from './admin/modules/Blog/BlogPageOverview';
import BlogHeroEditor from './admin/modules/Blog/BlogHeroEditor';
import BlogPostsEditor from './admin/modules/Blog/BlogPostsEditor';
import BlogCategoriesEditor from './admin/modules/Blog/BlogCategoriesEditor';
import BlogSEOEditor from './admin/modules/Blog/BlogSEOEditor';
import BlogDetailEditor from './admin/modules/Blog/BlogDetailEditor';

// Admin Modules - Services
import ServicesPageOverview from './admin/modules/Services/ServicesPageOverview';
import ServiceModulePicker from './admin/modules/Services/ServiceWizard';
import ServicePricingEditor from './admin/modules/Services/ServicePricingEditor';
import ServiceHeroEditor from './admin/modules/Services/ServiceHeroEditor';
import ServiceIncludesEditor from './admin/modules/Services/ServiceIncludesEditor';
import ServiceFaqEditor from './admin/modules/Services/ServiceFaqEditor';
import ServiceProcessEditor from './admin/modules/Services/ServiceProcessEditor';

// Admin Modules - Technical
import TechnicalPageOverview from './admin/modules/Technical_Services/TechnicalPageOverview';
import TechnicalDomainsEditor from './admin/modules/Technical_Services/TechnicalDomainsEditor';
import TechnicalHeroEditor from './admin/modules/Technical_Services/TechnicalHeroEditor';
import HardwareSpecsEditor from './admin/modules/Technical_Services/HardwareSpecsEditor';
import TechnicalProcessEditor from './admin/modules/Technical_Services/TechnicalProcessEditor';
import TechnicalFAQEditor from './admin/modules/Technical_Services/TechnicalFAQEditor';
import TechnicalPricingEditor from './admin/modules/Technical_Services/TechnicalPricingEditor';
import TechnicalTrustEditor from './admin/modules/Technical_Services/TechnicalTrustEditor';
import ServiceWizard from './admin/modules/Services/ServiceWizard';
import ContactEnquiries from './admin/pages/ContactEnquiries';
import ServiceBookings from './admin/pages/ServiceBookings';
import NewsletterSubscribers from './admin/pages/NewsletterSubscribers';
import AdminSettings from './admin/pages/AdminSettings';
import AdminProfile from './admin/modules/profile/AdminProfile';
import AboutWhyChooseEditor from './admin/modules/About/AboutWhyChooseEditor';
import ContactTermsEditor from './admin/modules/Contact/Contacttermscondition';
import ContactPrivacyEditor from './admin/modules/Contact/ContactPrivacyPolicy';
import TermsAndConditions from './pages/Contact/TermsAndConditions';
import PrivacyPolicy from './pages/Contact/PrivacyPolicy';
import ScrollToTop from './components/Shared/ScrollToTop';
import CustomerPolicy from './pages/Contact/CustomerPolicy';

// Dummy Auth Pages
const Login = () => <div className="flex h-screen items-center justify-center bg-slate-50 font-bold text-xl">Login Page (User)</div>;
const Register = () => <div className="flex h-screen items-center justify-center bg-slate-50 font-bold text-xl">Register Page (User)</div>;

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop/>
        <Routes>

          {/* USER ROUTES */}
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/about" element={<MainLayout><AboutPage /></MainLayout>} />

          {/* <Route path="/services" element={<MainLayout><Services /></MainLayout>} /> */}
          <Route path="/services/:serviceId" element={<MainLayout><ServiceDetail /></MainLayout>} />

          <Route path="/technical" element={<MainLayout><TechnicalServices /></MainLayout>} />
          <Route path="/technical-services/:serviceId" element={<MainLayout><TechnicalDetail /></MainLayout>} />

          <Route path="/blog" element={<MainLayout><Blog /></MainLayout>} />
          <Route path="/blog/:slug" element={<MainLayout><BlogDetail /></MainLayout>} />

          <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
          <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/customer-policy" element={<CustomerPolicy />} />

          {/* AUTH ROUTES */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* 404 ROUTE */}
          <Route path="*" element={<NotFound />} />

          {/* SECURE ADMIN ROUTES */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />

              {/* HOME CMS */}
              <Route path="pages/home" element={<HomePageOverview />} />
              <Route path="pages/home/:id" element={<HeroEditor />} />
              <Route path="pages/home/about" element={<AboutEditor />} />
              <Route path="pages/home/services" element={<ServiceEditor />} />
              <Route path="pages/home/popular" element={<PopularEditor />} />
              <Route path="pages/home/why-us" element={<WhyChooseEditor />} />
              <Route path="pages/home/faq" element={<FAQEditor />} />
              <Route path="pages/home/testimonials" element={<TestimonialsEditor />} />
              <Route path="pages/home/cta" element={<CtaEditor />} />
              <Route path="pages/home/google" element={<GoogleReviewsEditor />} />
              <Route path="pages/home/:slug/:id" element={<DynamicEditor />} />

              {/* ABOUT CMS */}
              <Route path="pages/about" element={<AboutPageOverview />} />
              <Route path="pages/about/about-hero" element={<AboutHeroEditor />} />
              <Route path="pages/about/about-mission" element={<AboutMissionEditor />} />
              <Route path="pages/about/about-values" element={<AboutValuesEditor />} />
              <Route path="pages/about/about-timeline" element={<AboutTimelineEditor />} />
              <Route path="pages/about/about-team" element={<AboutTeamEditor />} />
              <Route path="pages/about/about-why-us" element={<AboutWhyChooseEditor />} />
              <Route path="pages/about/:slug/:id" element={<DynamicEditor />} />

              {/* CONTACT CMS */}
              <Route path="pages/contact" element={<ContactPageOverview />} />
              <Route path="pages/contact/contact-hero" element={<ContactHeroEditor />} />
              <Route path="pages/contact/contact-info" element={<ContactInfoEditor />} />
              <Route path="pages/contact/contact-form" element={<ContactFormEditor />} />
              <Route path="pages/contact/contact-map" element={<ContactMapEditor />} />
              <Route path="pages/contact/terms-and-conditions" element={<ContactTermsEditor />} />
              <Route path="pages/contact/privacy-policy" element={<ContactPrivacyEditor />} />
              <Route path="pages/contact/:slug/:id" element={<DynamicEditor />} />

              {/* BLOG CMS */}
              <Route path="pages/blog" element={<BlogPageOverview />} />
              <Route path="pages/blog/blog-hero" element={<BlogHeroEditor />} />
              <Route path="pages/blog/blog-posts" element={<BlogPostsEditor />} />
              <Route path="pages/blog/blog-categories" element={<BlogCategoriesEditor />} />
              <Route path="pages/blog/blog-seo" element={<BlogSEOEditor />} />
              <Route path="pages/blog/blog-content" element={<BlogDetailEditor />} />
              <Route path="pages/blog/:slug/:id" element={<DynamicEditor />} />

              {/* SERVICES CMS */}
              <Route path="pages/services" element={<ServicesPageOverview />} />
              <Route path="pages/services/:serviceId" element={<ServiceWizard />} />
              <Route path="pages/services/:serviceId/hero" element={<ServiceHeroEditor />} />
              <Route path="pages/services/:serviceId/includes" element={<ServiceIncludesEditor />} />
              <Route path="pages/services/:serviceId/faq" element={<ServiceFaqEditor />} />
              <Route path="pages/services/:serviceId/process" element={<ServiceProcessEditor />} />
              <Route path="pages/services/:serviceId/pricing" element={<ServicePricingEditor />} />
              <Route path="pages/services/:slug/:id" element={<ServiceWizard />} />

              {/* TECHNICAL CMS */}
              <Route path="pages/technical" element={<TechnicalPageOverview />} />
              <Route path="pages/technical/tech-hero" element={<TechnicalHeroEditor />} />
              <Route path="pages/technical/tech-domains" element={<TechnicalDomainsEditor />} />
              <Route path="pages/technical/tech-specs" element={<HardwareSpecsEditor />} />
              <Route path="pages/technical/tech-process" element={<TechnicalProcessEditor />} />
              <Route path="pages/technical/tech-pricing" element={<TechnicalPricingEditor />} />
              <Route path="pages/technical/tech-faq" element={<TechnicalFAQEditor />} />
              <Route path="pages/technical/tech-footer" element={<TechnicalTrustEditor />} />


              {/* interaction pages */}
              <Route path='leads' element={<ServiceBookings />} />
              <Route path='enquiries' element={<ContactEnquiries />} />
              <Route path='newsletter' element={<NewsletterSubscribers />} />
              <Route path='settings' element={<AdminSettings />} />



             


              {/* profile page */}

              <Route path="profile" element={<AdminProfile />} />
            </Route>
          </Route>

        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;