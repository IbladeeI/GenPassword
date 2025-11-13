import React, { useState, useEffect } from 'react';
import { generatePassword } from '../utils/passwordGenerator';
import { PasswordGeneratorOptions } from '../types';

interface PasswordGeneratorProps {
  onGenerate: (password: string) => void;
}

export const PasswordGenerator: React.FC<PasswordGeneratorProps> = ({ onGenerate }) => {
  const [options, setOptions] = useState<PasswordGeneratorOptions>({
    length: 12,
    useLetters: true,
    useNumbers: true,
    useSpecialChars: false,
    useUppercase: true,
    useLowercase: true,
    useRandomCase: false,
    customChars: '',
  });

  const [generatedPassword, setGeneratedPassword] = useState('');

  useEffect(() => {
    generateNewPassword();
  }, [options]);

  const generateNewPassword = () => {
    const password = generatePassword(options);
    setGeneratedPassword(password);
  };

  const handleUseCustomChars = (useCustom: boolean) => {
    if (useCustom) {
      setOptions(prev => ({
        ...prev,
        useLetters: false,
        useNumbers: false,
        useSpecialChars: false,
        useUppercase: false,
        useLowercase: false,
        useRandomCase: false,
        customChars: prev.customChars || 'abcdefghijklmnopqrstuvwxyz',
      }));
    } else {
      setOptions(prev => ({
        ...prev,
        customChars: '',
        useLetters: true,
        useNumbers: true,
        useLowercase: true,
        useUppercase: true,
      }));
    }
  };

  return (
    <div className="generator-panel">
      <div className="generator-header">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h3 className="generator-title">Генератор паролей</h3>
      </div>
      
      <div className="generator-options">
        <div className="option-group">
          <label className="option-label">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Длина: {options.length}
          </label>
          <input
            type="range"
            min="4"
            max="32"
            value={options.length}
            onChange={(e) => setOptions(prev => ({ ...prev, length: parseInt(e.target.value) }))}
            className="length-slider"
          />
        </div>

        <div className="option-checkbox">
          <input
            type="checkbox"
            checked={!!options.customChars}
            onChange={(e) => handleUseCustomChars(e.target.checked)}
            id="custom-chars"
          />
          <label htmlFor="custom-chars">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Использовать свои символы
          </label>
        </div>

        {options.customChars ? (
          <div className="custom-chars-input">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              value={options.customChars}
              onChange={(e) => setOptions(prev => ({ ...prev, customChars: e.target.value }))}
              placeholder="Введите символы для генерации"
              className="form-input"
            />
          </div>
        ) : (
          <>
            <div className="option-grid">
              <div className="option-checkbox">
                <input
                  type="checkbox"
                  checked={options.useLetters}
                  onChange={(e) => setOptions(prev => ({ ...prev, useLetters: e.target.checked }))}
                  id="use-letters"
                />
                <label htmlFor="use-letters">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 19l7-7 3 3-7 7-3-3z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 2l7.586 7.586" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Буквы
                </label>
              </div>
              
              <div className="option-checkbox">
                <input
                  type="checkbox"
                  checked={options.useNumbers}
                  onChange={(e) => setOptions(prev => ({ ...prev, useNumbers: e.target.checked }))}
                  id="use-numbers"
                />
                <label htmlFor="use-numbers">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M17 5H9.5a3.5 3.5 0 000 7h6a3.5 3.5 0 010 7H6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Цифры
                </label>
              </div>
              
              <div className="option-checkbox">
                <input
                  type="checkbox"
                  checked={options.useSpecialChars}
                  onChange={(e) => setOptions(prev => ({ ...prev, useSpecialChars: e.target.checked }))}
                  id="use-special"
                />
                <label htmlFor="use-special">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Спецсимволы
                </label>
              </div>

              <div className="option-checkbox">
                <input
                  type="checkbox"
                  checked={options.useRandomCase}
                  onChange={(e) => setOptions(prev => ({ ...prev, useRandomCase: e.target.checked }))}
                  id="use-random-case"
                />
                <label htmlFor="use-random-case">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Случайный регистр
                </label>
              </div>
            </div>

            {!options.useRandomCase && (
              <div className="option-grid">
                <div className="option-checkbox">
                  <input
                    type="checkbox"
                    checked={options.useLowercase}
                    onChange={(e) => setOptions(prev => ({ ...prev, useLowercase: e.target.checked }))}
                    id="use-lowercase"
                  />
                  <label htmlFor="use-lowercase">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Нижний регистр
                  </label>
                </div>
                
                <div className="option-checkbox">
                  <input
                    type="checkbox"
                    checked={options.useUppercase}
                    onChange={(e) => setOptions(prev => ({ ...prev, useUppercase: e.target.checked }))}
                    id="use-uppercase"
                  />
                  <label htmlFor="use-uppercase">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M7 16V4h10v12M7 16c0 2.5 2 4 5 4s5-1.5 5-4M7 16H2m20 0h-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Верхний регистр
                  </label>
                </div>
              </div>
            )}
          </>
        )}

        <div className="password-preview">
          <div className="preview-header">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeWidth="2"/>
              <path d="M7 11V7a5 5 0 0110 0v4" strokeWidth="2"/>
            </svg>
            <span>Сгенерированный пароль:</span>
          </div>
          <div className="password-display">
            <input
              type="text"
              value={generatedPassword}
              readOnly
              className="password-output"
            />
            <button
              onClick={generateNewPassword}
              className="btn btn--secondary"
              title="Сгенерировать новый"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <button
          onClick={() => onGenerate(generatedPassword)}
          className="btn btn--success generator-submit"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Использовать этот пароль
        </button>
      </div>
    </div>
  );
};