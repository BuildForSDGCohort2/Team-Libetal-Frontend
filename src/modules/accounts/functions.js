function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}



function daysDifference(maxDate,minDate){
    maxDate = maxDate.getTime();
    minDate = minDate.getTime();

    return (maxDate - minDate) / (1000 * 3600 * 24);

}
function daysAbsDifference(maxDate, minDate) {
    // Disregard order of max  or mean passed
    return Math.abs(daysDifference(maxDate,minDate));
}