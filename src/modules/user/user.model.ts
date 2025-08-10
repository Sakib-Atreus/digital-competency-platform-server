import bcrypt from 'bcrypt';
import mongoose, { Schema, model } from 'mongoose';
import { TProfile, TUser } from './user.interface';
import { userRole } from '../../constents';
import { date } from 'zod';

const UserSchema = new Schema<TUser>(
  {
    name: { type: String, required: false, default: 'user' },
    phone: { type: String, required: false, unique: false },
    email: { type: String, required: false, unique: false },
    password: { type: String, required: false },
    confirmPassword: { type: String, required: false },
    role: { type: String, enum: ['admin', 'user'], default: userRole.user },
    aggriedToTerms: { type: Boolean, required:false, default: false },
    allowPasswordChange:{ type: Boolean, default: false },
    sentOTP: { type: String, required: false, unique: false, default: null },
    OTPverified: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    isLoggedIn: { type: Boolean, default: false },
    loggedOutTime: { type: Date },
    passwordChangeTime: { type: Date },
    fcmToken:{type:String,required:false, default:null}
  },
  { timestamps: true },
);

const ProfileSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: false },
    email: { type: String, required: false, unique: false },
    img: { type: String, default: "https://res.cloudinary.com/dpgcpei5u/image/upload/v1747546759/interviewProfile_jvo9jl.jpg" },
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'UserCollection',
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Hash only if password is modified

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    return next(error);
  }
});

export const UserModel = mongoose.model('UserCollection', UserSchema);
export const ProfileModel =  mongoose.model('Profile', ProfileSchema);
