exports.getCurrencySymbol = (currencyType) => {
    switch (currencyType) {
        case "INR":
            return "₹";
        case "USD":
            return "$";

        default:
            break;
    }
}