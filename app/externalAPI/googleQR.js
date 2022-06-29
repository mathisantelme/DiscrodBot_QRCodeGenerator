const GOOGLE_API_URL = 'https://chart.googleapis.com/chart?cht=qr';

module.exports = {
    generateQR (url, height, width) {
        if (!url) {
            throw new Error('An url must be provided');
        }

        return `${GOOGLE_API_URL}&chl="${data}"${height && width ? "&chs=" + height + "x" + width :"&chs=200x200"}`;
    }
}