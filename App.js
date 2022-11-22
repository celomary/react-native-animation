
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import Reanimated, { withTiming, useSharedValue, useAnimatedStyle, interpolate, useAnimatedScrollHandler, Extrapolate  } from 'react-native-reanimated';
const RScrollView = Reanimated.createAnimatedComponent(ScrollView)
const RView = Reanimated.createAnimatedComponent(View);
const RText = Reanimated.createAnimatedComponent(Text);


const Page = ({name, index, translateX})=> {
  const width = Dimensions.get('window').width;

  const inputRange = [
    (index - 1) * width, index * width, (index + 1) * width
  ]
 
  const styledView = useAnimatedStyle(()=>{
    const scale = interpolate(translateX.value, inputRange,
    [
      0.5, 1, 0.5
    ],
    Extrapolate.CLAMP)


    const borderRadius = interpolate(translateX.value, inputRange, [
      0, width / 2, 0
    ],
    Extrapolate.CLAMP)
    return {
      transform: [
        {scale},
      ],
      borderRadius
    }
  }, [translateX.value])

  const styledText = useAnimatedStyle(()=>{
    const translateY = interpolate(translateX.value, inputRange, [
      200, 0, -200,
    ],
    Extrapolate.CLAMP
    )

    const opacity = interpolate(translateX.value, inputRange, [
      -2, 1, -2
    ],
    Extrapolate.CLAMP
    )
    return {
      transform:[
        {translateY}
      ],
      opacity
    }
  }, [translateX.value])

  return <View style={[styles.page,
  {
    backgroundColor: `rgba(0, 0, 255,0.${index + 1})`
  }]}>
    <RView style={[styles.nestedView,
    styledView]}>
      <RText style={[
        styles.text,
        styledText
      ]}>
        {name}
      </RText>
    </RView>
  </View>
}
export default function App() {
  const translateX = useSharedValue(0);
  const animatedScroll = useAnimatedScrollHandler((event)=>{
    translateX.value = event.contentOffset.x;
  })
  const names = ["Mohamed","Ahmed", "Ali", "Omar"];

  return (
    <SafeAreaView >
      <RScrollView horizontal pagingEnabled  scrollEventThrottle={16}
      onScroll={animatedScroll} showsHorizontalScrollIndicator={false}>
      {
        names.map((name, index)=> {
          return <Page key={name} index={index} name={name} translateX={translateX} /> 
        })
      }
      </RScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page:  {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    alignItems: "center",
    justifyContent: "center"
  },
  nestedView: {
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
    backgroundColor: 'rgba(0, 0, 0, 1)',
    justifyContent: 'center'
  },
  text: {
    fontSize: 36,
    color: "#fff",
    textTransform: 'uppercase',
    alignSelf: 'center'
  }
});
