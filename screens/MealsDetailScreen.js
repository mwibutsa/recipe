import React, { useEffect, useCallback } from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import DefaultText from "../components/DefaultText";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../store/actions/meals";
const ListItem = props => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};
const MealDetailScreen = props => {
  const availableMeals = useSelector(state => state.meals.meals);
  const mealId = props.navigation.getParam("mealId");

  const currentMealIsFavorite = useSelector(state =>
    state.meals.favoriteMeals.some(meal => meal.id === mealId)
  );

  const selectedMeal = availableMeals.find(meal => meal.id === mealId);

  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    props.navigation.setParams({
      toggleFav: toggleFavoriteHandler
    });
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    props.navigation.setParams({
      isFav: currentMealIsFavorite
    });
  }, [currentMealIsFavorite]);

  return (
    <ScrollView>
      <Image
        source={{
          uri: selectedMeal.imageUrl
        }}
        style={styles.image}
      />

      <View style={styles.details}>
        <DefaultText style={styles.text}>
          {selectedMeal.duration} min
        </DefaultText>
        <DefaultText style={styles.text}>
          {selectedMeal.complexity.toUpperCase()}
        </DefaultText>
        <DefaultText style={styles.text}>
          {selectedMeal.affordability.toUpperCase()}
        </DefaultText>
      </View>

      <DefaultText style={styles.title}>Ingredients</DefaultText>

      {selectedMeal.ingredients.map(ingredient => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}

      <DefaultText style={styles.title}>Steps</DefaultText>
      {selectedMeal.steps.map(step => (
        <ListItem key={step}>{step}</ListItem>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200
  },
  details: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around"
  },
  text: {
    color: Colors.primaryColor
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    textAlign: "center"
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10
  }
});

MealDetailScreen.navigationOptions = navigationData => {
  const mealTitle = navigationData.navigation.getParam("mealTitle");
  const toggleFavorite = navigationData.navigation.getParam("toggleFav");
  const isFavorite = navigationData.navigation.getParam("isFav");
  return {
    headerTitle: mealTitle.substr(0, 15) + (mealTitle.length > 15 ? "..." : ""),

    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Favorite"
          iconName={isFavorite ? "ios-star" : "ios-star-outline"}
          onPress={toggleFavorite}
        />
      </HeaderButtons>
    )
  };
};

export default MealDetailScreen;
