export interface GoogleToken {
    access_token: string,
    expires_in: number,
    refresh_token: string,
    scope: string,
    token_type: string,
    id_token: string,
}
export interface TokenInfo {
    email:string,
    email_verified: string,
    name:string,
    picture: string,
    given_name: string,
    family_name:string,
}
