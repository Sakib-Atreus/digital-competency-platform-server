import { Types } from "mongoose"
import { TUserRole } from "../../constents"

type TInterviewsAvailable = number | 'unlimited';

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
    fcmToken?:string
}
  
  export type TProfile = {
    name: string;
    phone?: string;
    email: string;
    img?: string;
    isResumeUploaded:boolean;
    resume_id:Types.ObjectId;
    isAboutMeGenerated:boolean;
    generatedAboutMe:string
    isAboutMeVideoChecked:boolean;
    user_id: Types.ObjectId;
    isDeleted?: boolean;
  };