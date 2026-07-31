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


  const [currentQuestion, setCurrentQuestion] =
    useState(
      questions[
        Math.floor(
          Math.random() * questions.length
        )
      ]
    );


  const [streetViewImage, setStreetViewImage] =
    useState("");


  const [guessPosition, setGuessPosition] =
    useState(null);


  const [result, setResult] =
    useState(null);


  const [questionNumber, setQuestionNumber] =
    useState(1);


  const [totalScore, setTotalScore] =
    useState(0);


  const [gameFinished, setGameFinished] =
    useState(false);



  function loadStreetView(question){


    const url =
      getStreetViewImage(
        question.lat,
        question.lng
      );


    setStreetViewImage(url);

  }





  useEffect(()=>{

    loadStreetView(
      currentQuestion
    );

  }, [currentQuestion]);







  function randomQuestion(){


    if(questionNumber >= 10){

      setGameFinished(true);

      return;

    }



    const random =
      Math.floor(
        Math.random() *
        questions.length
      );



    const nextQuestion =
      questions[random];



    setCurrentQuestion(
      nextQuestion
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


  }






  if(gameFinished){


    return (

      <div className="min-h-screen bg-slate-900 flex items-center justify-center">


        <div className="bg-white rounded-xl p-10 text-center">


          <h1 className="text-4xl font-bold mb-6">

            🎉 挑戰完成

          </h1>



          <p className="text-xl mb-4">

            你的總分：

            {totalScore}

          </p>



          <p className="text-gray-600 mb-6">

            你完成了 10 個台中地點挑戰

          </p>




          <button

            onClick={()=>window.location.reload()}

            className="bg-green-500 text-white px-8 py-3 rounded-xl"

          >

            再挑戰一次

          </button>



        </div>


      </div>

    );

  }








  return (

    <div className="min-h-screen bg-slate-900 p-8">



      <h1 className="text-4xl font-bold text-white text-center mb-8">

        🏠 台中商耕 Guessr

      </h1>





      <div className="grid grid-cols-2 gap-6">





        <div className="bg-white rounded-xl p-6">


          <h2 className="text-xl font-bold mb-4">

            第 {questionNumber} / 10 題

          </h2>




          {
            streetViewImage && (

              <img

                src={streetViewImage}

                className="w-full h-[400px] object-cover rounded-lg"

              />

            )
          }




          <p className="mt-4 text-gray-700">

            地區：

            {currentQuestion.district}

          </p>



        </div>








        <div>


          <Map

            setGuessPosition={
              setGuessPosition
            }


            guessPosition={
              guessPosition
            }


            answerPosition={

              result

              ?

              {

                lat:
                  currentQuestion.lat,


                lng:
                  currentQuestion.lng

              }

              :

              null

            }


          />





          {
            guessPosition && (

              <div className="mt-4 bg-white rounded-xl p-4">


                <p>

                  你的猜測：

                </p>


                <p>

                  緯度：

                  {guessPosition.lat}

                </p>


                <p>

                  經度：

                  {guessPosition.lng}

                </p>


              </div>

            )
          }







          <div className="mt-4 bg-white rounded-xl p-4">


            <p className="font-bold">

              目前總分：

              {totalScore}

            </p>


          </div>







         {
result && (

<div className="mt-4 bg-green-100 rounded-xl p-5">


<h3 className="text-xl font-bold mb-3">

🎯 答案揭曉

</h3>



<p className="font-bold text-lg">

📍 {result.name}

</p>



<p>

🛣 {result.road}

</p>



<div className="mt-4 border-t pt-3">


<p>

距離答案：

<span className="font-bold">

{result.distance}

公尺

</span>

</p>



<p>

本題分數：

<span className="font-bold">

{result.score}

分

</span>

</p>


</div>




<div className="mt-4 bg-white rounded-lg p-3">


<h4 className="font-bold mb-2">

🏠 區域情報

</h4>


<p className="text-gray-700">

{result.description}

</p>


</div>


</div>

)
}



        </div>



      </div>








      <div className="text-center mt-8">



        <button

          onClick={submitAnswer}

          className="bg-green-500 text-white px-8 py-3 rounded-xl mr-4"

        >

          送出答案

        </button>







        <button

          onClick={randomQuestion}

          className="bg-white px-8 py-3 rounded-xl"

        >

          {
            questionNumber >= 10
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