import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SiSolana } from 'react-icons/si';
import { FiSend, FiPlus, FiUpload, FiCopy, FiRefreshCw, FiX } from 'react-icons/fi';

interface Token {
  symbol: string;
  name: string;
  balance: string;
  icon: string;
  address: string;
}

interface Transfer {
  recipient: string;
  amount: string;
}

interface BulkTransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (addresses: string[], amount: string) => void;
  selectedToken?: Token;
}

function BulkTransferModal({ isOpen, onClose, onSubmit, selectedToken }: BulkTransferModalProps) {
  const [addresses, setAddresses] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = () => {
    const addressList = addresses
      .split('\n')
      .map(addr => addr.trim())
      .filter(addr => addr.length > 0);
    onSubmit(addressList, amount);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0F1113] rounded-2xl p-6 max-w-2xl w-full border border-white/10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Bulk Transfer {selectedToken?.symbol}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <FiX size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Recipient Addresses (one per line)
            </label>
            <textarea
              value={addresses}
              onChange={(e) => setAddresses(e.target.value)}
              placeholder="Enter addresses here&#10;0x1234...&#10;0x5678...&#10;0x90ab..."
              className="w-full h-48 bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00FFA3] focus:border-transparent text-sm font-mono"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Amount per address
            </label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00FFA3] focus:border-transparent"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-[#00FFA3] to-[#DC1FFF] hover:opacity-90 flex items-center justify-center gap-2"
          >
            <FiSend />
            Send to {addresses.split('\n').filter(addr => addr.trim().length > 0).length} Recipients
          </button>
        </div>
      </div>
    </div>
  );
}

function ImportTokenModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [tokenAddress, setTokenAddress] = useState('');

  const handleImport = () => {
    // Implement token import logic here
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0F1113] rounded-2xl p-6 max-w-lg w-full border border-white/10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Import Token</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <FiX size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Token Contract Address
            </label>
            <input
              type="text"
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
              placeholder="Enter token address"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00FFA3] focus:border-transparent font-mono"
            />
          </div>

          <button
            onClick={handleImport}
            className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-[#00FFA3] to-[#DC1FFF] hover:opacity-90"
          >
            Import Token
          </button>
        </div>
      </div>
    </div>
  );
}

