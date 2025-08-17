import axios from "axios";
import { Link } from "react-router-dom";

const base_url = import.meta.env.VITE_APP_BACKEND_URL;

const Premium = () => {
  const plans = [
    {
      title: "Basic",
      price: "₹99/month",
      features: [
        "See who liked you",
        "Unlimited swipes",
        "Basic profile boosts",
      ],
      bg: "from-indigo-200 to-indigo-400",
    },
    {
      title: "Gold",
      price: "₹299/month",
      features: [
        "All Basic features",
        "Message anyone",
        "2x profile boosts",
        "Priority support",
      ],
      bg: "from-yellow-200 to-yellow-500",
      highlight: true,
    },
    {
      title: "Platinum",
      price: "₹599/month",
      features: [
        "All Gold features",
        "Unlimited boosts",
        "Exclusive badge",
        "Early access to new features",
      ],
      bg: "from-purple-200 to-purple-500",
    },
  ];

  async function handleSubscribeClick(type) {
    try {
      let plan = type.toLowerCase();

      const res = await axios.post(
        `${base_url}/payment/create`,
        { membershipType: plan },
        { withCredentials: true }
      );

      const { keyId, amount, currency, orderId, notes } = res.data.payment;


      const options = {
        key: keyId,
        amount,
        currency,
        name: "TechTinder",
        description: "Connect to other developers",
        order_id: orderId,
        prefill: {
          name: notes.firstname + " " + notes.lastname,
          email: notes.email,
        },
        theme: {
          color: "#6D28D9", // brand purple
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-16 px-6">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-purple-900 drop-shadow-lg">
          Go Premium
        </h1>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
          Unlock exclusive features and boost your chances of finding the
          perfect match. Choose a plan that suits you best.
        </p>
      </div>

      {/* Plans */}
      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative rounded-3xl shadow-xl p-8 bg-gradient-to-b ${
              plan.bg
            } 
              backdrop-blur-lg bg-opacity-80 transition-transform transform hover:scale-105 
              hover:shadow-2xl ${
                plan.highlight ? "ring-4 ring-yellow-400 scale-105" : ""
              }`}
          >
            {plan.highlight && (
              <span className="absolute top-4 right-4 bg-yellow-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">
                Popular
              </span>
            )}
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              {plan.title}
            </h2>
            <p className="text-4xl font-extrabold mb-6 text-purple-800">
              {plan.price}
            </p>
            <ul className="mb-6 space-y-3 text-gray-800 font-medium">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-600">✔</span> {feature}
                </li>
              ))}
            </ul>
            <button
              className="w-full py-3 rounded-xl bg-purple-700 text-white font-semibold 
              hover:bg-purple-900 hover:shadow-xl transition-all"
              onClick={() => handleSubscribeClick(plan.title)}
            >
              Subscribe Now
            </button>
          </div>
        ))}
      </div>

      {/* Footer Links */}
      <div className="flex flex-wrap justify-center gap-8 mt-16 text-gray-600">
        <Link
          to="/subscription-terms"
          className="hover:text-purple-800 transition"
        >
          Subscription Terms
        </Link>
        <Link to="/refund-policy" className="hover:text-purple-800 transition">
          Refund Policy
        </Link>
        <Link
          to="/cancellation-policy"
          className="hover:text-purple-800 transition"
        >
          Cancellation Policy
        </Link>
      </div>
    </div>
  );
};

export default Premium;
