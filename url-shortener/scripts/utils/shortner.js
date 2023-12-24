import { customAlphabet } from 'nanoid';


function generateShortUrl(url) {
    const id = customAlphabet(url, 5)
    return id
}

export default { generateShortUrl }