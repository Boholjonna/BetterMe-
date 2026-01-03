import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import CustomButton from '../../components/ui/Button';

export default function Onboarding() {
  const [gender, setGender] = useState('');
  const [goal, setGoal] = useState('');

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showPicker, setShowPicker] = useState(null);

  const [taskFrequency, setTaskFrequency] = useState('');
  const [customDays, setCustomDays] = useState('');

  const [taskInput, setTaskInput] = useState('');
  const [tasks, setTasks] = useState([]);

  const calculateDurationInDays = () => {
    if (!startDate || !endDate) return 0;
    const diff =
      (endDate.getTime() - startDate.getTime()) /
      (1000 * 60 * 60 * 24);
    return Math.ceil(diff);
  };

  const durationDays = calculateDurationInDays();

  const addTask = () => {
    if (!taskInput.trim()) return;
    setTasks([...tasks, taskInput.trim()]);
    setTaskInput('');
  };

  const saveSurvey = () => {
    Alert.alert(
      'Plan Saved',
      'Your productivity plan has been saved successfully.'
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>
        Let’s build a productivity plan tailored to your goal and
        timeframe.
      </Text>

      {/* GENDER */}
      <Text style={styles.label}>Gender</Text>
      <View style={styles.row}>
        {['Male', 'Female'].map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.choice,
              gender === item && styles.choiceActive,
            ]}
            onPress={() => setGender(item)}
          >
            <Text style={styles.choiceText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* GOAL */}
      <Text style={styles.label}>Goal to achieve</Text>
      <TextInput
        style={styles.input}
        placeholder="Describe your goal"
        placeholderTextColor="#00000070"
        value={goal}
        onChangeText={setGoal}
      />

      {/* DATE RANGE */}
      <Text style={styles.label}>Goal duration</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowPicker('start')}
        >
          <Text style={styles.dateText}>
            {startDate ? startDate.toDateString() : 'Start Date'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowPicker('end')}
        >
          <Text style={styles.dateText}>
            {endDate ? endDate.toDateString() : 'End Date'}
          </Text>
        </TouchableOpacity>
      </View>

      {showPicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          onChange={(e, date) => {
            if (showPicker === 'start') setStartDate(date);
            if (showPicker === 'end') setEndDate(date);
            setShowPicker(null);
          }}
        />
      )}

      {durationDays > 0 && (
        <Text style={styles.durationText}>
          Duration: {durationDays} days
        </Text>
      )}

      {/* TASK FREQUENCY */}
      {durationDays > 0 && (
        <>
          <Text style={styles.label}>Task frequency</Text>

          {['Daily', 'Weekly', 'Monthly', 'Custom'].map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.choiceFull,
                taskFrequency === type && styles.choiceActive,
              ]}
              onPress={() => setTaskFrequency(type)}
            >
              <Text style={styles.choiceText}>{type}</Text>
            </TouchableOpacity>
          ))}

          {taskFrequency === 'Custom' && (
            <TextInput
              style={styles.input}
              placeholder="Every how many days? (e.g. 3)"
              keyboardType="numeric"
              value={customDays}
              onChangeText={setCustomDays}
            />
          )}
        </>
      )}

      {/* TASK INPUT */}
      {taskFrequency !== '' && (
        <>
          <Text style={styles.label}>Add tasks</Text>
          <View style={styles.row}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Enter a task"
              placeholderTextColor="#00000070"
              value={taskInput}
              onChangeText={setTaskInput}
            />
            <TouchableOpacity
              style={styles.addButton}
              onPress={addTask}
            >
              <Text style={styles.addText}>+</Text>
            </TouchableOpacity>
          </View>

          {tasks.map((task, index) => (
            <View key={index} style={styles.taskItem}>
              <Text style={styles.taskText}>
                {index + 1}. {task}
              </Text>
            </View>
          ))}
        </>
      )}

      {/* SAVE */}
      {tasks.length > 0 && (
        <View style={{ marginTop: 30 }}>
          <CustomButton
            text="Save Plan"
            onPress={saveSurvey}
            color="#000000"
            textColor="#E1FFD1"
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E1FFD1',
    padding: 24,
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#000',
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 15,
    color: '#000',
    opacity: 0.75,
    marginBottom: 28,
  },

  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    marginBottom: 6,
    marginTop: 18,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#33DB00',
    color: '#000',
  },

  row: {
    flexDirection: 'row',
    gap: 10,
  },

  choice: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#33DB00',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  choiceFull: {
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#33DB00',
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },

  choiceActive: {
    backgroundColor: '#33DB00',
  },

  choiceText: {
    fontWeight: '700',
    color: '#000',
  },

  dateButton: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#33DB00',
    backgroundColor: '#FFFFFF',
  },

  dateText: {
    color: '#000',
    fontWeight: '600',
  },

  durationText: {
    marginTop: 8,
    fontWeight: '700',
    color: '#000',
  },

  addButton: {
    backgroundColor: '#33DB00',
    borderRadius: 10,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },

  addText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#000',
  },

  taskItem: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 10,
    marginTop: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#33DB00',
  },

  taskText: {
    color: '#000',
    fontWeight: '600',
  },
});
