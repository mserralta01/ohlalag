import React from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../hooks/useModal';
import Modal from './Modal';
import { Phone, Heart } from 'lucide-react';

function Footer() {
  const { isOpen: isTermsOpen, openModal: openTerms, closeModal: closeTerms } = useModal();
  const { isOpen: isPrivacyOpen, openModal: openPrivacy, closeModal: closePrivacy } = useModal();

  return (
    <footer className="bg-rose-50">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-2xl font-serif text-rose-600 mb-4">Designs by Oh-La-La</h3>
            <p className="text-gray-600">
              Where creativity meets sophistication in Wellington, FL
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-rose-600 mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/events" className="text-gray-600 hover:text-rose-600 transition-colors">
                  Upcoming Ateliers
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-600 hover:text-rose-600 transition-colors">
                  My Account
                </Link>
              </li>
              <li>
                <button 
                  onClick={openTerms}
                  className="text-gray-600 hover:text-rose-600 transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button 
                  onClick={openPrivacy}
                  className="text-gray-600 hover:text-rose-600 transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-rose-600 mb-4">Contact</h4>
            <p className="text-gray-600">Andrea</p>
            <p className="text-gray-600 flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              (305) 987-5311
            </p>
            <p className="text-gray-600">Wellington, FL</p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-rose-100 text-center text-gray-500">
          <p className="flex items-center justify-center">
            Made with <Heart className="w-4 h-4 mx-2 text-rose-400" /> in Wellington
          </p>
          <p>&copy; {new Date().getFullYear()} Designs by Oh-La-La. All rights reserved.</p>
        </div>
      </div>

      <Modal isOpen={isTermsOpen} onClose={closeTerms} title="Terms & Conditions">
        <div className="prose prose-rose prose-sm max-w-none">
          <h3>1. Booking and Payment</h3>
          <p>All purchases are final and non-refundable. Payment is required at the time of booking to secure your spot in an atelier session.</p>

          <h3>2. Cancellation Policy</h3>
          <p>A minimum of 48 hours notice is required for all cancellations. While refunds are not available, you may reschedule your session for a future date, subject to availability.</p>

          <h3>3. Session Rules</h3>
          <ul>
            <li>Please arrive 10 minutes before the scheduled start time</li>
            <li>All materials provided must remain at the atelier unless explicitly stated otherwise</li>
            <li>Participants must be 21 or older for sessions including wine service</li>
          </ul>

          <h3>4. Liability</h3>
          <p>Designs by Oh-La-La is not responsible for any personal belongings or damage to clothing during sessions. Participants agree to use all materials and equipment at their own risk.</p>

          <h3>5. Photography</h3>
          <p>We may photograph sessions for promotional purposes. By participating, you grant us permission to use these images on our website and social media.</p>
        </div>
      </Modal>

      <Modal isOpen={isPrivacyOpen} onClose={closePrivacy} title="Privacy Policy">
        <div className="prose prose-rose prose-sm max-w-none">
          <h3>Information We Collect</h3>
          <p>We collect information you provide directly to us, including:</p>
          <ul>
            <li>Name and contact information</li>
            <li>Payment information</li>
            <li>Session booking history</li>
            <li>Communications with us</li>
          </ul>

          <h3>How We Use Your Information</h3>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Process your bookings and payments</li>
            <li>Send you booking confirmations and updates</li>
            <li>Communicate about upcoming events and promotions</li>
            <li>Improve our services</li>
          </ul>

          <h3>Information Sharing</h3>
          <p>We do not sell or share your personal information with third parties except as necessary to provide our services (e.g., payment processing).</p>

          <h3>Data Security</h3>
          <p>We implement appropriate security measures to protect your personal information.</p>

          <h3>Contact Us</h3>
          <p>For privacy-related questions, please contact Andrea at (305) 987-5311.</p>
        </div>
      </Modal>
    </footer>
  );
}

export default Footer;