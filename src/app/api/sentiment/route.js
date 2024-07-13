import { NextResponse } from "next/server";
import trainedSentiment from "../../../../trainedSentiment";

export async function POST(request) {
  const { text } = await request.json();
  try{
    const results = trainedSentiment.predict(text);
    console.log(results);
    return NextResponse.json({
      sentiment: results.sentiment,
      confidence: results.maxLogProbability,
      probabilities: results.probabilities
    })
  }catch(error){
    console.error("Error predicting sentiment");
  }

}
