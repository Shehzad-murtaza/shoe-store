import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  email: string;
  fullName: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;