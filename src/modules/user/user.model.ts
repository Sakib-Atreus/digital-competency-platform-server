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
    role: {
      type: String,
      enum: ['admin', 'supervisor', 'student'],
      default: userRole.student,
    },
    aggriedToTerms: { type: Boolean, required: false, default: false },
    allowPasswordChange: { type: Boolean, default: false },
    sentOTP: { type: String, required: false, unique: false, default: null },
    OTPverified: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    isLoggedIn: { type: Boolean, default: false },
    loggedOutTime: { type: Date },
    passwordChangeTime: { type: Date },
  },
  { timestamps: true },
);
const ExamResultSchema = new Schema({
  step: { type: Number, enum: [1, 2, 3], required: true },
  score: { type: Number, default: null },
  certifiedLevel: {
    type: String,
    enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Fail', null],
    default: null,
  },
  completedAt: { type: Date, default: Date.now },
});

const ExamProgressSchema = new Schema({
  currentStep: { type: Number, enum: [1, 2, 3], default: 1 },
  finalLevel: {
    type: String,
    enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Fail', null],
    default: null,
  },
  hasCompleted: { type: Boolean, default: false },
  results: { type: [ExamResultSchema], default: [] },
  retakesUsed: { type: Number, default: 0 },
});

const ProfileSchema = new Schema<TProfile>(
  {
    name: { type: String, required: true },
    phone: { type: String },
    email: { type: String },
    img: {
      type: String,
      default:
        'https://res.cloudinary.com/dpgcpei5u/image/upload/v1747546759/interviewProfile_jvo9jl.jpg',
    },
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'UserCollection',
    },
    isDeleted: { type: Boolean, default: false },
    examProgress: { type: ExamProgressSchema, default: () => ({}) },
  },
  { timestamps: true },
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
export const ProfileModel = mongoose.model('Profile', ProfileSchema);
