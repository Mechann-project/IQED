import { PDFDocument, rgb } from "pdf-lib";
// import data from "./1111jason.json";
import { IQTestResultTem1, Poppins_Bold } from "../../assets";
import * as fontkit from "fontkit";
import { erf } from 'mathjs';

const topicIds = {
  "Logical Reasoning": "67526dd396614be3a886aac6",
  "Verbal Comprehension": "67526dd396614be3a886aac7",
  "Working Memory": "67526dd396614be3a886aac8",
  "Spatial Reasoning": "67526dd396614be3a886aac9",
};

const feedbackThresholds = [
  { minScore: Infinity, feedback: "Excellent" },
  { minScore: 7, feedback: "Very Good" },
  { minScore: 5, feedback: "Good" },
  { minScore: 3, feedback: "Should Improve" },
  { minScore: -Infinity, feedback: "Need to Work Hard" },
];

const iqCategories = [
  { minIQ: 130, category: "Very High - (Gifted)", description: `With great power comes great responsibility.\nUse your gifts to make the world a better place.` },
  { minIQ: 120, category: "High Average", description: `Success is not about ability, but consistency.\nStay dedicated, and you'll surpass every expectation.` },
  { minIQ: 110, category: "Average - High", description: `Your potential lies in your determination.\nKeep challenging yourself to reach new heights.` },
  { minIQ: 90, category: "Average", description: `Every step forward counts, no matter\nhow small. Progress is progress—keep going!` },
  { minIQ: 80, category: "Below Average", description: `The only limits you have are the ones you set for yourself.\nBelieve in your ability to grow and thrive.` },
  { minIQ: 70, category: "Low Average", description: `Effort and perseverance are the keys to unlocking potential.\nEvery challenge you face makes you stronger.` },
  { minIQ: -Infinity, category: "Very Low", description: `The journey of a thousand miles begins with a single step.\nTake that step today and celebrate your progress.` },
];

// Calculate scores and results
function calculateScores(data) {
  console.log("data", data)
  if (!data || !data.answeredQuestions || !data.questionsList) {
    throw new Error("Invalid data. Please check the imported JSON file.");
  }

  const scores = {
    "Logical Reasoning": 0,
    "Verbal Comprehension": 0,
    "Working Memory": 0,
    "Spatial Reasoning": 0,
  };

  const totalQuestions = {
    "Logical Reasoning": 0,
    "Verbal Comprehension": 0,
    "Working Memory": 0,
    "Spatial Reasoning": 0,
  };

  data.questionsList.forEach((question) => {
    const topic = Object.keys(topicIds).find((key) =>
      question.topics.includes(topicIds[key])
    );
    if (topic) {
      totalQuestions[topic]++;
    }
  });

  // Calculate scores based on answeredQuestions
  if (data.answeredQuestions) {
    data.answeredQuestions.forEach((answered) => {
      const question = data.questionsList.find((q) => q._id === answered.questionId);
      if (question) {
        const topic = Object.keys(topicIds).find((key) =>
          question.topics.includes(topicIds[key])
        );
        if (topic && answered.correct) {
          scores[topic]++;
        }
      }
    });
  }

  const percentages = {};
  const feedback = {};
  let totalScore = 0;
  let totalPossible = 0;

  Object.keys(scores).forEach((topic) => {
    const percentage = ((scores[topic] / (totalQuestions[topic] || 1)) * 100).toFixed(2);
    percentages[topic] = percentage;

    const threshold = feedbackThresholds.find((t) => scores[topic] >= t.minScore);
    feedback[topic] = threshold ? threshold.feedback : "Unknown";

    totalScore += scores[topic];
    totalPossible += totalQuestions[topic];
  });

  const totalPercentage = ((totalScore / (totalPossible || 1)) * 100).toFixed(2);
 

  // Calculate z-score and percentage above the general population
  const mean = 100;
  const stdDev = 15;
  const userIQ = data.IQscore;
  const zScore = (userIQ - mean) / stdDev;
  const per = 0.5 + 0.5 * erf(zScore / Math.sqrt(2));
  const percentile = (per * 100).toFixed(2)


  const iqCategory = iqCategories.find((c) => userIQ >= c.minIQ);

  return {
    scores,
    percentages,
    feedback,
    totalScore,
    totalPossible,
    totalPercentage,
    userIQ,
    percentile,
    iqCategory,
    totalQuestions,
  };
}

