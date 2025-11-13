export interface PasswordEntry {
  id: string;
  service: string;
  password: string;
  createdAt: Date;
}

export interface PasswordGeneratorOptions {
  length: number;
  useLetters: boolean;
  useNumbers: boolean;
  useSpecialChars: boolean;
  useUppercase: boolean;
  useLowercase: boolean;
  useRandomCase: boolean;
  customChars?: string;
}