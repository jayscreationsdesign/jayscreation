'use client';

import { useState } from 'react';

interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  tier: string;
  points: number;
  total_spent: number;
  orders_count: number;
  created_at: string;
}

interface AddPointsModalProps {
  customer: Customer;
  onClose: () => void;
  onSave: (customerId: string, points: number) => void;
}

export default function AddPointsModal({ customer, onClose, onSave }: AddPointsModalProps) {
  const [pointsToAdd, setPointsToAdd] = useState('');

  const handleSave = () => {
    const points = parseInt(pointsToAdd) || 0;
    if (points > 0) {
      onSave(customer.id, points);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h3 className="text-lg font-semibold text-[#2C1A0E] mb-4">
          Ajouter des points à {customer.first_name} {customer.last_name}
        </h3>
        
        <div className="mb-4">
          <p className="text-sm text-[#A0785A]">
            Points actuels: <span className="font-semibold text-[#2C1A0E]">{customer.points}</span>
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#A0785A] mb-1">
              Nombre de points à ajouter
            </label>
            <input
              type="number"
              value={pointsToAdd}
              onChange={(e) => setPointsToAdd(e.target.value)}
              className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
              placeholder="Entrez le nombre de points"
              min="1"
            />
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              <strong>Nouveau total:</strong> {customer.points + (parseInt(pointsToAdd) || 0)} points
            </p>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={handleSave}
              disabled={!pointsToAdd || parseInt(pointsToAdd) <= 0}
              className="flex-1 bg-[#8B4513] text-white py-2 px-4 rounded-lg hover:bg-[#6b3410] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Ajouter
            </button>
            <button
              onClick={onClose}
              className="flex-1 border border-[#E8D5C0] text-[#2C1A0E] py-2 px-4 rounded-lg hover:bg-[#FFF8F0] transition-colors"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
