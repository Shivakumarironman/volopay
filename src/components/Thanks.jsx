import React from "react";

function Thanks({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30">

            {/* Modal */}
            <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-md p-6 text-center animate-fadeIn">

                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    Thank You!
                </h2>

                <p className="text-gray-600 mb-6">
                    Your details have been updated to volopay.org
                </p>

                <button
                    onClick={onClose}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                >
                    Close
                </button>
            </div>
        </div>
    );
}

export default Thanks;