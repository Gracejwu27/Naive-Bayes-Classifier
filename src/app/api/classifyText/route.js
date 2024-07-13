import { NextResponse } from "next/server";
//import { trainedAnalyzer } from "../upload/route";

export async function POST(request) {
  const { text } = await request.json();
  try{
    const results = global.trainedTextAnalyzer.predict(text);
    return NextResponse.json({
      sentiment: results.sentiment,
      confidence: results.maxLogProbability,
      probabilities: results.probabilities
    })
  }catch(error){
    console.error(global.trainedAnalyzer.predict(text))
    console.error("Error predicting sentiment");
    return NextResponse.json({
        Message: error 
    })
  }
}
