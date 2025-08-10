export type TUserRole = 'admin' | 'student';

export const userRole = {
  student: 'student',
  supervisor: 'supervisor',
  admin: 'admin',
} as const;

export type TErrorSource = {
  path: string | number;
  message: string;
}[];
