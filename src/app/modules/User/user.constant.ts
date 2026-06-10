import config from '../../config';
import { IAddress } from '../Address/address.interface';

export const ROLE = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
} as const;

export type TRole = keyof typeof ROLE;

export const AUTH_PROVIDER = {
  EMAIL: 'EMAIL',
  GOOGLE: 'GOOGLE',
  APPLE: 'APPLE',
} as const;

export type TAuthProvider = (typeof AUTH_PROVIDER)[keyof typeof AUTH_PROVIDER];

export type ValueOf<T> = T[keyof T];

export const defaultUserImage: string =
  'https://res.cloudinary.com/dweesppci/image/upload/v1746204369/wtmpcphfvexcq2ubcss0.png';

export const otpExpiryMinutes = Number(config.otp_expiry_minutes);

export type TDeactiveAccountPayload = {
  email: string;
  password: string;
  deactivationReason: string;
};

export type TUpdateUserPayload = {
  name: string;
  address?: string;
  phone: string;
  dateOfBirth?: string;
  addresses?: Partial<IAddress>[];
};
