import { View, Image } from "@tarojs/components";
import { AtButton } from "taro-ui";
import Taro from "@tarojs/taro";
import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "./result.scss";
import headerBg from "../../assets/11.jpg";
import GlobalFooter from "../../components/GlobalFooter";
import questionResults from "../../components/data/question_results.json";

import { getBestQuestionResult } from "../utils/bizUtils";
import questions from "../../components/data/questions.json";

/**结果*/

export default () => {


  //get answer
  const answerList = Taro.getStorageSync("answerList");

  console.log('获取到的答案列表:', answerList);//故障

  // 验证答案列表
  if (!Array.isArray(answerList)) {
    console.error('获取到的答案列表不是数组:', answerList);
    Taro.showToast({
      title: "答案列表无效",
      icon: "error",
      duration: 3000,
    });
    return null; // 结束组件渲染
  }

  console.log('获取到的答案列表:', answerList);


  // 验证问题列表
  if (!Array.isArray(questions)) {
    console.error('题目列表不是数组:', questions);
    Taro.showToast({
      title: "题目列表无效",
      icon: "error",
      duration: 3000,
    });
    return null; // 结束组件渲染
  }

  console.log('题目列表:', questions);




  if (!answerList || answerList.length < 1) {
    Taro.showToast({
      title: "答案为空",
      icon: "error",
      duration: 3000,
    });
  }

  console.log('题目列表:', questions); // 添加日志

  //get test result
  const result = getBestQuestionResult(answerList, questions, questionResults);





  console.log('计算得到的结果:', result);//故障


  return (
    <View className="ResultPage">
      <View className="at-article__h1 title">{result.resultName}</View>

      <View className="at-article__h2 subTitle">{result.resultDesc}</View>

      <AtButton
        type="primary"
        className="enterBtn"
        circle
        onClick={() => {
          Taro.reLaunch({
            url: "/pages/index/index",
          });
        }}
      >
        返回主页
      </AtButton>

      <Image className="headerBg" src={headerBg} />

      <GlobalFooter />
    </View>
  );
};


