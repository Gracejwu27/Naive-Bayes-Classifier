import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

const TextAnalyzer = require("/Users/gracewu/text_analyzer/textAnalyzer.js");
const fs = require('fs');
const csv = require('csv-parser');

export const POST = async (req, res) => {
  // Parse the incoming form data
  const formData = await req.formData();

  // Get the file from the form data
  const file = formData.get("file");

  // Check if a file is received
  if (!file) {
    // If no file is received, return a JSON response with an error and a 400 status code
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  // Convert the file data to a Buffer
  const buffer = Buffer.from(await file.arrayBuffer());

  // Replace spaces in the file name with underscores
  const filename = file.name.replaceAll(" ", "_");

  try {
    // Write the file to the specified directory (public/assets) with the modified filename
    await writeFile(
      path.join(process.cwd(), "/" + filename),
      buffer
    );
    global.trainedAnalyzer = new TextAnalyzer(); 
    fs.createReadStream(filename)
    .pipe(csv())
    .on('data',function(data){

        global.trainedAnalyzer.train([{
            text: data.text,
            label: data.label
        }]);
    })
    .on('end', () => {
        console.log("Vocab size:", trainedAnalyzer.vocab.size);
        console.log("Total quotes:", trainedAnalyzer.total_quotes);    
        console.log("Training Complete");
    });
    
    return NextResponse.json({ Message: "Success", status: 201 });
  } catch (error) {
    // If an error occurs during file writing, log the error and return a JSON response with a failure message and a 500 status code
    console.log("Error occurred ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};


