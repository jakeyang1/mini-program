import { View, Image } from "@tarojs/components";
import { AtButton } from "taro-ui";
import Taro from "@tarojs/taro";
import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "./result.scss";
import headerBg from "../../assets/11.jpg";
import GlobalFooter from "../../components/GlobalFooter";
import questionResults from "../../components/data/queston_results.json";

import { getBestQuestionResult } from "../utils/bizUtils";
import questions from "../../components/data/questions.json";

/**结果*/

export default () => {
  //get answer
  const answerList = Taro.getStorageSync("answerlist");
  if (!answerList || answerList.length < 1) {
    Taro.showToast({
      title: "答案为空",
      icon: "error",
      duration: 3000,
    });
  }

  //get test result
  const result = getBestQuestionResult(answerList, questions, questionResults);

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
