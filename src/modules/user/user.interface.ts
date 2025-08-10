import { Types } from "mongoose"
import { TUserRole } from "../../constents"

export type TExamProgress = {
  currentStep: 1 | 2 | 3;
  finalLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'Fail' | null;
  hasCompleted: boolean;
  results: {
    step: 1 | 2 | 3;
    score: number;
    certifiedLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'Fail';
    completedAt: Date;
  }[];
  retakesUsed: number;
};

export type TUser={
    name:string,
    phone?:string,
    email:string,
    password:string,
    confirmPassword?:string
    aggriedToTerms:boolean,
    role:TUserRole,
    allowPasswordChange:boolean
    sentOTP:string,
    OTPverified:boolean  
    isDeleted?:string,
    isBlocked?:boolean,
    isLoggedIn?:boolean,
    loggedOutTime?:Date
    passwordChangeTime?:Date
}
  
export type ExamResult = {
  step: 1 | 2 | 3;
  score: number | null;
  certifiedLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'Fail' | null;
  completedAt: Date;
};

export type ExamProgress = {
  currentStep: 1 | 2 | 3;
  finalLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'Fail' | null;
  hasCompleted: boolean;
  results: ExamResult[];
  retakesUsed: number;
};

export type TProfile = {
  name: string;
  phone?: string;
  email?: string;
  img?: string;
  user_id: Types.ObjectId;
  isDeleted?: boolean;
  examProgress?: ExamProgress;
};