import React, { useState } from 'react';
import { usePasswords } from './hooks/usePasswords';
import { PasswordList } from './components/PasswordList';
import { AddPasswordModal } from './components/AddPasswordModal';
import { SearchBar } from './components/SearchBar';

function App() {
  const {
    passwords,
    searchTerm,
    setSearchTerm,
    addPassword,
    deletePassword,
    copyToClipboard,
  } = usePasswords();

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="password-manager">
      <div className="password-manager__container">
        <header className="password-manager__header">
          <div className="password-manager__logo-container">
            <svg 
              width="64" 
              height="64" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              className="password-manager__logo"
            >
              <path 
                d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M9 12l2 2 4-4" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="password-manager__title">Менеджер паролей</h1>
          <p className="password-manager__subtitle">
            Безопасное хранение и генерация паролей
          </p>
        </header>

        <div className="password-manager__main">
          <div className="password-manager__search-row">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn btn--primary"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 5v14M5 12h14" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Добавить пароль
            </button>
          </div>

          <PasswordList
            passwords={passwords}
            onCopy={copyToClipboard}
            onDelete={deletePassword}
          />
        </div>

        <footer className="password-manager__footer">
          Пароли хранятся локально в вашем браузере
        </footer>
      </div>

      <AddPasswordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addPassword}
      />
    </div>
  );
}

export default App;