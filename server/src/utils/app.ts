export enum Device{COMPUTER, MOBILE, TABLET}

export const getDevice = () => {
    const deviceOS = process.env.OS
    
    return Device.COMPUTER
}

export const getFileExtension = (file: string | null): string | Error  => {
    if (!file) {
        throw new Error('No file name received!')
    }
    
    const fileExtension = file.match(/(?<=\.)[a-z]{3}$/)

    if (!fileExtension) {
        throw new Error('File could not be parsed!')
    }

    return fileExtension[0]
}