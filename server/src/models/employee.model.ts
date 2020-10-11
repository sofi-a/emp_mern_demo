import mongoose, { Document, Schema } from 'mongoose';

export enum Gender {
    male = 'male',
    female = 'female'
}

export interface IEmployee extends Document {
    name: string;
    name_lc: string;
    dob: Date;
    gender: Gender;
    salary: number;
}

const EmployeeSchema = new Schema({
    name: { type: String, required: true },
    name_lc: { type: String, index: true },
    dob: { type: Date, required: true },
    gender: { type: String, enum: Object.values(Gender), required: true },
    salary: { type: Number, required: true }
});

export default mongoose.model<IEmployee>('employee', EmployeeSchema);
