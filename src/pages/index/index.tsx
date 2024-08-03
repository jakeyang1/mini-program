import { View, Image } from "@tarojs/components";
import { AtButton } from "taro-ui";
import Taro from "@tarojs/taro";
import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "./index.scss";
import headerBg from "../../assets/11.jpg";
import GlobalFooter from "../../components/GlobalFooter";

/**
 * 主页
 */

export default () => {
  return (
    <View className="indexPage">
      <View className="at-article__h1 title">NBTI性格测试</View>

      <View className="at-article__h2 subTitle">
        只要两分钟就能了解你是谁,以及你的性格特点
      </View>

      <AtButton
        type="primary"
        className="enterBtn"
        circle
        onClick={() => {
          Taro.navigateTo({
            url: "/pages/doQuestion/question",
          });
        }}
      >
        开始测试
      </AtButton>

      <Image className="headerBg" src={headerBg} />

      <GlobalFooter />
    </View>
  );
};
