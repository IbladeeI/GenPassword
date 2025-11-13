import React, { useState } from 'react';
import { PasswordEntry } from '../types';

interface PasswordListProps {
  passwords: PasswordEntry[];
  onCopy: (password: string) => void;
  onDelete: (id: string) => Promise<boolean>;
}

export const PasswordList: React.FC<PasswordListProps> = ({
  passwords,
  onCopy,
  onDelete,
}) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    const success = await onDelete(id);
    setDeletingId(null);
    
    if (!success) {
      alert('Ошибка при удалении. Пожалуйста, попробуйте еще раз.');
    }
  };

  if (passwords.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Нет сохраненных паролей
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {passwords.map((entry) => (
        <div
          key={entry.id}
          className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{entry.service}</h3>
              <p className="text-sm text-gray-500 font-mono mt-1">
                {'•'.repeat(12)}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Добавлен: {entry.createdAt.toLocaleDateString()}
              </p>
            </div>
            
            <div className="flex space-x-2 ml-4">
              <button
                onClick={() => onCopy(entry.password)}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                title="Копировать пароль"
              >
                Копировать
              </button>
              
              <button
                onClick={() => handleDelete(entry.id)}
                disabled={deletingId === entry.id}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 disabled:opacity-50 transition-colors"
                title="Удалить"
              >
                {deletingId === entry.id ? '...' : 'Удалить'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};