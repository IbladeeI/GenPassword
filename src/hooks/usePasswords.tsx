import { useState, useEffect } from 'react';
import { PasswordEntry } from '../types';

export const usePasswords = () => {
  const [passwords, setPasswords] = useState<PasswordEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Загрузка паролей 
  useEffect(() => {
    const saved = localStorage.getItem('passwordManager');
    if (saved) {
      try {
        const parsed = JSON.parse(saved).map((item: any) => ({
          ...item,
          createdAt: new Date(item.createdAt),
        }));
        setPasswords(parsed);
      } catch (error) {
        console.error('Error loading passwords:', error);
      }
    }
  }, []);

  // Сохранение  при изменении
  useEffect(() => {
    localStorage.setItem('passwordManager', JSON.stringify(passwords));
  }, [passwords]);

  const addPassword = async (service: string, password: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const success = Math.random() > 0.5;
        
        if (success) {
          const newEntry: PasswordEntry = {
            id: Date.now().toString(),
            service,
            password,
            createdAt: new Date(),
          };
          setPasswords(prev => [...prev, newEntry]);
        }
        
        resolve(success);
      }, 1000);
    });
  };

  const deletePassword = async (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const success = Math.random() > 0.5;
        
        if (success) {
          setPasswords(prev => prev.filter(item => item.id !== id));
        }
        
        resolve(success);
      }, 1000);
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const filteredPasswords = passwords.filter(entry =>
    entry.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    passwords: filteredPasswords,
    searchTerm,
    setSearchTerm,
    addPassword,
    deletePassword,
    copyToClipboard,
  };
};