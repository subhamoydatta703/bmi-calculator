import React, { useState } from "react";
import { motion } from "framer-motion";

const App = () => {
  const [ht, setHt] = useState("");
  const [wt, setWt] = useState("");
  const [bmir, setBmir] = useState(null);
  const [ybmi, setYbmi] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ht || !wt) {
      setBmir(null);
    } else {
      const htim = ht / 100;
      const bmi = wt / (htim * htim);
      if (bmi < 18.5) {
        setYbmi("Underweight");
      } else if (bmi < 25) {
        setYbmi("Normal");
      } else if (bmi < 30) {
        setYbmi("Overweight");
      } else {
        setYbmi("Obese");
      }
      setBmir(bmi.toFixed(2));
    }
  };

  // Color mapping for status bar
  const statusColor = {
    Underweight: "bg-blue-400",
    Normal: "bg-green-400",
    Overweight: "bg-yellow-400",
    Obese: "bg-red-400",
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-xl p-8 shadow-lg w-full max-w-md border border-gray-200"
      >
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          BMI Calculator
        </h1>

        {bmir !== null && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-6"
          >
            <p className="text-gray-700 text-lg">
              Your BMI: <span className="font-bold">{bmir}</span>
            </p>
            <p className="text-gray-700 mt-1">
              Status:{" "}
              <span
                className={`font-semibold ${
                  ybmi && statusColor[ybmi] ? "" : ""
                }`}
              >
                {ybmi}
              </span>
            </p>

            {/* BMI status bar */}
            {ybmi && (
              <div className="w-full bg-gray-200 h-3 rounded-full mt-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8 }}
                  className={`h-full ${statusColor[ybmi]}`}
                />
              </div>
            )}
          </motion.div>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4"
        >
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="number"
            onChange={(e) => setHt(e.target.value)}
            value={ht}
            placeholder="Height (cm)"
            className="bg-gray-50 text-gray-800 p-3 rounded-lg outline-none border border-gray-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
          />

          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="number"
            onChange={(e) => setWt(e.target.value)}
            value={wt}
            placeholder="Weight (kg)"
            className="bg-gray-50 text-gray-800 p-3 rounded-lg outline-none border border-gray-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
          />

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 rounded-lg shadow transition"
          >
            Calculate BMI
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default App;
