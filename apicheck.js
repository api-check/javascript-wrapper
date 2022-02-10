class ApiCheck {
    constructor(apiKey){
        var baseUrl = "https://api.apicheck.nl/";
        var get = new XMLHttpRequest();
        /**
         * @param apiKey - Your private API key
         * */
        this.apiKey = apiKey;

        /**
         * @param countryCode - Country code
         * @param postalcode - The postal code you want to check
         * @param number - The house number you want to check
         * @param numberAddition - The number addition you want to check
         * @return - a JSONObject with details
         * */
        this.lookupPostalcode = function(countryCode, postalcode, number, numberAddition){
            var uri = baseUrl + "lookup/v1/postalcode/"+countryCode+"?postalcode=" + postalcode + "&number=" + number;
            get.open('GET', uri, false);
            get.setRequestHeader("x-api-key", this.apiKey);
            get.send();
            if (get.readyState == 4 && get.status == 200) {
                return get.responseText;
            }
        }
    }
}