export const baseUrl = process.env.REACT_APP_BASE_URL;

export const formatDate = (date) => {
    if (!date) return;
    const dateObject = new Date(date);
    const formattedDate = dateObject.toISOString().split('T')[0];
    return formattedDate
}

export const formatMoney = (money) => {
    if (!money) return ""
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
    return "https://www.youtube.com/embed/" + returnUrl
}