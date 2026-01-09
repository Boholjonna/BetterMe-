import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import CustomButton from '../../components/ui/Button';
import { supabase } from '../../lib/supabase';

const { width } = Dimensions.get('window');

export default function Onboarding() {
  const router = useRouter();
  const [gender, setGender] = useState('');
  const [goal, setGoal] = useState('');
  const [username, setUsername] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showPicker, setShowPicker] = useState(null);
  const [taskFrequency, setTaskFrequency] = useState('');
  const [customDays, setCustomDays] = useState('');
  const [taskInput, setTaskInput] = useState('');
  const [tasks, setTasks] = useState([]);

  // Fetch username from UserData
  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('UserData')
          .select('username')
          .eq('uid', user.id)
          .single();
        if (data?.username) {
          setUsername(data.username);
        }
      }
    };
    fetchUserData();
  }, []);

  const calculateDurationInDays = () => {
    if (!startDate || !endDate) return 0;
    const diff = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
    return Math.ceil(diff);
  };

  const durationDays = calculateDurationInDays();

  const addTask = () => {
    if (!taskInput.trim()) return;
    setTasks([...tasks, taskInput.trim()]);
    setTaskInput('');
  };

  const saveSurvey = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from('UserData')
          .update({ 
            gender,
            goal,
            start_date: startDate?.toISOString(),
            end_date: endDate?.toISOString(),
            task_frequency: taskFrequency,
            tasks: JSON.stringify(tasks),
            updated_at: new Date().toISOString()
          })
          .eq('uid', user.id);

        Alert.alert(
          'Plan Saved',
          'Your productivity plan has been saved successfully.',
          [{ text: 'OK', onPress: () => router.replace('/screens/Goalist') }]
        );
      }
    } catch (error) {
      console.error('Error saving data:', error);
      Alert.alert('Error', 'Failed to save your plan. Please try again.');
    }
  };

  const renderDateButton = (date, label, type) => (
    <TouchableOpacity
      style={styles.dateButton}
      onPress={() => setShowPicker(type)}
    >
      <Text style={styles.dateText}>
        {date ? date.toDateString() : label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['#E1FFD1', '#B5EAD7', '#C7F9CC']}
      style={styles.gradient}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.title}>Welcome{username ? `, ${username}` : ''}!</Text>
            <Text style={styles.subtitle}>
              Let's build a productivity plan tailored to your goal and timeframe.
            </Text>
          </View>

          {/* GENDER */}
          <View style={styles.card}>
            <Text style={styles.label}>Gender</Text>
            <View style={styles.row}>
              {['Male', 'Female', 'Other'].map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.choice,
                    gender === item && styles.choiceActive,
                  ]}
                  onPress={() => setGender(item)}
                >
                  <Text style={[
                    styles.choiceText,
                    gender === item && styles.choiceTextActive
                  ]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* GOAL */}
          <View style={styles.card}>
            <Text style={styles.label}>Goal to achieve</Text>
            <TextInput
              style={styles.input}
              placeholder="Describe your goal"
              placeholderTextColor="#666"
              value={goal}
              onChangeText={setGoal}
            />
          </View>

          {/* DATE RANGE */}
          <View style={styles.card}>
            <Text style={styles.label}>Goal duration</Text>
            <View style={[styles.row, { justifyContent: 'space-between' }]}>
              {renderDateButton(startDate, 'Start Date', 'start')}
              {renderDateButton(endDate, 'End Date', 'end')}
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
          </View>

          {/* TASK FREQUENCY */}
          {durationDays > 0 && (
            <View style={styles.card}>
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
                  <Text style={[
                    styles.choiceText,
                    taskFrequency === type && styles.choiceTextActive
                  ]}>
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}

              {taskFrequency === 'Custom' && (
                <TextInput
                  style={[styles.input, { marginTop: 10 }]}
                  placeholder="Every how many days? (e.g. 3)"
                  placeholderTextColor="#666"
                  keyboardType="numeric"
                  value={customDays}
                  onChangeText={setCustomDays}
                />
              )}
            </View>
          )}

          {/* TASK INPUT */}
          {taskFrequency && (
            <View style={styles.card}>
              <Text style={styles.label}>Add tasks</Text>
              <View style={styles.row}>
                <TextInput
                  style={[styles.input, { flex: 1, marginRight: 10 }]}
                  placeholder="Enter a task"
                  placeholderTextColor="#666"
                  value={taskInput}
                  onChangeText={setTaskInput}
                  onSubmitEditing={addTask}
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
            </View>
          )}

          {/* SAVE BUTTON */}
          {tasks.length > 0 && (
            <View style={styles.saveButtonContainer}>
              <CustomButton
                text="Save Plan"
                onPress={saveSurvey}
                color="#2E8B57"
                textColor="#FFFFFF"
                style={styles.saveButton}
              />
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2E8B57',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    lineHeight: 22,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E8B57',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  choice: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 5,
    minWidth: (width - 90) / 3,
    alignItems: 'center',
  },
  choiceActive: {
    backgroundColor: '#2E8B57',
  },
  choiceText: {
    color: '#333',
    fontWeight: '500',
  },
  choiceTextActive: {
    color: '#FFFFFF',
  },
  choiceFull: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 15,
    marginVertical: 5,
    width: '100%',
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  dateButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 15,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  dateText: {
    color: '#333',
    fontWeight: '500',
  },
  durationText: {
    marginTop: 10,
    color: '#2E8B57',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#2E8B57',
    width: 50,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: -2,
  },
  taskItem: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 15,
    marginTop: 10,
  },
  taskText: {
    color: '#333',
  },
  saveButtonContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
  saveButton: {
    borderRadius: 10,
    height: 56,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
});