export const baseUrl = 'http://localhost:3008/';

export const formatDate = (date) => {
    const dateObject = new Date(date);
    const formattedDate = dateObject.toISOString().split('T')[0];
    return formattedDate
}

export const formatMoney = (money) => {
    let USDollar = new Intl.NumberFormat('en-VN', {
        style: 'currency',
        currency: 'VND',
    });
    return USDollar.format(money)
}

export function getId(url) {
    if (!url) return "";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const returnUrl = (match && match[2].length === 11) ? match[2] : null;
    console.log("https://www.youtube.com/embed/" + returnUrl + "?si=9pDPUza4DZNbAzK1");
    return "https://www.youtube.com/embed/" + returnUrl
}