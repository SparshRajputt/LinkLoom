import mongoose from "mongoose";
declare const User: mongoose.Model<{
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}, {}, mongoose.DefaultSchemaOptions> & {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
declare const Content: mongoose.Model<{
    userId: mongoose.Types.ObjectId;
    title: string;
    content: string;
    createdAt: NativeDate;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    title: string;
    content: string;
    createdAt: NativeDate;
}, {}, mongoose.DefaultSchemaOptions> & {
    userId: mongoose.Types.ObjectId;
    title: string;
    content: string;
    createdAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    userId: mongoose.Types.ObjectId;
    title: string;
    content: string;
    createdAt: NativeDate;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    title: string;
    content: string;
    createdAt: NativeDate;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    title: string;
    content: string;
    createdAt: NativeDate;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
declare const ShareContent: mongoose.Model<{
    createdAt: NativeDate;
    contentId: mongoose.Types.ObjectId;
    shareLink: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    contentId: mongoose.Types.ObjectId;
    shareLink: string;
}, {}, mongoose.DefaultSchemaOptions> & {
    createdAt: NativeDate;
    contentId: mongoose.Types.ObjectId;
    shareLink: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    createdAt: NativeDate;
    contentId: mongoose.Types.ObjectId;
    shareLink: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    contentId: mongoose.Types.ObjectId;
    shareLink: string;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    contentId: mongoose.Types.ObjectId;
    shareLink: string;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export { User, Content, ShareContent };
//# sourceMappingURL=db.d.ts.map