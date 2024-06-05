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