import mongoose from 'mongoose';import {User,Session,MediaAsset} from './models.js';
export async function connectDatabase(uri){await mongoose.connect(uri,{serverSelectionTimeoutMS:10000,maxPoolSize:10});await Promise.all([User.init(),Session.init(),MediaAsset.init()]);}
export const closeDatabase=()=>mongoose.disconnect();
