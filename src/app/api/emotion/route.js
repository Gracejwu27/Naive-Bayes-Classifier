import { NextResponse } from "next/server";
import emotionSentiment from "../../../../trainedEmotion";

export async function POST(request) {
  const { text } = await request.json();
  try{
    const results = emotionSentiment.predict(text);
    return NextResponse.json({
      sentiment: results.sentiment,
      confidence: results.maxLogProbability,
      probabilities: results.probabilities
    })
  }catch(error){
    console.error("Error predicting sentiment");
  }

}
