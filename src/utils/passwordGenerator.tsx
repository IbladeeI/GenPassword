import { PasswordGeneratorOptions } from '../types';

const LETTERS = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SPECIAL_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

export const generatePassword = (options: PasswordGeneratorOptions): string => {
  let charset = '';
  let password = '';

  if (options.customChars && options.customChars.length > 0) {
    charset = options.customChars;
  } else {
    if (options.useLetters) {
      if (options.useLowercase) charset += LETTERS;
      if (options.useUppercase) charset += LETTERS.toUpperCase();
      if (options.useRandomCase) charset += LETTERS + LETTERS.toUpperCase();
    }
    if (options.useNumbers) charset += NUMBERS;
    if (options.useSpecialChars) charset += SPECIAL_CHARS;
  }

  if (charset.length === 0) {
    charset = LETTERS + LETTERS.toUpperCase() + NUMBERS;
  }

  for (let i = 0; i < options.length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    let char = charset[randomIndex];

    if (options.useRandomCase && /[a-zA-Z]/.test(char)) {
      char = Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();
    }

    password += char;
  }

  return password;
};