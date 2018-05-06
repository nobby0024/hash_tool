$(function () {
    $("#inputFile").on("change", function() {
        var file = this.files[0];
        if (file != null) {
            $("#downloadBtn").prop("disabled", false);
        } else  {
            $("#downloadBtn").prop("disabled", true);
        }
    })
    $("#downloadBtn").on('click', function(){
        isProcessing(true);
        downloadHashedFile();
    });
});

function downloadHashedFile() {
    var maxLineNumber = 1000000;
    var file = $("#inputFile")[0].files[0];
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function() {
        var output = "";
        var lineArr = reader.result.split(/\r\n|\r|\n/);
        if (lineArr[lineArr.length - 1] == "") {
            lineArr.pop();
        }

        for (var i = 0; i < lineArr.length; i++) {
            if (i > maxLineNumber - 1) {
                window.confirm("The number of lines in the file is too large. Please divide into small files under " + maxLineNumber + " line numbers.");
                isProcessing(false);
                return;
            }
            var hash = new jsSHA("SHA-256", "TEXT");
            hash.update(lineArr[i]);
            output += hash.getHash("HEX");
            output += "\r\n";
        }
        savefile(output, 'hashed_' + file.name);
    }
}

function savefile(content, savename) {
    var blob = new Blob([content], { type: 'text/plain' });
    window.URL = window.URL || window.webkitURL;
    var ref = window.URL.createObjectURL(blob);
    $("#downloadBtn").after('<a id="downloadLink">download start</a>');
    $("#downloadLink").attr('href', ref);
    $("#downloadLink").attr('download', savename);
    $("#downloadLink")[0].click();
    $("#downloadLink").remove();
    isProcessing(false);
}

function isProcessing(flg) {
    if (flg) {
        // hash process start
        $("#downloadBtn").text("Processing...");
        $("#downloadBtn").prop("disabled", true);
        $("#inputFile").prop("disabled", true);
        $("#statusText").show();
    } else {
        // hash process finish
        $("#downloadBtn").text("Download");
        $("#downloadBtn").prop("disabled", $("#inputFile")[0].files[0] == null);
        $("#inputFile").prop("disabled", false);
    }
}
