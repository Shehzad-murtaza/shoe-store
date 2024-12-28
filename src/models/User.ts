import mongoose, { Document, Schema } from 'mongoose';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface IUser extends Document {
  email: string;
  password: string;
  fullName: string;
  role: string;
  cart: Product[];
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  role: { type: String, required: true, default: 'user' },
  cart: { type: [{ id: Number, name: String, description: String, price: Number, imageUrl: String, quantity: Number }], default: [] },
});

export default mongoose.models.User || mongoose.model<IUser >('User ', UserSchema);