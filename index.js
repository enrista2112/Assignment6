/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

// Import the inquirer npm package
import inquirer from "inquirer";
// Import the qr-image npm package
import qr from "qr-image";
// Import the fs node module
import fs from "fs";

// Ask the user to enter a URL
inquirer
    .prompt([
        {
            type: "input",
            name: "url",
            message: "Enter a URL:",
        },
    ])
    .then((answers) => {
        // Create the txt file to save the user input
        fs.writeFile("URL.txt", answers.url, (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log("User input saved to URL.txt");

                // Generate the QR code image
                const qrCode = qr.image(answers.url, { type: "png" });
                // Create and write into the png file
                qrCode.pipe(fs.createWriteStream("qr_img.png"));
            }
        });
    });