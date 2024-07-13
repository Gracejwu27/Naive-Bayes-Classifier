import { NextResponse } from "next/server";

const TextAnalyzer = require("/Users/gracewu/text_analyzer/textAnalyzer.js");

export async function POST(request) {
  const quotes  = await request.json();
  global.trainedTextAnalyzer = new TextAnalyzer(); 
  try{
    //console.log(quotes)
    global.trainedTextAnalyzer.train(quotes);

    console.log("Vocab size:", global.trainedTextAnalyzer.vocab.size);
    console.log("Total quotes:", global.trainedTextAnalyzer.total_quotes);    
    console.log("Training Complete");
    
    return NextResponse.json({
        message: "Success",
    })
  }catch(error){
    console.error("Error predicting sentiment");
    return NextResponse.json({
        Message: "Error"
    })
  }
}