export default function WalletDashboard() {
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [isBulkTransfer, setIsBulkTransfer] = useState(false);
  const [transfers, setTransfers] = useState<Transfer[]>([{ recipient: '', amount: '' }]);
  const [singleRecipient, setSingleRecipient] = useState('');
  const [singleAmount, setSingleAmount] = useState('');
  const [showBulkTransfer, setShowBulkTransfer] = useState(false);
  const [showImportToken, setShowImportToken] = useState(false);

  // Mock data - replace with actual wallet data
  const tokens: Token[] = [
    { symbol: 'SOL', name: 'Solana', balance: '12.5', icon: '◎', address: '' },
    { symbol: 'USDC', name: 'USD Coin', balance: '100.00', icon: '$', address: '' },
    // Add more tokens as needed
  ];

  const addTransferRow = () => {
    setTransfers([...transfers, { recipient: '', amount: '' }]);
  };

  const updateTransfer = (index: number, field: keyof Transfer, value: string) => {
    const newTransfers = [...transfers];
    newTransfers[index] = { ...newTransfers[index], [field]: value };
    setTransfers(newTransfers);
  };

  const handleSend = async () => {
    if (isBulkTransfer) {
      console.log('Bulk transfer:', { token: selectedToken, transfers });
    } else {
      console.log('Single transfer:', { token: selectedToken, recipient: singleRecipient, amount: singleAmount });
    }
  };

  const handleBulkTransfer = (addresses: string[], amount: string) => {
    console.log('Bulk transfer:', { addresses, amount, token: selectedToken });
    // Implement bulk transfer logic here
  };

  return (
    <main className="min-h-screen bg-[#0F1113] text-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-green-500/5 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-2">
            <SiSolana className="text-[#00FFA3] text-2xl" />
            <span className="font-bold">Solana Wallet</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-white transition-colors">
              <FiRefreshCw size={20} />
            </button>
            <div className="bg-white/5 px-4 py-2 rounded-lg flex items-center gap-2">
              <span className="text-sm text-gray-400">Your wallet</span>
              <code className="text-sm">Ax...3k</code>
              <button className="text-gray-400 hover:text-white transition-colors">
                <FiCopy size={16} />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Token List */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Your Tokens</h2>
              <button
                onClick={() => setShowImportToken(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm"
              >
                <FiPlus /> Import Token
              </button>
            </div>
            <div className="space-y-2">
              {tokens.map((token) => (
                <button
                  key={token.symbol}
                  onClick={() => setSelectedToken(token)}
                  className={`w-full p-4 rounded-xl flex items-center justify-between ${
                    selectedToken?.symbol === token.symbol
                      ? 'bg-gradient-to-r from-[#00FFA3]/20 to-[#DC1FFF]/20 border border-[#00FFA3]/50'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{token.icon}</span>
                    <div className="text-left">
                      <div className="font-bold">{token.symbol}</div>
                      <div className="text-sm text-gray-400">{token.name}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{token.balance}</div>
                    <div className="text-sm text-gray-400">{token.symbol}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Transfer Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Send {selectedToken?.symbol || 'Tokens'}</h2>
                <button
                  onClick={() => setShowBulkTransfer(true)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    isBulkTransfer
                      ? 'bg-[#00FFA3]/20 text-[#00FFA3]'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  Bulk Transfer
                </button>
              </div>

              {isBulkTransfer ? (
                // Bulk Transfer Form
                <div className="space-y-4">
                  {transfers.map((transfer, index) => (
                    <div key={index} className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={transfer.recipient}
                        onChange={(e) => updateTransfer(index, 'recipient', e.target.value)}
                        placeholder="Recipient address"
                        className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00FFA3] focus:border-transparent"
                      />
                      <input
                        type="text"
                        value={transfer.amount}
                        onChange={(e) => updateTransfer(index, 'amount', e.target.value)}
                        placeholder="Amount"
                        className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00FFA3] focus:border-transparent"
                      />
                    </div>
                  ))}
                  <button
                    onClick={addTransferRow}
                    className="flex items-center gap-2 text-[#00FFA3] hover:text-[#00FFA3]/80 transition-colors"
                  >
                    <FiPlus /> Add Recipient
                  </button>
                </div>
              ) : (
                // Single Transfer Form
                <div className="space-y-4">
                  <input
                    type="text"
                    value={singleRecipient}
                    onChange={(e) => setSingleRecipient(e.target.value)}
                    placeholder="Recipient address"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00FFA3] focus:border-transparent"
                  />
                  <input
                    type="text"
                    value={singleAmount}
                    onChange={(e) => setSingleAmount(e.target.value)}
                    placeholder="Amount"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00FFA3] focus:border-transparent"
                  />
                </div>
              )}

              <button
                onClick={handleSend}
                disabled={!selectedToken}
                className={`mt-6 w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 ${
                  selectedToken
                    ? 'bg-gradient-to-r from-[#00FFA3] to-[#DC1FFF] hover:opacity-90'
                    : 'bg-gray-600 cursor-not-allowed'
                }`}
              >
                <FiSend />
                Send {isBulkTransfer ? 'to Multiple Recipients' : 'Tokens'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <BulkTransferModal
        isOpen={showBulkTransfer}
        onClose={() => setShowBulkTransfer(false)}
        onSubmit={handleBulkTransfer}
        selectedToken={selectedToken}
      />
      
      <ImportTokenModal
        isOpen={showImportToken}
        onClose={() => setShowImportToken(false)}
      />
    </main>
  );
} 