// QuickChart API function for generating a chart image
async function generateChartImageQuickChart(data) {
  const chartConfig = {
    type: 'bar',
    data: {
      labels: ['Logical Reasoning', 'Verbal Comprehension', 'Working Memory', 'Spatial Reasoning'],
      datasets: [{
        label: 'IQ Topic Scores',
        data: [data.percentages['Logical Reasoning'], data.percentages['Verbal Comprehension'], data.percentages['Working Memory'], data.percentages['Spatial Reasoning']],
        // data: [50, 20, 80, 60],
        backgroundColor: 'rgb(255, 255, 255)',
      }],
    },
    options: {
      responsive: false,
      plugins: {
        legend: { display: false, },
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              suggestedMax: 100,
              color: 'green',
            },
          },
        ],
        xAxes: [{
          ticks: {
            color: 'green',
          },
        }],
      },

    },
  };
  const chartWidth = 570;
  const chartHeight = 200;
  const chartUrl = `https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify(chartConfig))}&width=${chartWidth}&height=${chartHeight}`;

  // Fetch the image from QuickChart API
  const response = await fetch(chartUrl);
  const imageArrayBuffer = await response.arrayBuffer(); // Use arrayBuffer instead of buffer in the browser
  const barImageBuffer = new Uint8Array(imageArrayBuffer); // Convert to Uint8Array

  return barImageBuffer;
}


