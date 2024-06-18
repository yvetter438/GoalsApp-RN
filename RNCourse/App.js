import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
const [modalisVisible, setModalisVisible] = useState(false);
const [courseGoals, setCourseGoals] = useState([]);

function startAddGoalHandler() {
  setModalisVisible(true);
}

function endAddGoalHandler() {
  setModalisVisible(false);
}


function addGoalHandler(enteredGoalText) {
  setCourseGoals(currentCourseGoals => [
    ...courseGoals, 
    {text: enteredGoalText, id: Math.random().toString()},
  ]);
  endAddGoalHandler();
  
};

function deleteGoalHander(id) {
  setCourseGoals(currentCourseGoals => {
    return currentCourseGoals.filter((goal) => goal.id !== id);
  });
}

  return (
    <>
    <StatusBar style='inverted' />
    <View style={styles.appContainer}>
      <Button title='Add New Goal' color={"#a065ec"} onPress={startAddGoalHandler} />
      <GoalInput visible={modalisVisible} onAddGoal={addGoalHandler} onCancel={endAddGoalHandler}/> 
      <View style={styles.goalsContainer}>
      <FlatList 
        data={courseGoals} 
        renderItem={(itemData) => {
        return  <GoalItem 
          text={itemData.item.text} 
          id={itemData.item.id}
          onDeleteItem={deleteGoalHander} />;
      }} 
      keyExtractor={(item, index) => {
        return item.id;
      }}
      alwaysBounceVertical={false}
       />
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
   appContainer: {
    flex:1,
    paddingTop: 50,
    paddingHorizontal:16,
    backgroundColor: '#1e085a',

   }, 

   

   goalsContainer: {
    flex:5
   },
});
