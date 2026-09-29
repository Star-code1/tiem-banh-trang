import dns from 'node:dns';import mongoose from 'mongoose';import {User,Session,MediaAsset} from './models.js';
try{dns.setServers(['8.8.8.8','1.1.1.1']);}catch{}
export async function connectDatabase(uri){await mongoose.connect(uri,{serverSelectionTimeoutMS:10000,maxPoolSize:10});await Promise.all([User.init(),Session.init(),MediaAsset.init()]);}
export const closeDatabase=()=>mongoose.disconnect();
