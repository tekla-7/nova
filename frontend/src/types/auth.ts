export interface Registration {
    email: string,
    name: string,
    lastName:string,
    phoneNumber: string,
    password:string,
    recoveryPhrase:string,
}
export interface ResetPasswordReq {
    password: string,
    email: string,
    recoveryPhrase: string,
}
export type ActionData = {
    message?: string;
    errors?: Record<string, string>;
};