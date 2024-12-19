import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SiSolana } from 'react-icons/si';
import { FiCopy, FiEye, FiEyeOff, FiSave, FiArrowLeft } from 'react-icons/fi';

export default function CreateWallet() {
  const navigate = useNavigate();
  const [mnemonic] = useState('word1 word2 word3 word4 word5 word6 word7 word8 word9 word10 word11 word12'); // This will be generated
  const [showMnemonic, setShowMnemonic] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(mnemonic);
      alert('Seed phrase copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <main className="min-h-screen bg-[#0F1113] text-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-green-500/5 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <FiArrowLeft size={20} />
              <span>Back</span>
            </button>
            <div className="w-px h-6 bg-gray-700" /> {/* Divider */}
            <Link to="/" className="flex items-center gap-2">
              <SiSolana className="text-[#00FFA3] text-2xl" />
              <span className="font-bold">Solana Wallet</span>
            </Link>
          </div>
        </header>

        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFA3] to-[#DC1FFF]">
            Create New Wallet
          </h1>

          <div className="bg-white/5 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Your Seed Phrase</h2>
            <div className="relative">
              <div className={`bg-white/5 p-4 rounded-lg font-mono text-lg mb-4 ${!showMnemonic ? 'blur-sm' : ''}`}>
                {mnemonic}
              </div>
              <button
                onClick={() => setShowMnemonic(!showMnemonic)}
                className="absolute right-4 top-4 text-gray-400 hover:text-white"
              >
                {showMnemonic ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
            <div className="flex gap-4">
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <FiCopy /> Copy
              </button>
              <button
                onClick={() => {}} // Implement save functionality
                className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <FiSave /> Save
              </button>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-6 mb-8">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="w-5 h-5 rounded border-gray-600 bg-white/5 text-[#00FFA3] focus:ring-[#00FFA3]"
              />
              <span className="text-sm text-gray-300">
                I have saved my seed phrase in a secure location
              </span>
            </label>
          </div>

          <button
            disabled={!confirmed}
            className={`w-full py-4 rounded-xl font-bold text-lg ${
              confirmed
                ? 'bg-gradient-to-r from-[#00FFA3] to-[#DC1FFF] hover:opacity-90'
                : 'bg-gray-600 cursor-not-allowed'
            }`}
          >
            Continue to Wallet
          </button>
        </div>
      </div>
    </main>
  );
} 