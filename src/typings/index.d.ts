export interface User {
  name: string;
  email: string;
  role: string;
  password: string;
  googleId: string;
}

export interface Accommodation {
  name: string;
  host: string;
  description: string;
  maxGuests: number;
  city: string;
}
