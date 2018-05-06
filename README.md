Line by line hasing tool
====
You can download hashed inputted file.
Whan you click "Download", the input file is read in, hash the value line by line.
This was made for my private very simple tasks.

## Description
This tool uses jsSHA library. (https://github.com/Caligatio/jsSHA)

### Example
#### input file
```
AAA 
BBB
CCC 
```
### -> You can download following.
```
cb1ad2119d8fafb69566510ee712661f9f14b83385006ef92aec47f523a38358
dcdb704109a454784b81229d2b05f368692e758bfa33cb61d04c1b93791b0273
8c55ff95a660f37cb05e644e7691e6c66593f453cb2cbaa4d64aa59b40ae8032
```
### Remark
* Ragarding input file's line separator, either "CSRF" or "LF" is fine.
* Terminating newline is ignored.
* If the input file's line number is over 1,000,000, you have to divide into small files.

## Demo
[https://nobby0024.github.io/hash_tool/](https://nobby0024.github.io/hash_tool/)

