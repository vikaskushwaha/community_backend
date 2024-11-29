function dateIndianFormat(currDate) {
    if (!(currDate instanceof Date)) {
        currDate = new Date(currDate);
    }
    const options = { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' };
    const formatInIndia = currDate.toLocaleDateString('en-IN', options);

    const [day, month, year] = formatInIndia.split('/');

    return `${year}-${month}-${day}`;
}

module.exports = {
    dateIndianFormat
}