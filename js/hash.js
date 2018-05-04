$(function () {
    $("#execButton").on('click', function(){
        lineByLineSha256();
    });
});

function lineByLineSha256() {
    var out = $("#outputText");
    out.val("");
    var inputText = $("#inputText").val();
    var inputArray = inputText.split(/\r\n|\r|\n/);
    var outputArray = [];
    for (let i = 0; i < inputArray.length; i++) {
        var hash = new jsSHA("SHA-256", "TEXT");
        hash.update(inputArray[i]);
        var out = $("#outputText");
        out.val(out.val() + hash.getHash("HEX") + "\n");
    }
}