export type TUserRole = 'admin' | 'supervisor' | 'student';

export const userRole = {
  student: 'student',
  supervisor: 'supervisor',
  admin: 'admin',
} as const;

export type TErrorSource = {
  path: string | number;
  message: string;
}[];
