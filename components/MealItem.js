import React from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import DefaultText from "../components/DefaultText";
const MealItem = props => {
  return (
    <View style={styles.mealItem}>
      <TouchableOpacity onPress={props.onSelectMeal} activeOpacity={0.6}>
        <View>
          <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
            <ImageBackground
              source={{ uri: props.image }}
              style={styles.bgImage}
            >
              <Text style={styles.title} numberOfLines={1}>
                {props.title}
              </Text>
            </ImageBackground>
          </View>
          <View style={{ ...styles.mealRow, ...styles.mealDetail }}>
            <DefaultText style={styles.text}>{props.duration} min</DefaultText>
            <DefaultText style={styles.text}>
              {props.complexity.toUpperCase()}
            </DefaultText>
            <DefaultText style={styles.text}>
              {props.affordability.toUpperCase()}
            </DefaultText>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mealRow: {
    flexDirection: "row"
  },

  mealItem: {
    height: 200,
    width: "100%",
    backgroundColor: "#e67e22",
    borderRadius: 5,
    overflow: "hidden",
    marginVertical: 10
  },
  mealHeader: {
    height: "85%"
  },
  mealDetail: {
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    height: "15%"
  },
  bgImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end"
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    color: "white",
    backgroundColor: "rgba(0,0,0,0.5)",
    textAlign: "center",
    paddingVertical: 5,
    paddingHorizontal: 12
  },
  text: {
    color: "white"
  }
});

export default MealItem;
