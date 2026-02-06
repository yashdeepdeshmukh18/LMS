import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCourseById } from "../api/getCourseById";
import { enrollCourse } from "../api/enrollCourse";
import { Lock, CreditCard, CheckCircle } from "lucide-react";

const PaymentPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  // Fake Form State
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");

  // 1. Fetch Course Details
  useEffect(() => {
    if (!courseId) return;
    const fetchCourse = async () => {
      try {
        const data = await getCourseById(courseId);
        setCourse(data);
      } catch (error) {
        console.error("Failed to load course", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseId]);

  // 2. Handle Payment
  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate Network Delay (2 seconds)
    setTimeout(async () => {
      try {
        // --- REAL ENROLLMENT CALL ---
        await enrollCourse(courseId);
        
        setProcessing(false);
        setSuccess(true);

        // Redirect after success animation
        setTimeout(() => {
          navigate(`/course/${courseId}/learn`);
        }, 2000);

      } catch (error) {
        setProcessing(false);
        alert("Payment Failed: " + error.message);
      }
    }, 2000);
  };

  if (loading) return <div className="p-20 text-center">Loading Checkout...</div>;
  if (!course) return <div className="p-20 text-center">Invalid Course ID</div>;

  return (
    <div className="min-h-screen bg-gray-50">
    

      <div className="max-w-4xl mx-auto px-4 py-12">
        
        {success ? (
          // SUCCESS VIEW
          <div className="bg-white p-10 rounded-2xl shadow-lg text-center animate-fade-in-up">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-green-600 w-10 h-10" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">Redirecting you to your course...</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full animate-pulse w-full"></div>
            </div>
          </div>
        ) : (
          // CHECKOUT VIEW
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* LEFT: Order Summary */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Order Summary</h2>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <img 
                  src={course.thumbnail_url || "https://via.placeholder.com/300"} 
                  alt={course.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{course.category?.name || "General"}</p>
                <hr className="border-dashed border-gray-300 my-4" />
                <div className="flex justify-between items-center text-lg font-medium">
                  <span>Total Price</span>
                  <span className="text-[#8300C4]">₹{course.price}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 bg-blue-50 p-3 rounded-lg border border-blue-100">
                <Lock size={16} /> Secure SSL Encryption
              </div>
            </div>

            {/* RIGHT: Payment Form */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-purple-100">
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="text-[#8300C4]" size={28} />
                <h2 className="text-xl font-bold text-gray-800">Payment Details</h2>
              </div>

              <form onSubmit={handlePayment} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Holder Name</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                  <input 
                    required 
                    type="text" 
                    maxLength="19"
                    placeholder="0000 0000 0000 0000" 
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none"
                    value={cardNumber}
                    onChange={e => setCardNumber(e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim())}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="MM/YY" 
                      maxLength="5"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none"
                      value={expiry}
                      onChange={e => setExpiry(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input 
                      required 
                      type="password" 
                      maxLength="3"
                      placeholder="123" 
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none"
                      value={cvv}
                      onChange={e => setCvv(e.target.value)}
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={processing}
                  className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-md transition-all 
                  ${processing ? 'bg-gray-400 cursor-wait' : 'bg-[#8300C4] hover:bg-[#6a00a0] hover:shadow-xl active:scale-[0.98]'}`}
                >
                  {processing ? "Processing..." : `Pay ₹${course.price}`}
                </button>
                
                <p className="text-center text-xs text-gray-400 mt-4">
                  This is a secure 128-bit SSL encrypted payment.
                </p>
              </form>
            </div>

          </div>
        )}
      </div>
     
    </div>
  );
};

export default PaymentPage;