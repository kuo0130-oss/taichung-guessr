import {
  useState,
  useEffect
} from "react";

import Map from "./components/Map";

import questions from "./data/questions.json";

import { getStreetViewImage } from "./api/streetview";

import {
  calculateDistance,
  calculateScore
} from "./utils/distance";


function App() {


  const [questionList] =
    useState(
      [...questions].sort(
        ()=>Math.random()-0.5
      )
    );


  const [questionIndex,setQuestionIndex] =
    useState(0);


  const [currentQuestion,setCurrentQuestion] =
    useState(null);


  const [streetViewImage,setStreetViewImage] =
    useState("");


  const [guessPosition,setGuessPosition] =
    useState(null);


  const [result,setResult] =
    useState(null);


  const [questionNumber,setQuestionNumber] =
    useState(1);


  const [totalScore,setTotalScore] =
    useState(0);


  const [totalDistance,setTotalDistance] =
    useState(0);


  const [gameStarted,setGameStarted] =
    useState(false);


  const [gameFinished,setGameFinished] =
    useState(false);



  useEffect(()=>{

    setCurrentQuestion(
      questionList[0]
    );

  },[]);




  function loadStreetView(question){

    const url =
      getStreetViewImage(
        question.lat,
        question.lng
      );


    setStreetViewImage(url);

  }





  useEffect(()=>{

    if(currentQuestion){

      loadStreetView(
        currentQuestion
      );

    }

  },[currentQuestion]);






  function randomQuestion(){


    if(questionNumber >= 10){


      if(!result){

        alert(
          "請先完成本題"
        );

        return;

      }


      setGameFinished(true);

      return;

    }




    const nextIndex =
      questionIndex + 1;



    setQuestionIndex(
      nextIndex
    );


    setCurrentQuestion(
      questionList[nextIndex]
    );


    setGuessPosition(null);


    setResult(null);


    setQuestionNumber(
      questionNumber + 1
    );


  }







  function submitAnswer(){


    if(!guessPosition){

      alert(
        "請先點擊地圖猜位置"
      );

      return;

    }





    const distance =
      calculateDistance(

        guessPosition.lat,

        guessPosition.lng,

        currentQuestion.lat,

        currentQuestion.lng

      );





    const score =
      calculateScore(
        distance
      );





    setResult({

      distance:
        Math.round(distance),

      score,

      name:
        currentQuestion.name,

      road:
        currentQuestion.road,

      description:
        currentQuestion.description

    });





    setTotalScore(
      totalScore + score
    );


    setTotalDistance(
      totalDistance +
      Math.round(distance)
    );


  }






let level="";


if(totalScore >=9000){

level="🏆 台中達人";

}
else if(totalScore >=7000){

level="🥇 熟悉台中";

}
else if(totalScore >=5000){

level="🥈 生活圈探索者";

}
else{

level="🥉 台中新朋友";

}






if(!gameStarted){


return (

<div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">


<div className="bg-white rounded-xl p-10 text-center max-w-md">


<h1 className="text-2xl md:text-4xl font-bold mb-6">

🏠 台中商耕 Challenge

</h1>


<p className="text-gray-600 mb-8">

探索台中各大生活圈、重劃區與商圈周邊

<br/>

挑戰你對台中的熟悉程度

</p>



<p>
📍 30 個城市題庫
</p>


<p>
🎯 每局 10 題挑戰
</p>


<p className="mb-8">
🏆 距離越近分數越高
</p>



<button

onClick={()=>setGameStarted(true)}

className="bg-green-500 text-white px-10 py-4 rounded-xl text-xl font-bold"

>

開始挑戰

</button>



</div>

</div>

);

}







if(gameFinished){


return (

<div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">


<div className="bg-white rounded-xl p-10 text-center">


<h1 className="text-3xl font-bold mb-6">

🎉 挑戰完成

</h1>


<p className="text-xl mb-4">

你的總分：

<b>
{totalScore}
</b>

分

</p>



<p className="mb-4">

平均距離：

<b>

{
Math.round(
totalDistance/10
)
}

</b>

公尺

</p>



<h2 className="text-2xl font-bold mb-6">

{level}

</h2>



<button

onClick={()=>window.location.reload()}

className="bg-green-500 text-white px-8 py-3 rounded-xl"

>

再挑戰一次

</button>




<button

onClick={()=>{

navigator.clipboard.writeText(

`我在台中商耕 Challenge 得到 ${totalScore} 分！${level}`

);

alert("成績已複製");

}}

className="bg-blue-500 text-white px-8 py-3 rounded-xl mt-3 md:mt-0 md:ml-3"

>

分享成績

</button>



</div>

</div>

);

}








return (

<div className="min-h-screen bg-slate-900 p-4 md:p-8">


<h1 className="text-2xl md:text-4xl font-bold text-white text-center mb-8">

🏠 台中商耕 Guessr

</h1>




<div className="grid grid-cols-1 md:grid-cols-2 gap-6">



<div className="bg-white rounded-xl p-6">


<h2 className="text-xl font-bold mb-4">

第 {questionNumber} / 10 題

</h2>



<div className="flex gap-1 mb-4">

{
Array.from({length:10})
.map((_,i)=>(

<div

key={i}

className={
i < questionNumber
?
"bg-green-500 h-2 flex-1 rounded"
:
"bg-gray-300 h-2 flex-1 rounded"
}

></div>

))
}

</div>




{
streetViewImage && (

<img

src={streetViewImage}

className="w-full h-[300px] md:h-[400px] object-cover rounded-lg"

/>

)

}




<p className="mt-4">

地區：

{currentQuestion?.district}

</p>



</div>







<div>


<Map

setGuessPosition={setGuessPosition}

guessPosition={guessPosition}

answerPosition={

result
?
{
lat:currentQuestion.lat,
lng:currentQuestion.lng
}
:
null

}

/>





{
result && (

<div className="mt-4 bg-green-100 rounded-xl p-5">


<h3 className="font-bold text-xl">

🎯 答案揭曉

</h3>


<p>

📍 {result.name}

</p>


<p>

🛣 {result.road}

</p>


<p>

距離：

{result.distance}

公尺

</p>


<p>

分數：

{result.score}

分

</p>


<div className="bg-white rounded-lg p-3 mt-3">

🏠

{result.description}

</div>


</div>

)

}



</div>


</div>





<div className="flex flex-col md:flex-row justify-center gap-4 mt-8">


<button

onClick={submitAnswer}

className="bg-green-500 text-white px-8 py-3 rounded-xl"

>

送出答案

</button>



<button

onClick={randomQuestion}

className="bg-white px-8 py-3 rounded-xl"

>

{
questionNumber>=10
?
"完成挑戰"
:
"下一題"
}

</button>


</div>


</div>

);


}



export default App;