// PDF generation function
async function generatePdf(name, reportData, imageData, barImageBuffer) {
  if (!reportData || !reportData.scores || !reportData.percentages || !reportData.feedback || !reportData.totalQuestions) {
    console.error("Missing expected report data:", reportData);
    throw new Error("Incomplete report data.");
  }

  console.log("report data:", reportData);


  const fontBytes = await fetch(Poppins_Bold).then((res) => res.arrayBuffer());
  const existingPdfBytes = await fetch(IQTestResultTem1).then((res) => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  pdfDoc.registerFontkit(fontkit);
  const customFont = await pdfDoc.embedFont(fontBytes);

  const page = pdfDoc.getPages()[0];
  const { width, height } = page.getSize();


  // Main header text
  const text = `Hello, ${name}!`;
  const textWidth = customFont.widthOfTextAtSize(text, 24);
  const x = (width - textWidth) / 2;
  const y = 550;

  page.drawText(text, {
    x,
    y,
    size: 24,
    color: rgb(1, 0.76, 0),
    font: customFont,
  });
  // IQ Score text
  const iqScoreText = `Your IQ Score is ${reportData.userIQ}`;
  const iqScoreTextWidth = customFont.widthOfTextAtSize(iqScoreText, 24);
  const iqScoreTextX = (width - iqScoreTextWidth) / 2;
  const iqScoreTextY = y - 24 - 10;

  page.drawText(iqScoreText, {
    x: iqScoreTextX,
    y: iqScoreTextY,
    size: 24,
    color: rgb(1, 1, 1),
    font: customFont,
  });

  // Embed the chart image
  const chartImageBytes = await fetch(imageData).then((res) => res.arrayBuffer());
  const chartImageData = await pdfDoc.embedPng(chartImageBytes);
  const chartWidth = 500;
  const chartHeight = 280;
  const chartX = (width - chartWidth) / 2;
  const chartY = (height - chartHeight) / 2 - 90;

  page.drawImage(chartImageData, {
    x: chartX,
    y: chartY,
    width: chartWidth,
    height: chartHeight,
  });

  //Words under the Chart
  const iqQuote = `"${reportData.iqCategory.description}"`;
  const iqQuoteTextY = 150;
  const lines = iqQuote.split('\n');
  lines.forEach((line, index) => {
    const lineWidth = customFont.widthOfTextAtSize(line, 15);
    const lineX = (width - lineWidth) / 2;
    page.drawText(line, {
      x: lineX,
      y: iqQuoteTextY - index * 20,
      size: 15,
      color: rgb(1, 1, 1),
      font: customFont,
    });
  });


  //Words for Score Average
  const iqTotal = `"${reportData.iqCategory.category}"`;
  const iqTotalTextWidth = customFont.widthOfTextAtSize(iqTotal, 20);
  const iqTotalTextX = (width - iqTotalTextWidth) / 2;

  page.drawText(iqTotal, {
    x: iqTotalTextX,
    y: 70,
    size: 20,
    color: rgb(0, 0, 0),
    font: customFont,
    align: 'center',
  });

  //Words for Score under
  const iqWords = `Your IQ is higher than ${reportData.percentile}% of the general population.`;
  const iqWordsTextWidth = customFont.widthOfTextAtSize(iqWords, 12);
  const iqWordsTextX = (width - iqWordsTextWidth) / 2;

  page.drawText(iqWords, {
    x: iqWordsTextX,
    y: 30,
    size: 12,
    color: rgb(1, 1, 1),
    font: customFont,
    align: 'center',
  });

  const page1 = pdfDoc.getPages()[1];
  //In the boxes
  const FirstRow = reportData.feedback['Logical Reasoning']
  const SecondRow = reportData.feedback['Verbal Comprehension']
  const ThirdRow = reportData.feedback['Working Memory']
  const FourthRow = reportData.feedback['Spatial Reasoning']
  const PercentileFeedbackx = 350
  page1.drawText(FirstRow, {
    x: PercentileFeedbackx,
    y: 685,
    size: 12,
    color: rgb(1, 1, 1),
    font: customFont,
  })

  page1.drawText(SecondRow, {
    x: PercentileFeedbackx,
    y: 640,
    size: 12,
    color: rgb(1, 1, 1),
    font: customFont,
  })

  page1.drawText(ThirdRow, {
    x: PercentileFeedbackx,
    y: 592,
    size: 12,
    color: rgb(1, 1, 1),
    font: customFont,
  })

  page1.drawText(FourthRow, {
    x: PercentileFeedbackx,
    y: 545,
    size: 12,
    color: rgb(1, 1, 1),
    font: customFont,
  })

  const FirstRowPercentage = `${reportData.percentages['Logical Reasoning']}%`
  const SecondRowPercentage = `${reportData.percentages['Verbal Comprehension']}%`
  const ThirdRowPercentage = `${reportData.percentages['Working Memory']}%`
  const FourthRowPercentage = `${reportData.percentages['Spatial Reasoning']}%`

  page1.drawText(FirstRowPercentage, {
    x: 520,
    y: 685,
    size: 12,
    color: rgb(1, 1, 1),
    font: customFont,
  })

  page1.drawText(SecondRowPercentage, {
    x: 520,
    y: 640,
    size: 12,
    color: rgb(1, 1, 1),
    font: customFont,
  })

  page1.drawText(ThirdRowPercentage, {
    x: 520,
    y: 590,
    size: 12,
    color: rgb(1, 1, 1),
    font: customFont,
  })

  page1.drawText(FourthRowPercentage, {
    x: 520,
    y: 545,
    size: 12,
    color: rgb(1, 1, 1),
    font: customFont,
  })

  //bar chart based on the topic scores 
  const barchartImageData = await pdfDoc.embedPng(barImageBuffer);
  const barchartWidth = 570;
  const barchartHeight = 200;
  const barchartX = (width - barchartWidth) / 2;
  const barchartY = (height - barchartHeight) / 2 - 10;

  page1.drawImage(barchartImageData, {
    x: barchartX,
    y: barchartY,
    width: barchartWidth,
    height: barchartHeight,
  });

  const topics = [
    { name: 'Logical Reasoning', percentage: reportData.percentages['Logical Reasoning'] },
    { name: 'Verbal Comprehension', percentage: reportData.percentages['Verbal Comprehension'] },
    { name: 'Working Memory', percentage: reportData.percentages['Working Memory'] },
    { name: 'Spatial Reasoning', percentage: reportData.percentages['Spatial Reasoning'] },
  ];
  
  // Sort topics by percentage in descending order
  const sortedTopics = topics.sort((a, b) => b.percentage - a.percentage);
  
  // Top 2 topics for strengths
  const topTwo = sortedTopics.slice(0, 2);
  const strengthsSentence = `Your ${topTwo[0].name} and ${topTwo[1].name} skills are particularly strong,\n showcasing excellent abilities in these areas.`;
  
  // Bottom 2 topics for improvements
  const bottomTwo = sortedTopics.slice(-2);
  const improvementsSentence = `Your ${bottomTwo[0].name} and ${bottomTwo[1].name} show potential for improvement and \ncould benefit from focused exercises to enhance performance.`;
  

  // Draw Strengths and Improvement Areas text
  const strengthsY = 230;
  const improvementAreasY = 140;

  page1.drawText(strengthsSentence, {
    x: 70,
    y: strengthsY - 20,
    size: 12,
    color: rgb(1, 1, 1),
    font: customFont,
  });

  page1.drawText(improvementsSentence, {
    x: 70,
    y: improvementAreasY - 20,
    size: 12,
    color: rgb(1, 1, 1),
    font: customFont,
  });


  const pdfBytes = await pdfDoc.save();
  const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });

  return pdfBlob; // Return the Blob
}



// Main function
export const generateIqReport = async (name, data, imageData) => {
  console.log("data", data)
  const reportData = calculateScores(data);
  const barImageBuffer = await generateChartImageQuickChart(reportData);
  const pdfBlob = await generatePdf(name, reportData, imageData, barImageBuffer);
  return pdfBlob;
};
