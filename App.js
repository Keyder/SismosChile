import React, { useState } from "react";
import StackNavigation from './navigations/StackNavigation';
import { useFonts } from 'expo-font';

export default function App() {

  const [loaded] = useFonts({
    Questrial: require('./assets/fonts/Questrial-Regular.ttf'),
    Roboto: require('./assets/fonts/Roboto-Bold.ttf'),
  });

  if (!loaded) {
    return null;
  } else {
    return <StackNavigation />
  }
}
