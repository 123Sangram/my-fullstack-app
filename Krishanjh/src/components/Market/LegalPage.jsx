import { motion } from "framer-motion";

export default function LegalPage() {
  
  return (
    <div className="min-h-screen bg-[#0f261d] text-white flex flex-col items-center p-12">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-extrabold mb-12 text-green-300"
      >
        Contract Farming Legal Guidelines
      </motion.h1>

      {/* Legal Points Section */}
      <div className="max-w-4xl bg-[#1a3d2d] p-10 rounded-3xl shadow-2xl">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="text-xl leading-relaxed mb-8"
        >
          Contract farming ensures a transparent agreement between farmers and
          buyers, fostering mutual growth and fair practices. Below are the
          essential legal points to protect both parties:
        </motion.p>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="space-y-6 text-lg"
        >
          <li className="flex items-start gap-4">
            <span className="text-green-400 text-3xl">✔️</span>
            <p>
              Clear Agreement: Establish a written contract outlining product
              type, quality standards, and delivery timelines.
            </p>
          </li>
          <li className="flex items-start gap-4">
            <span className="text-green-400 text-3xl">✔️</span>
            <p>
              Price Assurance: Define the agreed pricing structure to ensure
              fair compensation and avoid disputes.
            </p>
          </li>
          <li className="flex items-start gap-4">
            <span className="text-green-400 text-3xl">✔️</span>
            <p>
              Input Supply: Specify responsibilities for providing seeds,
              fertilizers, and other farming inputs.
            </p>
          </li>
          <li className="flex items-start gap-4">
            <span className="text-green-400 text-3xl">✔️</span>
            <p>
              Dispute Resolution: Include a transparent dispute settlement
              mechanism for conflict resolution.
            </p>
          </li>
          <li className="flex items-start gap-4">
            <span className="text-green-400 text-3xl">✔️</span>
            <p>
              Duration & Termination: Clearly mention the contract duration and
              conditions for early termination.
            </p>
          </li>
          <li className="flex items-start gap-4">
            <span className="text-green-400 text-3xl">✔️</span>
            <p>
              Legal Compliance: Ensure adherence to local and national
              agricultural laws and regulations.
            </p>
          </li>
        </motion.ul>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="mt-12 text-center"
        >
          <p className="text-xl mb-4">
            Secure your future with a fair and legal farming contract today!
          </p>
          <a
            href="/frontpage"
            className="bg-green-500 hover:bg-green-700 text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl transition-transform transform hover:scale-110"
          >
            Get Started
          </a>
        </motion.div>
      </div>
    </div>
  );
}
