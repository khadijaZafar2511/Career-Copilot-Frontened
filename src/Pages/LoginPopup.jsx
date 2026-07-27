import { useLoginModal } from "../Store/useLoginModel"
import Login from "@/components/custom-components/Login";

export default function LoginModal () {
  const { isOpen, closeModal } = useLoginModal();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeModal}
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl z-10 mx-4">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 text-xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-2 text-center">
          Login Required
        </h2>
        <p className="text-gray-500 text-sm text-center mb-6">
          Please log in to continue executing this action.
        </p>

        {/* Embed the exact same form, but pass the closeModal trigger */}
        <Login onLoginSuccess={closeModal} />
      </div>
    </div>
  );
};
