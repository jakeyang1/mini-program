import { View } from "@tarojs/components";
import { AtButton, AtRadio } from "taro-ui";
import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "./question.scss";
import GlobalFooter from "../../components/GlobalFooter";
import questions from "../../components/data/questions.json";

/**
 *  Do Question page
 */

export default () => {
  //Current title sequence number (starting from 1)
  const [current, setCurrent] = useState<number>(1);

  //Current topic
  const [currentQuestion, setCurrentQuestion] = useState<Question>(questions[0]);


  const questionOptions = currentQuestion.options.map((option) => {
    return { label: `${option.key}. ${option.value}`, value: option.key };
  });

  //now answer 1
  const [currentAnswer, setCurrentAnswer] = useState<string>();

  //answer list 2
  const [answerList] = useState<string[]>([]);

  //Topic variation Switching problem,
  useEffect(() => {
    setCurrentQuestion(questions[current - 1]);
    setCurrentAnswer(answerList[current - 1]);

    console.log('当前题目:', currentQuestion);//故障
    console.log('当前答案:', currentAnswer);//故障
    console.log('答案列表:', answerList);//故障
  }, [current]);

  return (
    <View className="doQuestionPage">
      <View className="at-article__h1 title">
        {current},{currentQuestion.title}
      </View>

      <AtRadio
        options={questionOptions}
        value={currentAnswer}
        onClick={(value) => {
          setCurrentAnswer(value);
          //Recorded answer
          answerList[current - 1] = value;
        }}
      />

      {current < questions.length && (
        <AtButton
          type="primary"
          className="controlBtn"
          circle
          disabled={!currentAnswer}
          onClick={() => setCurrent(current + 1)}
        >
          下一题
        </AtButton>
      )}

      {current == questions.length && (
        <AtButton
          type="primary"
          className="controlBtn"
          circle
          disabled={!currentAnswer}
          onClick={() => {
            console.log('提交前的答案列表:', answerList);//故障
            //Pass the answer
            Taro.setStorageSync("answerList", answerList);
            //Go to the result page
            Taro.navigateTo({
              url: "/pages/result/result",
            });
          }}
        >
          查看结果
        </AtButton>
      )}

      {current > 1 && (
        <AtButton
          className="controlBtn"
          circle
          onClick={() => setCurrent(current - 1)}
        >
          上一题
        </AtButton>
      )}

      <GlobalFooter />
    </View>
  );
};
