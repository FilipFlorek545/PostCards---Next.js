
export const truncate = (contentString:string, letters:number) => {
    return contentString.length > letters ? (contentString).substring(0, letters) + '...' : contentString
}